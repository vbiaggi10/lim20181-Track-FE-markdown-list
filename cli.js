#!/usr/bin/env node

'use strict';

const mdLinks = require('./index');
const program = require('commander');

const exeMdLinks = (path, options) => {
  mdLinks(path, options).then( data => {
    console.log(data)
  })
} 

program
<<<<<<< HEAD
  .version('1.0.53')
=======
  .version('1.0.52')
>>>>>>> 610d42805fd6eedd8f7c47b3ade42a374850e5bf
  .arguments('<path>')
  .option('-v, --validate', 'HTTP request to find out if the link works or not')
  .option('-s, --stats', 'basic statistics about links')
  .action(exeMdLinks);
program.parse(process.argv);
