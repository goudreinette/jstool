#!/usr/bin/env node
const program = require('commander')
const sync    = require('./sync')

program
  .command('sync')
  .option('-c, --config <config>', 'config file to use. default: ~/.tasks.json')
  .option('-s, --script <script>', 'single script to copy')
  .action(sync)

program.parse(process.argv)
