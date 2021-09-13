const submitButton = document.getElementById('quack-btn');
submitButton.addEventListener('click', e => addQuack(e))
// const axios = require('axios')
async function generateCard() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/players')
    console.log(posts)
    const postsData = await posts.json()
    console.log(postsData)
    const postBox = document.getElementById('quack-test-holder');
    const newPost = document.createElement('div');
    const newPostText = document.createElement('p')
    newPost.appendChild(newPostText)
    postBox.appendChild(newPost)
    newPostText.textContent = postsData[0].text;
}


function addQuack(e) {
    e.preventDefault();
    console.log('clicked')
    //send post data to server and then retrieve
    //first just console log the data that we get
    // const quackBox = document.getElementById('quack-input');
    // const postText = quackBox.value
    // console.log(postText)
    generateCard();
}

