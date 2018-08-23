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
  .version('1.0.47')
  .arguments('<path>')
  .option('-v, --validate', 'HTTP request to find out if the link works or not')
  .option('-s, --stats', 'basic statistics about links')
  .action(exeMdLinks);
program.parse(process.argv);
