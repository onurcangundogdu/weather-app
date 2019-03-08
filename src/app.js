const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Onur Can Gündoğdu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Onur Can Gündoğdu'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Onur Can Gündoğdu',
    message: 'How can I help you?'
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address) {
     return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {lat, lng, location} = {}) => {
    if(error) {
      return res.send({ error })
    }
  
    forecast(lat, lng, (error, {summary, temperature, precipProbability, temperatureHigh, temperatureLow} = {}) => {
      if(error) {
        return res.send({ error })
      }

      res.send({
        forecast: `${summary}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. Highest temperature of the day is ${temperatureHigh} and lowest is ${temperatureLow}`,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Onur Can Gündoğdu',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Onur Can Gündoğdu',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})