const fs = require('fs');
const fetch = require('node-fetch');
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
    for (const i in files) {
      const file = files[i];
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
      fileMD = directory + '/' + file;
      readFileMD(fileMD, options);
    }
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

    if (expressionLink.test(expressionLinkMatch)) {
      expressionLinkMatch.forEach((url) => {
        let newUrl = url.replace(/[\n \ ]/gi, '');
        let whitoutTittle = '--------';
        cont2++;
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
    conttotal = (cont1 + cont2);

    /* text.match(/[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi)
      .forEach((url) => {
        let whitoutTittle = '--------';
        cont2++;
        validateIsUrl(fileMD, whitoutTittle, url, options, cont1, cont2);
      }); */

    /* text.match(/\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi)
      .forEach((url) => {
        let tittle = url.replace(/\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi, '');
        let tittle1 = tittle.replace(/[\[\]]/gi, '');
        let newUrl = url.replace(/\[([\w\s]*)\]/gi, '');
        let newUrl1 = newUrl.replace(/[\(\)]/gi, '');
        cont1++;
        validateIsUrl(fileMD, tittle1, newUrl1, options, cont1, cont2);
      }); */

    // validateIsUrl(fileMD, whitoutTittle, url, options)
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
    console.log(fileMD + '\t' + newUrl + '\tLink a\t' + tittle);
  }

};
const validateUrl = (fileMD, tittle, url) => {
  fetch(newUrl).then(function (response) {
    if (response.status < 400) {
      console.log(fileMD + '\t' + url + '\tok\t' + response.status + '\tLink a\t' + tittle + '\n'); // returns 200
    } else {
      console.log(fileMD + '\t' + url + '\tfail\t' + response.status + '\tLink a\t' + tittle + '\n'); // returns 200
    }
  });
}

const statsUrl = (fileMD, newUrl, cont1, cont2) => {
  // console.log(newUrl.length)
}
