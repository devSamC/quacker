const express = require('express');
const router = express.Router();
const importData = require('./data.js')

router.get('/', (req,res) => {
  res.send('hello world')
})

router.get('/players', (req,res) => {
  res.send(importData)
})

router.post('/players', (req,res) => {
  const data = req.body
  const newUser = User.create(data)
  res.send({
    message: `${newUser.name} added`
  })
})

