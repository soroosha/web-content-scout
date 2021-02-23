const { Builder } = require('selenium-webdriver');
const { sleep } = require('../utils')

async function attemptToBuildDriver(){
  return new Builder()
    // Sets the URL of a server to use
    .usingServer("http://selenium:4444/wd/hub")
    // Setting capabilities when requesting a new session
    .withCapabilities({"browserName":"chrome"})
    // Creates a new WebDriver client based on this builder's current configuration. 
    .build();
}
async function buildDriver(maxRetries) {
  console.log(`Building web driver...`)
  return await attemptToBuildDriver().catch(async ()=>{
    if(maxRetries>0){
      await sleep(3000)
      return buildDriver(maxRetries-1)
    }else{
      throw 'Failed to build driver too many times.'
    }
  })
}

let driver
async function getDriver(){
  if(!driver){
    driver = await buildDriver(5)
  }
  return driver
}

module.exports = {
  getDriver
}
