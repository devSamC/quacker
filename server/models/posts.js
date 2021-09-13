const postsData = require(`../data.js`)

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
      const postsData = postsData.filter((post) => post.id === id);
      const post = new Post(postsData);
      return post
    } catch (error) {
      throw new Error('no such post with id')
    }
  }
  static create(post) {
    const newPost = new Post({ ...post })
    newPost.id = postsData.length+1
    postsData.push(newPost);
    return newPost;
  }

  addReaction (id, reactionData) {
    const post = findById(id);
    post.reactions 
  }

  addComment(id, commentData) {
    const post = findById(id);
    currentCommentId = post.comments.length
    post.comments[currentCommentId+1] = commentData
    
  }

  deletePost(id) {
    const post = findById(id);
    postsData.splice(postsData.indexOf(post), 1);
  }


}
module.exports = Post