const request = require('request')

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/d74f2c5adb4f7acc15b556b8218fd5de/${lat},${lng}?units=si`
  
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect weather services', undefined)
    } else if(body.error) {
      callback(body.error, undefined)
    } else {
      const { summary, temperature, precipProbability } = body.currently
      const {temperatureHigh, temperatureLow} = body.daily.data[0]
      callback(undefined, { summary, temperature, precipProbability, temperatureHigh, temperatureLow })
    }
  })
}

module.exports = forecast