const postsData = require(`../data.js`)
const dayjs = require('dayjs')

class Post {
  constructor(data) {
    this.id = data.id
    this.text = data.text
    this.picture = data.picture
    this.reactions = data.reactions
    this.comments = data.comments
    this.date = data.date
  }
  static get all() {
    const posts = postsData.map((post) => new Post(post));
    return posts;
  }

  static findById(id) {
    try {
      // console.log(id)
      // console.log(postsData)
      // console.log(postsData)
      // const postsData = postsData.filter((post) => post.id === id);
      // console.log(postsData)
      // const post = new Post(postsData);
      // console.log(post)
      return postsData[id-1]
    } catch (error) {
      throw new Error('no such post with id')
    }
  }
  static create(post) {
    const currentTime = dayjs().toString();
    const newPost = new Post({
      id: postsData.length + 1,
      date: currentTime,
      ...post
    })
    postsData.push(newPost);
    return newPost;
  }

  addReaction(id, reactionData) {
    const post = findById(id);
    post.reactions
  }

  addComment(commentData, id) {
    const commentText = commentData.text
    // //get current post
    // const post = findById(id);
    //get current id then create new comment with id
    // const post = currentPost
    const currentPost = postsData[id-1];
    console.log(currentPost)
    const currentCommentId = currentPost.comments.length
    currentPost.comments.push({id: currentCommentId + 1, text: commentText, reactions: ""})
  }

  deletePost(id) {
    const post = findById(id);
    postsData.splice(postsData.indexOf(post), 1);
  }


}
module.exports = Post