#!/usr/bin/env node

const fs = require("fs");
const fetch = require("node-fetch");

let options = {
  validate: false,
  stats: false
}

mdLinks = (path, options) => {
  fs.stat(path, (err, stat) => {
    if (stat.isFile()) {
      validateMD(stat, '', path)
    } else if (stat.isDirectory()) {
      readDirectory(stat, path);
    }
  })
};

const readDirectory = (stat, directory) => {
  fs.readdir(directory, (err, files) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      validateMD(stat, directory, file);
    }
  });
};

const validateMD = (stat, directory, file) => {
  let fileMD;
  var path_splitted = file.split('.');
  var extension = path_splitted.pop();
  if (extension === 'md') {
    if (stat.isFile()) {
      fileMD = file;
      readFileMD(fileMD);
    } else if (stat.isDirectory()) {
      fileMD = directory + "/" + file;
      readFileMD(fileMD);
    }
  }
};

const readFileMD = (fileMD) => {
  fs.readFile(fileMD, (err, res) => {
    const text = res.toString();
    var expression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    var regex = new RegExp(expression);

    text.replace(regex, (url) => {
      fetch(url).then(function (response) {
        console.log(fileMD + "   " + url + "   " + response.status); // returns 200
      });
    })
    /* if (/hola/.test(res.toString())) {
      console.log('contiene hola')
    } else {
      console.log('no contiene hola')
    } */
  });
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
