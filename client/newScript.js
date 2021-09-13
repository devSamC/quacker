const submitButton = document.getElementById('quack-btn');
submitButton.addEventListener('click', e => addQuack(e))
// const axios = require('axios')
async function generateCard() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/players')
    console.log(posts)
    const postsData = await posts.json()
    console.log(postsData)
    const postBox = document.getElementById('quack-test-holder');
    postBox.innerHTML= ""
    for (let i = 0; i < postsData.length; i++) {
    const newPost = document.createElement('div');
    const newPostText = document.createElement('p')
    newPost.appendChild(newPostText)
    newPost.classList.add('card');
    postBox.appendChild(newPost)
    newPostText.textContent = postsData[i].text;
    }
}


function addQuack(e) {
    e.preventDefault();
    console.log('clicked')
    //send post data to server and then retrieve
    //first just console log the data that we get
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    const newPost = fetch('https://quackerapi-nodejs.herokuapp.com/players', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": `${postText}`
        })
    })
    generateCard();
}
generateCard()
