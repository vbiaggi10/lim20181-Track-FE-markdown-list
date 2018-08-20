#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
let options = {
  validate: false,
  stats: false
};
let totalCount = 0;
let okCount = 0;
let brokenCount = 0;
let uniqueCount = 0;


const mdLinks = (path, option) => {
  options = option;
  fs.stat(path, (err, stat) => {
    if (err === null) {
      if (stat.isFile()) {
        validateMD(path, options);
      } else if (stat.isDirectory()) {
        readDirectory(path, options);
      }
    } else if (err.code === 'ENOENT') {
      return console.log('Archivo o carpeta no existe');
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
      let newDirectory = directory + '/' + file;

      fs.stat(newDirectory, (err, stat) => {
        if (stat.isDirectory()) {
          mdLinks(newDirectory, options);
        } else if (stat.isFile()) {
          validateMD(newDirectory, options);
        }
      });
    }

  });
};

const validateMD = (directory, options) => {
  const path_splitted = directory.split('.');
  const extension = path_splitted.pop();
  if (extension === 'md') {
    readFileMD(directory, options);
  }
};

const readFileMD = (fileMD, options) => {
  fs.readFile(fileMD, (err, res) => {
    const text = res.toString();
    const expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    const expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;

    const expressionLinkMatch = text.match(expressionLink);
    const expressionLinkMDMatch = text.match(expressionLinkMD);

    if (!expressionLinkMatch && !expressionLinkMDMatch) {
      return console.log('No se encontraron URLs');
    } else {
      if (!expressionLinkMatch) {
        totalCount = 0 + expressionLinkMDMatch.length;
      } else if (!expressionLinkMDMatch) {
        totalCount = 0 + expressionLinkMatch.length;
      } else {
        totalCount = expressionLinkMatch.length + expressionLinkMDMatch.length;
      }
      statsUrl(fileMD, totalCount);
      if (expressionLink.test(expressionLinkMatch)) {
        expressionLinkMatch.forEach((url) => {
          const newUrl = url.replace(/[\n \ ]/gi, '');
          const whitoutTittle = '--------';
          validateUrl(fileMD, whitoutTittle, newUrl, options);
        });
      }
      if (expressionLinkMD.test(expressionLinkMDMatch)) {
        expressionLinkMDMatch.forEach((url) => {
          const tittle = url.replace(/\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi, '');
          const newTittle = tittle.replace(/[\[\]]/gi, '');
          const newUrl = url.replace(/\[([\w\s]*)\]/gi, '');
          const newUrlClear = newUrl.replace(/[\(\)]/gi, '');

          validateUrl(fileMD, newTittle, newUrlClear, options);
        });
      }
    }
  });
};

const selectOptions = (fileMD, tittle, newUrl, options) => {

  if (options.validate === true && !options.stats) {
    validateUrl(fileMD, tittle, newUrl);
  } else if (options.stats === true && options.validate === true) {
    statsValidateUrl();
  } else if (!options.validate && !options.stats) {
    return console.log(fileMD + '  \t' + newUrl + '  \tLink a  \t' + tittle);
  }

};

const validateUrl = (fileMD, tittle, url, options) => {
  if (options.validate === true && !options.stats) {
    fetch(url).then((response) => {
      if (response.status < 400) {
        okCount++;
        console.log('linea 115 ' + okCount);
        return console.log(fileMD + '  \t' + url + '  \t(ok)  \t' + response.status + '  \tLink a  \t' + tittle); // returns 200
      } else {
        brokenCount++;
        console.log('linea 119 ' + brokenCount);
        return console.log(fileMD + '  \t' + url + '  \t(fail)  \t' + response.status + '  \tLink a  \t' + tittle); // returns 200
      }
    });
  } else if (options.stats === true && options.validate === true) {
    statsValidateUrl(okCount, brokenCount);
  } else if (!options.validate && !options.stats) {
    return console.log(fileMD + '  \t' + newUrl + '  \tLink a  \t' + tittle);
  }
};

const statsUrl = (fileMD, totalCount) => {
  if (options.stats === true && !options.validate) {
    console.log(fileMD + '\nTotal: \t' + totalCount);
  }
};

const statsValidateUrl = (okCount, brokenCount) => {
  console.log('linea 137' + okCount + ' ' + brokenCount)
};

module.exports = mdLinks;
