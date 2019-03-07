const request = require('request')

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoib251cmNhbmd1bmRvZ2R1IiwiYSI6ImNqc3VwZnlxcDF6eWs0YW9lenp1Mnl6dGYifQ.pcIhtAVGh08TyWAbunjsvw&limit=1`

  request({ url, json: true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect location services', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find the location, plase try another place', undefined)
    } else {
      const [lng, lat] = body.features[0].center
      const location = body.features[0].place_name

      callback(undefined, { lat, lng, location })
    }
  })
}

module.exports = geocode