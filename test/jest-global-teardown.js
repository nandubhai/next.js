'use strict'

let globalTeardown
const browser = global.bsBrowser
const chromedriver = require('chromedriver')

if (process.env.BROWSERSTACK) {
  globalTeardown = () => {
  //  chromedriver.stop();
    global.browserStackLocal.killAllProcesses(() => {})
  }
} else {
  globalTeardown = () => chromedriver.stop()
}

module.exports = async () => {
  if (browser) {
    // Close all remaining browser windows
    try {
      const windows = await browser.windowHandles()
      for (const window of windows) {
        if (!window) continue
        await browser.window(window)
        await browser.origClose()
        await browser.quit();
      }
    } catch (_) {}
  }
  await globalTeardown()
}
