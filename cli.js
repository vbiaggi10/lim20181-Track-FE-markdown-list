#!/usr/bin/env node

'use strict';

const mdLinks = require('./index');
const program = require('commander');

program
  .version('1.0.11')
  .arguments('<path>')
  .option('-v, --validate', 'The user to authenticate as')
  .option('-s, --stats', 'The user\'s password')
  .action(mdLinks)
program.parse(process.argv);
