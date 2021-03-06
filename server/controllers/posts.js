const express = require('express');
const router = express.Router();
const postsData = require('../data.js')
const Post = require('../models/posts')


router.get('/', (req, res) => {
  res.send('hello world')
  res.sendStatus(200);
})

router.get('/posts', (req, res) => {
  res.send(postsData)
  res.sendStatus(200);
})

router.get('/posts/:id/comments', (req, res) => {
  res.send(postsData[req.params.id - 1].comments)
  res.sendStatus(200);
})

router.get('/posts/:id/reactions/:reactionid', (req, res) => {
  res.send(postsData[req.params.id - 1].reactions[req.params.reactionid - 1])
  res.sendStatus(200);
})

router.get('/posts/:id/comments/:commentid/reactions/:reactionid', (req, res) => {
  res.send(postsData[req.params.id - 1].comments[req.params.commentid -1].reactions[req.params.reactionid - 1])
  res.sendStatus(200);
})

router.post('/posts', (req, res) => {
  const data = req.body
  const newPost = Post.create(data)
  console.log('i have created a new post')
  res.send({
    message: `${newPost.text} added`
  })
  res.sendStatus(200);
})

router.patch("/posts/:id/comments", (req, res) => {
  const id = req.params.id
  const commentData = req.body
  console.log('logging id and comment data')
  console.log(id, commentData)
  const postToPatch = new Post(Post.findById(id));
  console.log(postToPatch)
  console.log('logging req params id below')
  console.log(id)
  postToPatch.addComment(commentData, id);
  res.send({
    message: `comment added`
  })
  // res.sendStatus(204);
})

router.patch("/posts/:id/reactions/:reactionid", (req, res) => {
  const id = req.params.id
  const reactionId = req.params.reactionid
  const reactionData = req.body
  const postToPatch = new Post(Post.findById(id));
  console.log('now attempting to add reaction')
  console.log(`passing : data : ${reactionData},id : ${id},reactionId : ${reactionId}`)
  console.log(`data is ${reactionData.count},${reactionData.id}`)
  postToPatch.addReaction(reactionData, id, reactionId)
  res.send({
    message: `reaction added to post`
  })
  res.sendStatus(200);
})

router.patch("/posts/:id/comments/:commentid/reactions/:reactionid", (req, res) => {
  const id = req.params.id
  const commentId = req.params.commentid
  const reactionId = req.params.reactionid
  const reactionData = req.body
  const postToPatch = new Post(Post.findById(id))
  postToPatch.addCommentReaction(reactionData, id, commentId, reactionId);
  // res.send({
  //   message: `reaction added to post`
  // })
  res.sendStatus(200);
})

module.exports = router;