const submitButton = document.getElementById('quack-btn');
const imageButton = document.getElementById('add-image')
// const giphyURL = require('./giphy.js')

// console.log('now logging giphy url')
// console.log(giphyURL)

// const giphyURL = giphy.init()





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
    
    const postsData = await posts.json()
    
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
        reactionsHolder.classList.add('reactions-div')
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
    
    const commentText = commentBox.value;
    
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
            "count": currentReactionCount
        })
    }).then(response => createPage())
}

// giphy api stuff 

let APIKEY = "91J9L3KzBaZxex6NxItZcvPTbFjKvQnn";
// you will need to get your own API KEY
// https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //  data, pagination, meta
               
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                document.querySelector("#search").value = content.data[0].images.downsized.url;
                
                return img.src;
            })
            .catch(err => {
                console.error(err);
            });
    });
}




function addQuack(e) {
    e.preventDefault();
    
    //send post data to server and then retrieve
    //first just console log the data that we get 
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    if (postText === "") {
        quackBox.setAttribute("placeholder", "You need to write something!")
        return console.log('empty string detected');
    }
    const gifInputForm = document.getElementById('search')
    const imageInputForm = document.getElementById('img-input')
    //check if gif input form has anything - if so use that for image
    if (gifInputForm.value) {
        console.log('found gif')
        const newImage = gifInputForm.value;
    } else {
        const newImage = imageInputForm.value
    }

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
            "gif": `${newGif}`,
            "reactions": [{
                id: 1,
                count: 0
            }, {
                id: 2,
                count: 0
            }, {
                id: 3,
                count: 0
            }],
            "comments": [],

        })
    }).then(response => {
        createPage()
    })

}

function createPage() {
    init()
    generateCard()
    makeCommentsWork()
    makeCommentIconsWork()
    makeReactionsWork()

}
createPage()


function makeCommentsWork() {
    const commentButtonsHTML = document.getElementsByClassName('comment-button')
    setTimeout(() => {
        const commentButtons = Array.from(commentButtonsHTML)
        
        for (let i = 0; i < commentButtons.length; i++) {
            commentButtons[i].addEventListener('click', function (e) {
                const postId = this.getAttribute("id-tag");
                addComment(postId);

            })
        }
    }, 1000)
}

function makeReactionsWork() {
    const reactionIcons = document.getElementsByClassName('reaction-button')
    
    setTimeout(() => {
        const reactionIconsArray = Array.from(reactionIcons)
        for (let i = 0; i < reactionIconsArray.length; i++) {
            reactionIconsArray[i].addEventListener('click', function (e) {
                
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