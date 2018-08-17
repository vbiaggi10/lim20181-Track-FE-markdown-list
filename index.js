#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
let options = {
  validate: false,
  stats: false
};

mdLinks = (path, option) => {
  options = option;
  fs.stat(path, (err, stat) => {
    if (err === null) {
      if (stat.isFile()) {
        console.log(path)
        validateMD(path, options)
      } else if (stat.isDirectory()) {
        readDirectory(path, options);
      }
    } else if (err.code === 'ENOENT') {
      return console.log('Archivo o carpeta no existe')
    } else {
      return console.log(err.code);
    }
  });
  return true;
};

const readDirectory = (directory, options) => {
  fs.readdir(directory, (err, files) => {
    for (const i in files) {
      const file = files[i];
      // validateMD(stat, directory, file, options);
      let newDirectory = directory + '/' + file;
      // console.log('linea 34 ' + newDirectory)
      // console.log('linea 35 '+file)

      fs.stat(newDirectory, (err, stat) => {
        if (stat.isDirectory()) {
          mdLinks(newDirectory, options)
        } else if (stat.isFile()) {
          validateMD(newDirectory, options);
        }
      })
    }

  });
};

const validateMD = (directory, options) => {
  var path_splitted = directory.split('.');
  var extension = path_splitted.pop();
  if (extension === 'md') {
    readFileMD(directory, options);
  }
};

let cont1 = 0,
  cont2 = 0,
  cont3 = 0,
  conttotal = 0;

const readFileMD = (fileMD, options) => {
  fs.readFile(fileMD, (err, res) => {
    const text = res.toString();
    let expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    let expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;

    let expressionLinkMatch = text.match(expressionLink)
    let expressionLinkMDMatch = text.match(expressionLinkMD)

    if (!expressionLinkMatch && !expressionLinkMDMatch) {
      return console.log('No se encontraron URLs')
    } else{
      // conttotal = expressionLinkMatch.length + expressionLinkMDMatch.length;
      // console.log(conttotal)
      if (expressionLink.test(expressionLinkMatch)) {
        expressionLinkMatch.forEach((url) => {
          let newUrl = url.replace(/[\n \ ]/gi, '');
          let whitoutTittle = '--------';
          selectOptions(fileMD, whitoutTittle, newUrl, options, cont1, cont2);
        });
      }
      if (expressionLinkMD.test(expressionLinkMDMatch)) {
        expressionLinkMDMatch.forEach((url) => {
          let tittle = url.replace(/\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi, '');
          let newTittle = tittle.replace(/[\[\]]/gi, '');
          let newUrl = url.replace(/\[([\w\s]*)\]/gi, '');
          let newUrlClear = newUrl.replace(/[\(\)]/gi, '');

          cont1++;
          selectOptions(fileMD, newTittle, newUrlClear, options, cont1, cont2);
        });
      }
    }

    conttotal = (cont1 + cont2);
  });
}
const selectOptions = (fileMD, tittle, newUrl, options, cont1, cont2) => {

  if (options.validate === true && !options.stats) {
    validateUrl(fileMD, tittle, newUrl);
  } else if (options.stats === true && !options.validate) {
    statsUrl(fileMD, newUrl, cont1, cont2);
  } else if (options.stats === true && options.validate === true) {
    statsValidateUrl(fileMD, item)
  } else {
    return console.log(fileMD + '  \t' + newUrl + '  \tLink a  \t' + tittle);
  }

};
const validateUrl = (fileMD, tittle, url) => {
  fetch(url).then(function (response) {
    if (response.status < 400) {
      return console.log(fileMD + '  \t' + url + '  \t(ok)  \t' + response.status + '  \tLink a  \t' + tittle); // returns 200
    } else {
      return console.log(fileMD + '  \t' + url + '  \t(fail)  \t' + response.status + '  \tLink a  \t' + tittle); // returns 200
    }
  });
}

const statsUrl = (fileMD, newUrl, cont1, cont2) => {
  // console.log(newUrl.length)
}

module.exports = mdLinks;
