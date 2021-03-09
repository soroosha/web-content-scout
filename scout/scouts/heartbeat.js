const { By, until } = require('selenium-webdriver');
const selenium_helper = require('./selenium')
const { getReadableToday } = require('../utils')


async function findItems(){
  const URL = 'https://www.timeanddate.com/worldclock/'

  const driver = await selenium_helper.getDriver()

  await driver.get(URL);

  const item_selector = '#c250'
  await driver.wait(until.elementLocated(By.css(item_selector)))

  const hourminute = await driver.findElement(By.css(item_selector)).getAttribute('innerHTML')

  if(hourminute=="2:55"){
    return [{
      title: `Heartbeat`,
      link: getReadableToday()
    }]
  }
    
  return []
}


module.exports = {
  findItems
}