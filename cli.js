#!/usr/bin/env node

'use strict';

const mdLinks = require('./index');
const program = require('commander');

program
  .version('1.0.47')
  .arguments('<path>')
  .option('-v, --validate', 'HTTP request to find out if the link works or not')
  .option('-s, --stats', 'basic statistics about links')
  .action(mdLinks)
program.parse(process.argv);
