
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  
function getReadableToday(){
  let date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
  return date.toISOString().split('T')[0]
}

module.exports = {
  sleep,
  getReadableToday
}