#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

let options = {
  validate: false,
  stats: false
};
let totalCount = 0;
let okCount = 0;
let brokenCount = 0;
let uniqueCount = 0;

const readDirectory = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          readDirectory(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          results = results.filter(checkMD);
          // readFileMD(results, options)
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const readFileMD = (fileMD, done) => {
  let results = [];
  fs.readFile(fileMD, (err, list) => {
    list = list.toString().split("\n");

    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((url) => {
      console.log(url)
      const expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
      const expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;
      const expressionLinkMatch = url.match(expressionLink);
      const expressionLinkMDMatch = url.match(expressionLinkMD);
      if (expressionLink.test(expressionLinkMatch)) {
        const newUrl = url.replace(/[\n \ ]/gi, '');
        console.log(newUrl)

        results.push(newUrl);
        if (!--pending) done(null, results);
        // console.log(fileMD + '  \t' + newUrl + '  \tLink a  \t' + tittle);

      }
      // fs.stat(url, (err, stat) => {
      //   if (stat && stat.isDirectory()) {
      //     readFileMD(url, (err, res) => {
      //       results = results.concat(res);
      //       if (!--pending) done(null, results);
      //     });
      //   } else {
      //     results.push(url);
      //     // results = results.filter(checkMD);
      //     // readFileMD(results, options)
      //     if (!--pending) done(null, results);
      //   }
      // });

    });
  });


};

const checkMD = (results) => {
  return path.extname(results) === '.md'
}

readFileMD('./src/index.md', function (err, results) {
  if (err) throw err.code;
  console.log(results);
  // console.log(results.filter(checkMD));

});
