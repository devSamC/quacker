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
  res.send(postsData[req.params.id-1].comments)
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
  const id = req.params.id
  const commentData = req.body
  console.log('logging id and comment data')
  console.log(id,commentData)
  const postToPatch = new Post(Post.findById(id));
  console.log(postToPatch)
  console.log('logging req params id below')
  console.log(id)
  postToPatch.addComment(commentData, id);
  res.sendStatus(204);
})

module.exports = router;