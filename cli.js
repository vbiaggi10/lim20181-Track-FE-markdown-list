#!/usr/bin/env node

'use strict';

const mdLinks = require('./index');
const program = require('commander');


let mdLinksFunction = (directory, options) => {
  console.log(directory);
  console.log(options.validate);
  console.log(options.stats);

  mdLinks(directory, options);
}

program
  .version('1.0.11')
  .arguments('<file>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(mdLinksFunction)
program.parse(process.argv);