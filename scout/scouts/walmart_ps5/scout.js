const { By, until } = require('selenium-webdriver');
const selenium_helper = require('../selenium')


async function findItems(){
  let PS5s = []
  const URL = 'https://www.walmart.ca/search?q=PlayStation%C2%AE5%20console'

  const driver = await selenium_helper.getDriver()

  await driver.get(URL);

  // wait until page loads with search results
  const item_selector = '#product-results > div > div'
  await driver.wait(until.elementLocated(By.css(item_selector)))

  const item_elements = await driver.findElements(By.css(item_selector))
  for(let i=0;i<item_elements.length;i++){
    const el = item_elements[i]

    const buttons = await el.findElements(By.css('button'))
    if(buttons.length){
      const buttonText = await buttons[0].getAttribute('innerHTML')
      if(buttonText=='Add to cart'){
        const link = await el.findElement(By.css('a')).getAttribute('href')
        const title_selector = 'a > div > div:nth-child(2) > div:first-child > div:first-child p'
        const title = await el.findElement(By.css(title_selector)).getAttribute("innerHTML")

        PS5s.push({
          title,
          link
        })
      }
    }
  }

  return PS5s
  // await driver.findElement(By.name('num1')).sendKeys('5', Key.ENTER);
  // await driver.findElement(By.name('num2')).sendKeys('10', Key.ENTER);
  // click() -> click on this elemen
  // await driver.findElement(By.id('add')).click();
  // getText() -> Get the visible (i.e. not hidden by CSS) innerText of spesific element,
  // const output = await driver.findElement(By.id('output')).getText();
}


module.exports = {
  findItems
}