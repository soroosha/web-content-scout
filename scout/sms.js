// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function send(to, body){
  return new Promise((resolve, reject)=>{
    client.messages
    .create({
      body,
      from: '+16473725060',
      to
    })
    .then( (message) => resolve(message.sid))
    .catch( (error) => reject(error))
  })
}

module.exports = {
  send
}