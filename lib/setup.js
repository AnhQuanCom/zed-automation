const { chromium } = require('playwright')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const os = require('os')
const config = require('config')

module.exports = async function () {
  const browser = await chromium.launchServer({ headless: config.get('headless') })

  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser

}