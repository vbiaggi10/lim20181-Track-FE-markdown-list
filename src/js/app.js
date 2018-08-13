/* import lodash from 'lodash';
exports.printMsg = function() {
    console.log('This msg is from boilerplate');
} */

const fs = require("fs");
var path = require('path');

var dir = './';
fs.readdir(dir, (err, files) => {
  var r = [];
  files.forEach((file) => {
    s(file);
    function s(file) {
      fs.stat(dir + '/' + file, (err, stat) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stat.isDirectory())
          r.push({ f: file, type: 'dir' });
        else if (stat.isFile())
          r.push({ f: file, type: 'file' });
        else 
          r.push(0);
        if (r.length == files.length) {
          r.filter((m) => { return m; });
          console.log(r);
        }
      });
    }
  });
});

fs.readFile('./src/index.md', (err, res) => {
  if (/hola/.test(res.toString()))
    console.log("si se encontro")
  else
    console.log("No se encontro")
});





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
