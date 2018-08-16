#!/usr/bin/env node

const fs = require("fs");
const fetch = require("node-fetch");
let options = {
  validate: false,
  stats: false
};

mdLinks = (path, option) => {
  options = option;
  fs.stat(path, (err, stat) => {
    if (stat.isFile()) {
      validateMD(stat, '', path, option)
    } else if (stat.isDirectory()) {
      readDirectory(stat, path, option);
    }
  })
};

const readDirectory = (stat, directory, options) => {
  fs.readdir(directory, (err, files) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      validateMD(stat, directory, file, options);
      let newDirectory = directory + '/' + file;
      fs.stat(newDirectory, (err, stat) => {
        if (stat.isDirectory()) {
          mdLinks(newDirectory, options)
        }
      })
    }

  });
};

const validateMD = (stat, directory, file, options) => {
  let fileMD;
  var path_splitted = file.split('.');
  var extension = path_splitted.pop();
  if (extension === 'md') {
    if (stat.isFile()) {
      fileMD = file;
      readFileMD(fileMD, options);
    } else if (stat.isDirectory()) {
      fileMD = directory + "/" + file;
      readFileMD(fileMD, options);
    }
  }
};

let cont1 = 0, cont2 = 0, cont3 = 0, conttotal = 0;

const readFileMD = (fileMD, options) => {
  fs.readFile(fileMD, (err, res) => {
    const text = res.toString();
    console.log(text.match(/[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi))
    text.match(/[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi)
      .forEach((url) => {
        let whitoutTittle = '--------';
        cont2++;
        validateIsUrl(fileMD, whitoutTittle, url, options, cont1, cont2);
      });

    text.match(/\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi)
      .forEach((url) => {
        let tittle = url.replace(/\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi, '');
        let tittle1 = tittle.replace(/[\[\]]/gi, '');
        let newUrl = url.replace(/\[([\w\s]*)\]/gi, '');
        let newUrl1 = newUrl.replace(/[\(\)]/gi, '');
        cont1++;
        validateIsUrl(fileMD, tittle1, newUrl1, options, cont1, cont2);
      });



    // validateIsUrl(fileMD, whitoutTittle, url, options)
  });

}
const validateIsUrl = (fileMD, tittle, newUrl, options, cont1, cont2) => {

  fetch(newUrl).then(function (response) {
    if (options.validate === true && !options.stats) {
      validateUrl(fileMD, tittle, newUrl, response);
    } else if (options.stats === true && !options.validate) {
      statsUrl(fileMD, newUrl, response, cont1, cont2);
    } else if (options.stats === true && options.validate === true) {
      statsValidateUrl(fileMD, item, response)
    } else {
      console.log(fileMD + "   " + newUrl + "   Link a " + tittle);
    }

  });
};
const validateUrl = (fileMD, tittle, url, response) => {
  if (response.status < 400) {
    console.log(fileMD + "   " + url + "    ok   " + response.status + "   Link a " + tittle); // returns 200
  } else {
    console.log(fileMD + "   " + url + "    fail   " + response.status + "   Link a " + tittle); // returns 200
  }
}

const statsUrl = (fileMD, newUrl, response, cont1, cont2) => {
  // console.log(fileMD)
  conttotal = cont1 + cont2;
  console.log(conttotal)
  // console.log(url)
  // console.log("Total: " + contador)
  // console.log("Unique: " + contador)
}

module.exports = mdLinks;
