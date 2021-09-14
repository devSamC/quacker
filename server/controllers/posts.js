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

router.get('/posts/:id/comments',(req,res)=> {
  res.send(postsData[`${req.params.id}`].comments)
})

router.post('/posts', (req, res) => {
  const data = req.body
  const newPost = Post.create(data)
  console.log('i have created a new post')
  res.send({
    message: `${newPost.text} added`
  })
})

router.patch("/posts/:id/comments", (req,res) => {
  const postToPatch = Post.findById(req.params.id);
  postToPatch.addComment(req.body);
  res.sendStatus(204);
})

module.exports = router;