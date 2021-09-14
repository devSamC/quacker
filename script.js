const axios = require('axios')

//save all users to use in later functions
const allUsers = getUsers()


//get request that returns all users from heroku

function getUsers() {
    axios.get('https://quackerapi-nodejs.herokuapp.com/posts').then((response) => console.log(response.data))

}

//get request that returns all posts filter
function getPosts() {
    axios.get('https://quackerapi-nodejs.herokuapp.com/posts').then((response) => console.log(response.data))
}

//post request that creates new user - need to change to use logic from users.js
//please ignore david for now - i am just using this to illustrate the data structure we need for the user object
function postDavid() {
    axios.post('https://quackerapi-nodejs.herokuapp.com/posts', {
        id: 3,
        name: 'David',
        picture: 'also-none',
        posts: 
            {
                id: 1,
                postData: {
                    text: "",
                    image: "",
                    comments: {
                        id: 1,
                        text: "",
                        image: ""
                    },
                    reactions: {}
                }
            }

        }
    )
    console.log('added David')
}


//need function that creates new post
function createNewPost(postData) {
    //get text input from html
    const post = document.getElementById('post-text-input')
    const postText = post.textContent
    //save image from html image input
    const postImage = document.getElementById('post-image')
    //append these to postData of user
    // const
    //     user.posts.postData.text = postText
    // user.posts.postData.image = postImage
}

//need function that creates new comment
function createNewComment(userId, postId) {
    //first get user by user id
    const user = allUsers.filter(user => user[id] === userId);
    //get comment box by id
    const comment = document.getElementById('post-comment');
    //get comment text
    const commentText = comment.textContent;
    //add comment text to postData for postId
    user.posts[postId].postData.comments = commentText
}





//i think we should probably use giphy sdk templates instead of getting the gifs directly from api - need to look into this
function trendingGifs() {
    axios.get('api.giphy.com/v1/gifs/trending?api_key=1r3SxdxCBGLpK65xQbL3E8TIpAxpEqPd')
}




//need function that adds reaction to post
function addReaction(userId, postId) {
    //need to change to a user method
    const user = allUsers.filter(user => user[id] === userId);
    const post = user.posts[postId]
    //somehow get reaction choice
    const reaction = {}
    //gives an object that i will call 'reaction'
    post.postData.reactions = reaction
}
//need function that adds reaction to comment - probably same as above except for comments
//need function that gets gifs from giphy api - see above


//need to be able to remove user by name or id
// commenting this out for now - need to add delete router to index.js
// function deleteDavid() {
//   axios.delete('https://quackerapi-nodejs.herokuapp.com/posts', {
//   id: 3,
//     name: 'David',
//     picture: 'also-none',
//     posts: 30
// })

getUsers()
postDavid()
getUsers()
// deleteDavid()
// getUsers()



//need to put users into html
//



module.exports = {
    getUsers
}