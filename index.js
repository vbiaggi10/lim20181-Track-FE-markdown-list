#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let arrayDir = [];
let totalCount = 0;
let okCount = 0;
let brokenCount = 0;
let uniqueCount = 0;
let normalCount = 0;
let mdCount = 0;


const readDirectory = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          readDirectory(file, (err, res) => {
            if (err) throw err.code;
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          file = checkMD(file);
          if (!!file) {
            results.push(file)
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const readFileMD = (fileMD, done) => {
  let results = [];
  fs.readFile(fileMD, (err, list) => {
    list = list.toString();
    if (err) return done(err);

    const expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    const expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;

    const urls = list.match(expressionLink).concat(list.match(expressionLinkMD));
    var pending = urls.length;
    if (!pending) return done(null, results);
    urls.forEach(url => {
      url = tittleUrl(url, fileMD);
      if (!!url) {
        // url = validateUrl(url).then(res => {
        //   url.status = res.status;
        //   url.statusText = res.statusText;
        //   return url;
        // })
        results.push(url);
      };
      // Promise.all(results.map(url =>
      //   fetch(url).then(resp => resp)
      // )).then(texts => {
      //   let hola = {};
      //   hola.status = texts.status;
      //   hola.statusText = texts.statusText;
      //   results.push(hola);
      // })
      if (!--pending) done(null, results);
    })
  });

};

const tittleUrl = (results, dir) => {
  if (results !== null) {
    results = results.toString();
    if (results.substr(0, 1) === '[' && results.substr(-1, 1) === ')') {
      let tittle = results.replace(/\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi, '');
      tittle = tittle.replace(/[\[\]]/gi, '');
      let newUrl = results.replace(/\[([\w\s]*)\]/gi, '');
      newUrl = newUrl.replace(/[\(\)]/gi, '');
      let link = JSON.parse(JSON.stringify({
        href: newUrl,
        text: tittle,
        file: dir
      }))
      return link;
    } else {
      let newUrl = results.replace(/[\n \ ]/gi, '')
      let link = JSON.parse(JSON.stringify({
        href: newUrl,
        text: ' ---- ',
        file: dir
      }))
      return link;
    }
  }
}

const checkMD = (results) => {
  if (path.extname(results) === '.md') {
    return results;
  }
}

const selectOptions = (arrayDir, urls, options) => {
  let hol = 0;
  if (!options.validate && !options.stats) {
    urls.map(url => {
      console.log(url.file + '\t' + url.href + '\tLink a ' + url.text)
    })

  } else if (options.validate === true && !options.stats) {
    urls.map(url => {
      console.log(url.file + '\t' + url.href + '\t' + url.statusText + '\t' + url.status + '\tLink a ' + url.text)
    })
  } else if (options.validate === true && !options.validate) {
    console.log("Directorio " + arrayDir.length + '\tLinks total:' + urls.length)
  } else if (options.stats === true && options.stats === true) {
    urls.map(url => {
      if (url.status > 400) {
        return hol++;
      }
    })
    console.log("Directorio " + arrayDir.length + '\tLinks total:' + urls.length + '\tLinks rotos:' + hol)
  }
}

const validateUrl = (url) => {
  var request = new XMLHttpRequest();
  request.open('HEAD', url, true);
  request.send();

  if (request.status === "404") {
    console.log("No existe pagina");
  }
  // fetch(url.href).then(res => {
  //   url.status = res.status;
  //   url.statusText = res.statusText;
  //   selectOptions(url, options)
  // }).catch(err => {
  //   if (!!err.code) {
  //     console.error(err.code + '\t' + url.href)
  //   }
  // })
}

const resolveFile = (results, options) => {
  readFileMD(results, (err, res) => {
    if (err) return reject(err);
    const urlWithStats = res.map(url => {
      /* url.status = */ validateUrl(url);
      if (url.status < 400) {
        url.statusText = 'OK';
      } else {
        url.statusText = 'FAIL';
      }
      return url
    })
    arrayDir.push(urlWithStats);
    // selectOptions(arrayDir, urlWithStats, options)
  })
}

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {

    fs.stat(path, (err, stat) => {
      if (stat && stat.isDirectory()) {
        readDirectory(path, (err, results) => {
          if (err) return reject(err);
          results.forEach(file => {
            resolveFile(file, options);

            return resolve(file)
          });
        })
      } else {
        resolveFile(path, options);

        return resolve(path)
      }
    })

  });
}

module.exports = mdLinks;
