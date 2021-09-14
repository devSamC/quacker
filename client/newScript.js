const submitButton = document.getElementById('quack-btn');
const imageButton = document.getElementById('add-image')


imageButton.addEventListener('click', e => addImage(e))
submitButton.addEventListener('click', e => addQuack(e))

const reactionChoices = ['❤', '❓', '🔝']

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
        const newPostTitle = document.createElement('h2');
        const newPostBody = document.createElement('div');
        const newPostImage = document.createElement('img');
        const newPostText = document.createElement('p')
        const newPostReactionsEtc = document.createElement('div')
        const currentReactions = document.createElement('div')
        const reactionsHolder = document.createElement('div')

        //give div the right children
        newPost.appendChild(newPostImage)
        newPost.appendChild(newPostBody)
        newPostBody.appendChild(newPostTitle)
        newPostBody.appendChild(newPostText)
        newPostBody.appendChild(reactionsHolder)
        newPostBody.appendChild(newPostReactionsEtc)
        //make it a card
        newPost.classList.add(`card`);
        newPostBody.classList.add('card-body');
        postBox.appendChild(newPost)
        newPostText.classList.add('card-text');
        newPostImage.classList.add('card-img-top')
        newPostReactionsEtc.classList.add('text-muted', 'quack-reactions')
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`)
        //set the title
        newPostTitle.textContent = `Quack id${postsData[i].id}`
        newPostTitle.classList.add('card-title', 'custom-card-title')
        //add current reactions below the main text
        //we will add a button for each reaction choice, hopefully styled as a pill or something
        for (let k = 0; k < reactionChoices.length; k++) {
            const reactionButton = document.createElement('button')
            const currentReactionCount = postsData[i].reactions[k].count
            reactionButton.classList.add('btn', 'btn-outline-dark', 'btn-sm', 'reaction-button')
            console.log(reactionChoices[k])
            reactionButton.setAttribute('type', 'button')
            reactionButton.setAttribute('id', `reaction-button-${k}-${postsData[i].id}`)
            reactionButton.setAttribute('id-tag', `${postsData[i].id}`)
            reactionButton.setAttribute('reaction-tag', `${k+1}`)
            reactionButton.setAttribute('reaction-count', currentReactionCount)
            reactionButton.textContent = `${currentReactionCount} ${reactionChoices[k]}`
            reactionsHolder.append(reactionButton)
        }
        //comment and reaction icons
        //comment
        const cardCommentIcon = document.createElement('i')
        cardCommentIcon.classList.add('far', 'fa-comments', 'card-icons')
        newPostReactionsEtc.appendChild(cardCommentIcon)
        cardCommentIcon.setAttribute('id-tag', `${postsData[i].id}`)
        //reaction
        const cardReactionIcon = document.createElement('i')
        cardReactionIcon.classList.add('far', 'fa-heart', 'card-icons')
        newPostReactionsEtc.appendChild(cardReactionIcon)
        cardReactionIcon.setAttribute('id-tag', `${postsData[i].id}`)
        //timestamp
        const timeStamp = document.createElement('p')
        timeStamp.textContent = postsData[i].date;
        newPostReactionsEtc.appendChild(timeStamp)
        timeStamp.classList.add('timeStamp')

        //card footer
        const cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'text-muted')
        newPost.appendChild(cardFooter)
        //comments section title
        const commentsTitle = document.createElement('h4')
        commentsTitle.textContent = "Comments"
        cardFooter.appendChild(commentsTitle)
        //add comment box
        const commentBox = document.createElement('input');
        commentBox.setAttribute('type', 'text');
        commentBox.setAttribute('placeholder', 'write a comment')
        commentBox.setAttribute('id', `comment-box-${postsData[i].id}`)
        commentBox.classList.add('comment-input', 'hidden')
        cardFooter.appendChild(commentBox)

        //submit comment button
        const submitComment = document.createElement('input')
        submitComment.setAttribute('type', 'submit')
        submitComment.setAttribute('value', 'Submit comment')
        submitComment.setAttribute('id', `comment-button-${postsData[i].id}`)
        submitComment.classList.add('comment-button', 'hidden')
        cardFooter.appendChild(submitComment)
        submitComment.setAttribute('id-tag', `${postsData[i].id}`)



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
        } else {
            const noCommentText = document.createElement('p')
            noCommentText.textContent = "no comments :( be the first?"
            cardFooter.appendChild(noCommentText)
        }



    }
}

function addComment(postId) {
    const commentBox = document.getElementById(`comment-box-${postId}`);
    console.log('current comment box is')
    console.log(commentBox)
    const commentText = commentBox.value;
    console.log('current box text is')
    console.log(commentText)
    if (commentText === "") {
        commentBox.setAttribute("placeholder", "write something!")
        return console.log('empty string detected');
    }
    //somehow get current id
    const id = postId
    //send patch request to post id with new comment
    const newComment = fetch(`https://quackerapi-nodejs.herokuapp.com/posts/${id}/comments`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": `${commentText}`
        })
    }).then(response => createPage())

}

function addReactionCount(postId, reactionId, currentReactionCount) {
    const newReaction = fetch(`https://quackerapi-nodejs.herokuapp.com/posts/${postId}/reactions/${reactionId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "count": currentReactionCount + 1
        })
    }).then(response => createPage())
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
            "comments": [],

        })
    }).then(response => {
        createPage()
    })

}

function createPage() {
    generateCard()
    makeCommentsWork()
    makeCommentIconsWork()
    makeReactionsWork()
}
createPage()


function makeCommentsWork() {
    const commentButtonsHTML = document.getElementsByClassName('comment-button')
    console.log(commentButtonsHTML)
    setTimeout(() => {
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
}

function makeReactionsWork() {
    const reactionIcons = document.getElementsByClassName('reaction-button')
    console.log(reactionIcons)
    setTimeout(() => {
        const reactionIconsArray = Array.from(reactionIcons)
        for (let i = 0; i < reactionIconsArray.length; i++) {
            reactionIconsArray[i].addEventListener('click', function (e) {
                console.log('reaction button clicked')
                const postId = this.getAttribute('id-tag')
                const reactionId = this.getAttribute('reaction-tag')
                const reactionCount = this.getAttribute('reaction-count')
                addReactionCount(postId, reactionId, reactionCount);
            })
        }
    }, 1000)
}

function toggleHidden(id) {
    const postId = id
    const hiddenBox = document.getElementById(`comment-box-${id}`)
    const hiddenButton = document.getElementById(`comment-button-${id}`)
    hiddenButton.classList.toggle('hidden')
    hiddenBox.classList.toggle('hidden');
}

function makeCommentIconsWork() {
    const cardIcons = document.getElementsByClassName('fa-comments')
    setTimeout(() => {
        const cardIconsArray = Array.from(cardIcons)
        for (let i = 0; i < cardIconsArray.length; i++) {
            cardIconsArray[i].addEventListener('click', function (e) {
                const postId = this.getAttribute('id-tag')
                toggleHidden(postId)
            })

        }
    }, 1000)
}








// for (let i = 0; i < commentButtonsArray.length; i++)
// console.log(commentButtonsArray)