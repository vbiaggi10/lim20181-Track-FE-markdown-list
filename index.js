#!/usr/bin/env node

const fs = require("fs");
const fetch = require("node-fetch");
let contador = 0;


mdLinks = (path, options) => {
  fs.stat(path, (err, stat) => {
    if (stat.isFile()) {
      validateMD(stat, '', path, options)
    } else if (stat.isDirectory()) {
      readDirectory(stat, path, options);
    }
  })
};

const readDirectory = (stat, directory, options) => {
  fs.readdir(directory, (err, files) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      validateMD(stat, directory, file, options);
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

const readFileMD = (fileMD, options) => {
  fs.readFile(fileMD, (err, res) => {
    const text = res.toString();
    var expression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    var regex = new RegExp(expression);

    text.replace(regex, (url) => {
      fetch(url).then(function (response) {

        if (options.validate === true && !options.stats) {
          validateUrl(fileMD, url, response);
        } else if (options.stats === true && !options.validate) {
          statsUrl(fileMD, url, response);
        } else if (options.stats === true && options.validate === true) {
          statsValidateUrl(fileMD, url, response)
        }

      });
    })
    /* if (/hola/.test(res.toString())) {
      console.log('contiene hola')
    } else {
      console.log('no contiene hola')
    } */
  });
}
const validateUrl = (fileMD, url, response) => {
  if (response.status < 400) {
    console.log(fileMD + "   " + url + "    ok   " + response.status); // returns 200
  } else {
    console.log(fileMD + "   " + url + "    fail   " + response.status); // returns 200
  }
}

const statsUrl = (fileMD, url, response) => {
  // console.log(fileMD)
  contador++;
  // console.log(url)
  console.log("Total: " + contador)
  console.log("Unique: " + contador)
}

module.exports = mdLinks;

/* const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", {
  validate: true
})
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/example.md", {
  stats: true
})
  .then(links => {
    // => [{ href, text, file, total, unique, domains }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error); */
