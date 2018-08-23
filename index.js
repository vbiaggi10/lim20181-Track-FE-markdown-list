#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

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
        results.push(url);
      };
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

const uniqueLinks = (link) => {
  let aux = 0;
  link.sort();
  while (aux < link.length) {
    link[aux + 1] == link[aux] ? link.splice(aux, 1) : aux++
  }
  return link;
}

const selectOptions = ( urls, options) => {
  const newArrayUrl = urls.map(url => {
    return url.href;
  })
  if (!options.validate && !options.stats) {
    urls.forEach(url => {
      console.log(`${url.file}  \t  ${url.href}  \tLink a   ${url.text}`)
    })
  } else if (options.validate === true && !options.stats) {
    urls.forEach(url => {
      console.log(`${url.file}  \t  ${url.href}  \t  ${url.statusText}  \t  ${url.status}  \tLink a   ${url.text}`)
    })
  } else if (options.stats === true && !options.validate) {
    console.log(`Directorio:  ${urls[0].file}  \tLinks total:  ${urls.length}  \tLinks unicos:  ${uniqueLinks(newArrayUrl).length}`)
  } else if (options.stats === true && options.stats === true) {
    let brokenCount = 0;
    urls.forEach(url => {
      if (url.status > 400) {
        return brokenCount++;
      }
    })
    console.log(`Directorio:  ${urls[0].file}  \tLinks total:  ${urls.length}  \tLinks rotos:  ${brokenCount}  \tLinks unicos:  ${uniqueLinks(newArrayUrl).length}`)
  }
}

const validateUrl = (url) => {
  return fetch(url.href).then(res => {
    url.status = res.status;
    url.statusText = res.statusText;
    return url;
  }).catch(err => {
    if (!!err.code) {
      console.error(err.code + '\t' + url.href)
    }
  })
}

const resolveFile = (response, done) => {
  let results = [];
  readFileMD(response, (err, res) => {
    if (err) return done(err);
    var pending = res.length;
    if (!pending) return done(null, results);
    res.forEach(url => {
      validateUrl(url).then(response => {
        results.push(response)
        if (!--pending) done(null, results);
      })
    })
  })
}
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {

    fs.stat(path, (err, stat) => {
      if (stat && stat.isDirectory()) {
        readDirectory(path, (err, results) => {
          if (err) return reject(err);
          results.forEach(file => {
            resolveFile(file, (err, results) => {
              if (err) return reject(err);
              selectOptions( results, options)
              return resolve(results)
            })
          });
        })
      } else {
        resolveFile(path, (err, results) => {
          if (err) return reject(err);
          selectOptions(results, options)
          return resolve(results)
        })
      }
    })

  });
}

module.exports = mdLinks;
