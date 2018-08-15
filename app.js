const fs = require("fs");
const fetch = require("node-fetch");

const mdLinks = (path, options) => {
  let fileMD;
  var extension;
  var path_splitted;
  fs.stat(path, (err, stat) => {
    if (stat.isFile()) {
      validateMD(stat, '', path, options)
      path_splitted = path.split('.');

    } else if (stat.isDirectory()) {
      readDirectory(stat, path, options);
      fs.readdir(path, (err, files) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          path_splitted = file.split('.');
        }
      });
    }
    extension = path_splitted.pop();
    if (extension === 'md') {
      if (stat.isFile()) {
        fileMD = file;
        readFileMD(fileMD, options);
      } else if (stat.isDirectory()) {
        fileMD = directory + "/" + file;
        readFileMD(fileMD, options);
      }
    }
  });


}

console.log(`Current directory: ${process.cwd()}`);

mdLinks('./src', true);

// module.exports = mdLinks;
