var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
mongoose = require('mongoose')
var app = express()
app.use(bodyParser.json({extended: true}))
app.use(express.static(path.join(__dirname, '../../client')))
app.use(express.static(path.join(__dirname, '../../bower_components')))
app.use(session({
  secret: 'config.sessionSecret',
  resave: false,
  saveUninitialized: true
}))
process.env.PORT = 8000
module.exports = app
