#!/usr/bin/env node

const fs = require("fs");
// const mdLinks = require("md-links");


let directory;
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
  let msg;
  let cont = 0;
  fs.readFile(fileMD, (err, res) => {
    if (/hola/.test(res.toString())) {
      console.log('contiene hola')
    } else {
      console.log('no contiene hola')
    }
  });
}

// for (const i in process.argv) {
//   console.log(process.argv)
//   if (process.argv[i] === 'md-links') {
directory = process.argv[2];
mdLinks(directory, options)
//   }
// }

/* process.argv.forEach((val, index) => {
  if (index === 2) {
    console.log(val)
    directory = val;
    mdLinks(directory, options)
  }
}) */

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
