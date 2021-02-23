'use strict';
const sms_helper = require('./sms');
const scouts = require('./scouts');
const {sleep} = require('./utils')

const REPORT_TO_PHONES = process.env.REPORT_TO_PHONES.split(",")

async function startScoutLoop(){
  const scout_keys = Object.keys(scouts)
  console.log('\x1b[34%s\x1b[0m', `Scouts ready: ${scout_keys.join(" ")}`)
  const reporting_to = REPORT_TO_PHONES.map(p => p.substr(-4))
  console.log('\x1b[34m%s\x1b[0m', `Reporting to: ${reporting_to.join(" ")}`)
  console.log('\x1b[33m%s\x1b[0m', `🕵️  Gathering intel ...`)

  let sentLinks = []
  while(true){
    for(let i=0;i<scout_keys.length;i++){
      let scout = scouts[scout_keys[i]]

      const found_items = await scout.findItems().catch(er=>{
        console.log(`ERROR: ${er}`)
        return []
      })
  
      if(found_items.length){
        // console.log('\x1b[32m%s\x1b[0m', 'GOTEEM')
        found_items.forEach(item => {
          if(!sentLinks.includes(item.link)){
            // REPORT_TO_PHONES.forEach(phone => {
            //   sms_helper.send(phone, `${item.title} at ${item.link}`)
            // })
            console.log(item)
            sentLinks.push(item.link)
          }
        })
      }
    }

    await sleep(5000)
  }

  if(driver) await driver.quit()
}


startScoutLoop()