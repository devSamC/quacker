const submitButton = document.getElementById('quack-btn');
const imageButton = document.getElementById('add-image')
imageButton.addEventListener('click', e => addImage(e))
submitButton.addEventListener('click', e => addQuack(e))
// const axios = require('axios')

async function getAllPosts() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/posts')
    const postsData = await posts.json()
    return postsData
}


function addImage() {
    console.log('clicked image button')
    const imageInputForm = document.getElementById('img-input')
    imageInputForm.classList.toggle('hidden')
    // const topQuack = document.getElementById('top-quack')
    // const imageInputDiv = document.createElement('div');
    // const imageInputForm = document.createElement('input')
    // imageInputForm.setAttribute("type","text")
    // imageInputForm.setAttribute("placeholder","enter image url")
    // topQuack.appendChild(imageInputDiv);
    // imageInputDiv.appendChild(imageInputForm);
    //redundant code above

    //good code below

    const newImage = imageInputForm.value

}



async function generateCard() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/posts')
    console.log(posts)
    const postsData = await posts.json()
    console.log(postsData)
    const postBox = document.getElementById('quack-test-holder');
    postBox.innerHTML = ""
    for (let i = 0; i < postsData.length; i++) {
        const newPost = document.createElement('div');
        const newPostBody = document.createElement('div');
        const newPostImage = document.createElement('img');
        const newPostText = document.createElement('p')
        newPost.appendChild(newPostImage)
        newPost.appendChild(newPostBody)
        newPostBody.appendChild(newPostText)

        newPost.classList.add('card');
        newPostBody.classList.add('card-body');
        postBox.appendChild(newPost)
        newPostText.classList.add('card-text');
        newPostImage.classList.add('card-img-top')
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`)
        //card footer
        const cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'text-muted')
        newPost.appendChild(cardFooter)
        //timestamp
        const timeStamp = document.createElement('p')
        timeStamp.textContent = postsData[i].date;
        cardFooter.appendChild(timeStamp)
        //comment and reaction icons
        //comment
        const cardCommentIcon = document.createElement('i')
        cardCommentIcon.classList.add('far', 'fa-comments', 'card-icons')
        cardFooter.appendChild(cardCommentIcon)
        //reaction
        const cardReactionIcon = document.createElement('i')
        cardReactionIcon.classList.add('far', 'fa-heart', 'card-icons')
        cardFooter.appendChild(cardReactionIcon)


    }
}


function addQuack(e) {
    e.preventDefault();
    console.log('clicked')
    //send post data to server and then retrieve
    //first just console log the data that we get 
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    if(postText === "") {
        quackBox.setAttribute("placeholder","You need to write something!")
    }
    const imageInputForm = document.getElementById('img-input')
    const newImage = imageInputForm.value
    imageInputForm.value = ""
    //check if hidden class exists before toggling
    if (!imageInputForm.classList.contains('hidden')) {
        imageInputForm.classList.toggle('hidden');
    }
    quackBox.value = ""
    const allPosts = getAllPosts()
    const newPost = fetch('https://quackerapi-nodejs.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            //because we are using object destructuring in the router, we can send only the parameters we want
            //to be overwritten w.r.t default
            "text": `${postText}`,
            "picture": `${newImage}`,
            "reactions": "",
            "comments": "",

        })
    }).then(response => {
        generateCard()
    })

}
generateCard()