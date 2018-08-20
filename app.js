#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

let link = {
  href: '',
  text: '',
  file: ''
};

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
    list = list.toString().split(' ');
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);

    const expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    const expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;

    if (expressionLink.test(results)) {
      readFileMD(list, (err, res) => {
        console.log(res)
        if (!--pending) done(null, results);
      });
    } else if (expressionLinkMD.test(results)) {
      results.push(list);
      console.log(results)
      if (!--pending) done(null, results);
    }
  });


};

const checkMD = (results) => {
  return path.extname(results) === '.md';
}

const replaceURL = (results) => {
  const expressionLink = /[^()]((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  const expressionLinkMD = /\[([\w\s]*)\]\(((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)\)/gi;

  // const expressionLinkMatch = results.match(expressionLink);
  // const expressionLinkMDMatch = results.match(expressionLinkMD);

  if (expressionLink.test(results)) {
    console.log('89: ' + results)
  } else if (expressionLinkMD.test(results)) {
    console.log('91: ' + results)
  } else {
    console.log('no')
  }
}

readFileMD('./src/index.md', function (err, results) {
  if (err) throw err.code;
  console.log(results);
  // console.log(results.filter(checkMD));

});
