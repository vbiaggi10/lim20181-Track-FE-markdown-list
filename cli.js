#!/usr/bin/env node

'use strict';

const mdLinks = require('./index');
const program = require('commander');

let options = {
  validate: false,
  stats: false
};

let mdLinksFunction = (path, option) => {

  options = option;

  console.log(path);
  console.log(options.validate);
  console.log(options.stats);

  mdLinks(path, options);
}

program
  .version('1.0.11')
  .arguments('<path>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(mdLinksFunction)
program.parse(process.argv);
