const { By, until } = require('selenium-webdriver');
const selenium_helper = require('../selenium')


async function findItems(){
  let PS5s = []
  const URL = 'https://shop.shoppersdrugmart.ca/Shop/Categories/Electronics/Electronics/Video-Games/Consoles-&-Gaming-Accessories/c/FS-EL-201?nav=%2Fshop%2FCategories%2FElectronics%2FVideoGames%2FConsolesAndGamingAccessories&sort=trending&page=0&hid=electronicsLandingPage_departmentTiles_Consoles+&+Gaming+Accessories_5=&q=%3Atrending%3AbrandName%3APlayStation%3AshowInStock%3Atrue'

  const driver = await selenium_helper.getDriver()

  await driver.get(URL);

  // wait until page loads with search results
  const item_selector = 'section[data-testid="product-list"] > div > a'
  await driver.wait(until.elementLocated(By.css(item_selector)))

  const item_elements = await driver.findElements(By.css(item_selector))
  for(let i=0;i<item_elements.length;i++){
    const el = item_elements[i]

    const title = await el.findElement(By.css('div:nth-child(3) > div:nth-child(2) > p:first-child')).getAttribute('innerHTML')
    const price_str = await el.findElement(By.css('p[data-testid="price-container"] > span')).getAttribute('innerHTML')
    const price = Number(price_str.replace(/[^0-9.-]+/g,""))
    if(title.toLowerCase().includes('console') && price > 600){
      const link = await el.getAttribute("href")
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