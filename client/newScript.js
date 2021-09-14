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
    for (let i = postsData.length - 1; i >= 0; i--) {
        //iterate backwards through array to give posts in chronological order
        const newPost = document.createElement('div');
        const newPostBody = document.createElement('div');
        const newPostImage = document.createElement('img');
        const newPostText = document.createElement('p')
        const newPostReactionsEtc = document.createElement('div')
        newPost.appendChild(newPostImage)
        newPost.appendChild(newPostBody)
        newPostBody.appendChild(newPostText)
        newPostBody.appendChild(newPostReactionsEtc)
        newPost.classList.add(`card`);
        newPostBody.classList.add('card-body');
        postBox.appendChild(newPost)
        newPostText.classList.add('card-text');
        newPostImage.classList.add('card-img-top')
        newPostReactionsEtc.classList.add('text-muted', 'quack-reactions')
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`)

        //comment and reaction icons
        //comment
        const cardCommentIcon = document.createElement('i')
        cardCommentIcon.classList.add('far', 'fa-comments', 'card-icons')
        newPostReactionsEtc.appendChild(cardCommentIcon)
        //reaction
        const cardReactionIcon = document.createElement('i')
        cardReactionIcon.classList.add('far', 'fa-heart', 'card-icons')
        newPostReactionsEtc.appendChild(cardReactionIcon)
        //timestamp
        const timeStamp = document.createElement('p')
        timeStamp.textContent = postsData[i].date;
        newPostReactionsEtc.appendChild(timeStamp)

        //card footer
        const cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'text-muted')
        newPost.appendChild(cardFooter)
        //add comment box
        const commentBox = document.createElement('input');
        commentBox.setAttribute('type', 'text');
        commentBox.setAttribute('placeholder', 'write a comment')
        commentBox.setAttribute('id',`comment-box-${postsData[i].id}`)
        cardFooter.appendChild(commentBox)
        
        //submit comment button
        const submitComment = document.createElement('input')
        submitComment.setAttribute('type', 'submit')
        submitComment.setAttribute('value', 'Submit comment')
        submitComment.classList.add('comment-button')
        cardFooter.appendChild(submitComment)
        submitComment.setAttribute('id-tag',`${postsData[i].id}`)
        //iterate through comments array and add each one to footer
        if (postsData[i].comments.length !== 0) {
            for (let j = 0; j < postsData[i].comments.length; j++) {
                const commentCard = document.createElement('div')
                commentCard.classList.add('card')
                const commentCardBody = document.createElement('div');
                commentCardBody.classList.add('card-body')
                const commentText = document.createElement('p');
                commentText.textContent = postsData[i].comments[j].text
                commentCard.appendChild(commentCardBody);
                commentCardBody.appendChild(commentText);
                cardFooter.appendChild(commentCard);
            }
        }



    }
}

function addComment(postId) {
    const commentBox = document.getElementsByClassName(`comment-box-${postId}`);
    console.log('current comment box is')
    console.log(commentBox)
    const commentText = commentBox.value;
    //somehow get current id
    const id = postId
    //send patch request to post id with new comment
    const newComment = fetch(`https://quackerapi-nodejs.herokuapp.com/posts/${id}/comments`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: `${commentText}`
        })
    })
    generateCard()
}


function addQuack(e) {
    e.preventDefault();
    console.log('clicked')
    //send post data to server and then retrieve
    //first just console log the data that we get 
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    if (postText === "") {
        quackBox.setAttribute("placeholder", "You need to write something!")
        return console.log('empty string detected');
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

const commentButtonsHTML = document.getElementsByClassName('comment-button')
console.log(commentButtonsHTML)
setTimeout(()=> {
    const commentButtons = Array.from(commentButtonsHTML)
    console.log(commentButtons)
    for (let i = 0; i < commentButtons.length; i++) {
        console.log('hello')
        commentButtons[i].addEventListener('click', function (e) {
            const postId = this.getAttribute("id-tag");
            addComment(postId);
    
        })
        console.log(`added event listener to ${commentButtons[i]}`)
    }
}, 1000)

// for (let i = 0; i < commentButtonsArray.length; i++)
// console.log(commentButtonsArray)