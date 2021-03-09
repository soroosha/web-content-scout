const walmart_ps5 = require('./walmart_ps5/scout')
const amazon_ps5 = require('./amazon_ps5/scout')
const shoppers_ps5 = require('./shoppers_ps5/scout')
const heartbeat = require('./heartbeat')


// TODO: cleanly separate heartbeat 

module.exports = {
  amazon_ps5,
  walmart_ps5,
  shoppers_ps5,
  heartbeat
}