const express = require('express');
const router = express.Router();
const postsData = require('../data.js')
const Post = require('../models/posts')

router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/posts', (req, res) => {
  res.send(postsData)
})

router.post('/posts', (req, res) => {
  const data = req.body
  const newPost = Post.create(data)
  console.log('i have created a new post')
  res.send({
    message: `${newPost.text} added`
  })
})

module.exports = router;