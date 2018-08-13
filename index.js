/* import lodash from 'lodash';
exports.printMsg = function() {
    console.log('This msg is from boilerplate');
} */

const fs = require("fs");
var path = require('path');
let directory;

process.argv.forEach((val, index) => {
  if (index === 2) {
    directory = val;
    fs.stat(directory, (err, stat) => {
      if (stat.isFile()) {
        validateMD(stat, directory)
      }
      else if (stat.isDirectory()) {
        readDirectory(stat, directory);
      }
    })

  }
})

const readDirectory = (stat, directory) => {
  fs.readdir(directory, (err, files) => {
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      // console.log(element)
      validateMD(stat, element);
    }
  });
};

const validateMD = (stat, element) => {
  let fileMD;
  var path_splitted = element.split('.');
  var extension = path_splitted.pop();
  if (extension === 'md') {
    if (stat.isFile()) {
      fileMD = directory;
      readFileMD(fileMD);
    }
    else if (stat.isDirectory()) {
      fileMD = directory + "/" + element;
      readFileMD(fileMD);
    }
  }
};

const readFileMD = (fileMD) => {
  fs.readFile(fileMD, (err, res) => {
    if (/hola/.test(res.toString()))
      console.log("si se encontro")
    else
      console.log("No se encontro")
  });
}

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
