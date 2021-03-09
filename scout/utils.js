
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
let timeouts = {}
function timeout(key, ms, error_message){
  return new Promise((resolve,reject)=>{
    if(timeouts[key]){
      clearTimeout(timeouts[key])
    }
    timeouts[key]=setTimeout(()=>{reject(error_message)}, ms);
  })
}
function getReadableToday(){
  let date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
  return date.toISOString().split('T')[0]
}
function getReadableNow(){
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

module.exports = {
  sleep,
  timeout,
  getReadableToday,
  getReadableNow
}