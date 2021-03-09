'use strict';
const sms_helper = require('./sms');
const scouts = require('./scouts');
const selenium = require('./scouts/selenium')
const {sleep,timeout, getReadableNow} = require('./utils')

const REPORT_TO_PHONES = process.env.REPORT_TO_PHONES.split(",")

const SCOUT_IMEOUT_SEC = 15
function runScout(scout_key){
  return new Promise((resolve,reject)=>{
    timeout(scout_key, SCOUT_IMEOUT_SEC*1000, `Stoopid ${scout_key} too slow`).then().catch(reject)
    scouts[scout_key].findItems().then(resolve).catch(reject)
  })  
}

async function startScoutLoop(){
  const scout_names = Object.keys(scouts)
  console.log('\x1b[34m%s\x1b[0m', `Scouts ready: ${scout_names.join(" ")}`)
  const reporting_to = REPORT_TO_PHONES.map(p => p.substr(-4))
  console.log('\x1b[34m%s\x1b[0m', `Reporting to: ${reporting_to.join(" ")}`)
  console.log('\x1b[33m%s\x1b[0m', `🕵️  Gathering intel ...`)

  let sent_items = {} // <item id>:<time sent>
  let last_time = new Date()
  while(true){
    for(let i=0;i<scout_names.length;i++){
      const scout_name = scout_names[i]
      const found_items = await runScout(scout_name).catch(async er=>{
        console.log('\x1b[31m%s\x1b[0m', `ERROR: ${er}`)
        await selenium.resetDriver()
        return []
      })
  
      if(found_items.length){
        found_items.forEach(item => {
          const item_id = `${scout_name}_${item.title}`
          if(!sent_items[item_id]){
            if(scout_name=="heartbeat"){
              // only send heartbeat to admin (first phone)
              sms_helper.send(REPORT_TO_PHONES[0], `${item.title} at ${item.link}`)
            }else{
              REPORT_TO_PHONES.forEach(phone => {
                sms_helper.send(phone, `${item.title} at ${item.link}`)
              }) 
            }
            sent_items[item_id]=new Date()
          }else if((new Date())-sent_items[item_id]>(1000*1800)){
            // remove stale results (older than 30min)
            delete sent_items[item_id]
          }
        })
      }
    }

    let now = new Date()
    if((now-last_time)>=(1000*1800)){
      console.log('\x1b[33m%s\x1b[0m',`[${getReadableNow()}] 🕵️`)
      last_time=now
    }

    await sleep(5000)
  }

  // if(driver) await driver.quit()
}




startScoutLoop()