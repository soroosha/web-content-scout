const { By, until } = require('selenium-webdriver');
const selenium_helper = require('../selenium')

async function findItems(){
  let PS5s = []
  const URL = 'https://www.amazon.ca/s?k=playstation+5+console&i=videogames&rh=n%3A3198031%2Cn%3A20974860011%2Cn%3A20974875011%2Cp_89%3APlaystation&dc'

  const driver = await selenium_helper.getDriver()

  await driver.get(URL);

  // wait until page loads with search results
  const item_selector = '.s-search-results.s-main-slot .sg-col-inner .a-section.a-spacing-medium > div:last-child > div:last-child'
  await driver.wait(until.elementLocated(By.css(item_selector)))

  const item_elements = await driver.findElements(By.css(item_selector))
  for(let i=0;i<item_elements.length;i++){
    const el = item_elements[i]

    const html = await el.getAttribute('innerHTML')
    const price_els = await el.findElements(By.css('span.a-price'))
    if(!html.includes('Sponsored') && price_els.length>0){
      const link_el = await el.findElement(By.css('.a-size-mini a'))
      const link = await link_el.getAttribute("href")
      const title = await link_el.findElement(By.css('span')).getAttribute("innerHTML")
      PS5s.push({
        title,
        link
      })
    }
  }

  return PS5s
}


module.exports = {
  findItems
}