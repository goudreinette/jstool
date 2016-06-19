module.exports = checkExistence
const os = require('os')
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')


function checkExistence (program)
{
  try
  {
    sync(program)
  }
  catch (e)
  {
    console.log('package.json not found, running "npm init"...')
    childProcess.execSync('npm init -y')
    sync(program)
  }
}

/*
|--------------------------------------------------------------------------
| sync
|--------------------------------------------------------------------------
| Description
|
*/
function sync (program)
{
  if (program.config)
    var scriptsFile = fs.readFileSync(program.config)
  else
    var scriptsFile = fs.readFileSync(os.homedir() + '/.scripts.json')

  const packageJSON = fs.readFileSync('package.json')
  const result = mergeScripts(scriptsFile, packageJSON)
  fs.writeFile('package.json', result, printResult)
}

/*
|--------------------------------------------------------------------------
| mergeScripts
|------------- -------------------------------------------------------------
| Description
|
*/
function mergeScripts (scriptsFile, packageJSON)
{
  const scripts = JSON.parse(scriptsFile)
  const target  = JSON.parse(packageJSON)

  for (const key in scripts)
    if (!(key in target.scripts))
      target.scripts[key] = scripts[key]

  return JSON.stringify(target, null, 2)
}

/*
|--------------------------------------------------------------------------
| printResult
|--------------------------------------------------------------------------
| Description
|
*/
function printResult (err)
{
  if (err) console.error(error)
  else console.log('NPM scripts successfully synchronised!')
}
