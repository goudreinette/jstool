#!/usr/bin/env node
/**
 * JSTool
 * 
 * For running build tasks from a json file.
 */
const path    = require('path')
const fs      = require('fs')
const exec    = require('child_process').exec
const program = require('commander')

program
  .arguments('<task>')
  .option('-c, --config <config>', 'config file to use. default: ~/.tasks.json')
  .action(readFile)

program
  .parse(process.argv)

function readFile (task)
{
  if (program.config)
    fs.readFile(process.cwd() + '/' + program.config, getTask)
  else
    fs.readFile('/home/reinvdwoerd/.tasks.json', getTask)
}

function getTask (err, data)
{
  if (err) throw err
  const tasks = JSON.parse(data)
  execute(program.rawArgs[2], tasks[program.rawArgs[2]])
}

function execute (taskKey, taskValue)
{
  console.log(`running task [${taskKey}]...`)
  exec(taskValue, puts)
}

function puts (err, stdout, stderr)
{
  if (err)
    console.log(err)
  if (stdout)
    console.log(stdout)
  if (stderr)
    console.log(stderr)
}

