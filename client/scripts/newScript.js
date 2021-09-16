//requires
const animals = require("./generate-ids/animals");
const adjectives = require("./generate-ids/adjectives");
const generateCombination = require("./generate-ids/generateCombination");
var dayjs = require("./dayjs/dayjs");
var relativeTime = require("./dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
//DOM constants
const reactionChoices = ["❤", "❓", "🔝"];
const submitButton = document.getElementById("quack-btn");
const imageButton = document.getElementById("add-image");
const sortMenu = document.getElementById("sortBy");
const searchSubmitButton = document.getElementById("search-posts-submit");
const gifForm = document.getElementById("gifForm");
const gifBtn = document.getElementById("gifBtn");
const inputBox = document.getElementById("quack-input");
const logo = document.getElementById("logo");
const selectionButton = document.getElementById("sortBy");
const searchBar = document.getElementById("search-input");
//functional vars
var isTrendingAdded = false;

//event listeners
gifBtn.addEventListener("click", (e) => hideGifInput(e));
imageButton.addEventListener("click", (e) => addImage(e));
submitButton.addEventListener("click", (e) => addQuack(e));
sortMenu.addEventListener("change", (e) => changeSort(e));
searchSubmitButton.addEventListener("click", (e) => giveSearchInput(e));
inputBox.addEventListener("keydown", (e) => changeDuck(e));
logo.addEventListener("mouseover", (e) => changeLogo(e));
logo.addEventListener("mouseout", (e) => changeLogoBack(e));

//functions

//run the page
createPage();

//main page startup and card generation

function createPage() {
    init();
    generateCard();
    makeCommentsWork();
    makeCommentIconsWork();
    makeReactionsWork();
    displayCharLimit();
}


// getting ip
async function getIp() {
    try {
        const userIp = await fetch("https://api.ipify.org/?format=json");
        return userIp.json();
    } catch (error) {
        console.log(
            "you are using a content blocker - \n good choice - but now I cant get your ip,\n so I am making it up and giving you \n a default id as punishment"
        );
        return {
            ip: "69.420.420.69",
        };
    }
}
//making duck talk
function changeDuck() {
    const duckImage = document.getElementById("duck-img");
    duckImage.setAttribute("src", "./images/duckGifV3.gif");
}
//making duck angry
function makeDuckAngry() {
    const duckImage = document.getElementById("duck-img");
    duckImage.setAttribute("src", "./images/angry-redeye.png");
}
//hide gif input
function hideGifInput() {
    console.log("gif clicked");
    gifForm.classList.toggle("hidden");
    gifForm.classList.toggle("img-input-animation");
}

function giveSearchInput(e) {
    console.log("clicked search input button");
    createPage();
}
//update page when sort by is updated
function changeSort(e) {
    console.log("value changed");
    createPage();
}
//animate logo on mouseover
function changeLogo(e) {
    console.log("mouse is over");
    logo.setAttribute("src", "./images/flying-gif-shadow.gif");
}
//make logo happy/normal again
function changeLogoBack(e) {
    logo.setAttribute("src", "images/logo.png");
}

async function getAllPosts() {
    const posts = await fetch("https://quackerapi-nodejs.herokuapp.com/posts");
    const postsData = await posts.json();
    return postsData;
}

//character limit function
function displayCharLimit() {
    let length = 0;
    const charLimit = 281;

    const remainingChars = document.getElementById("remaining-chars");
    inputBox.addEventListener("keyup", function (e) {
        length = this.value.length;
        if (length > charLimit) {
            return false;
        } else if (length > 0) {
            remainingChars.textContent = `${charLimit - length} characters remaining`;
        } else {
            remainingChars.textContent = `${charLimit} characters remaining`;
        }
    });
}
//hide/show img input w/ animation
function addImage() {
    const imageInputForm = document.getElementById("img-input");
    imageInputForm.classList.toggle("hidden");
    imageInputForm.classList.toggle("img-input-animation");
}

//searching and sorting helper functions

//check if post content contains query
function mainTextContains(post) {
    const searchQuery = searchBar.value;
    const textArray = post.text.split(" ");
    return textArray.includes(searchQuery);
}
//check if comment content contains query
function commentTextContains(post) {
    const searchQuery = searchBar.value;
    if (post.comments.length === 0) {
        return false;
    }
    for (let i = 0; i < post.comments.length; i++) {
        const textArray = post.comments[i].text.split(" ");
        if (textArray.includes(searchQuery)) {
            return true;
        }
    }
}
//sort by reaction count
function sortByReactions(a, b) {
    //a counter

    let acount = 0;
    for (let i = 0; i < a.reactions.length; i++) {
        acount += a.reactions[i].count;
    }

    let bcount = 0;
    for (let i = 0; i < b.reactions.length; i++) {
        bcount += b.reactions[i].count;
    }

    return acount - bcount;
}

function isFresh(post) {
    return (
        dayjs().to(post.date, true).split(" ")[1] === "minutes" ||
        dayjs().to(post.date, true).split(" ")[2] === "seconds"
    );
}

function risingFunction(a, b) {
    // we will compute the difference in dates between each post and the current date
    // and the number of reactions of the post
    // then compute the ratio of reactions / time taken
    // then sort by highest ratio
    const currentDate = dayjs();
    const aPostDate = a.date;
    const bPostDate = b.date;
    const aDiff = currentDate.diff(aPostDate);
    const bDiff = currentDate.diff(bPostDate);
    let acount = 0;
    let bcount = 0;
    for (let i = 0; i < a.reactions.length; i++) {
        acount += a.reactions[i].count;
    }
    for (let i = 0; i < b.reactions.length; i++) {
        bcount += b.reactions[i].count;
    }
    const aRatio = acount / aDiff;
    const bRatio = bcount / bDiff;
    return aRatio - bRatio;
}

//make the whole page
async function generateCard() {
    const posts = await fetch("https://quackerapi-nodejs.herokuapp.com/posts");

    let postsData = await posts.json();

    // getting ip logic

    const userIp = await getIp();
    const ipString = userIp.ip.split(".").join("");
    //the ip is now a string of just numbers, we will use this to make an id
    const userId = generateCombination(2, "-", ipString);
    console.log(userId);

    //searching logic
    //will manipulate postsData according to search queries
    //do this before checking selectionButton to allow filtering of items once searched

    if (searchBar.value !== "") {
        //search main text

        let searched = [];
        searched = postsData.filter(mainTextContains);
        searchedInComments = postsData.filter(commentTextContains);
        searchedInComments.forEach((e) => searched.push(e));
        postsData = searched;
    }
    //search comments
    //search by post id?

    //sort array by most reactions
    if (selectionButton.value === "Hot") {
        postsData.sort((a, b) => sortByReactions(a, b));
    }

    //filter array by recent posts

    if (selectionButton.value === "Fresh") {
        postsData = postsData.filter(isFresh);
    }

    //filter array by 'rising' - most reactions in last X minutes
    if (selectionButton.value === "Rising") {
        postsData.sort((a, b) => risingFunction(a, b));
    }

    const postBox = document.getElementById("quack-test-holder");
    postBox.innerHTML = "";
    for (let i = postsData.length - 1; i >= 0; i--) {
        //iterate backwards through array to give posts in chronological order

        const newPost = document.createElement("div");
        const newPostTitle = document.createElement("h2");
        const newPostAuthor = document.createElement("h3");
        const newPostBody = document.createElement("div");
        const newPostImage = document.createElement("img");
        const newPostGif = document.createElement("img");
        const newPostText = document.createElement("p");
        const newPostReactionsEtc = document.createElement("div");
        const currentReactions = document.createElement("div");
        const reactionsHolder = document.createElement("div");

        //give div the right children

        newPost.appendChild(newPostImage);
        newPost.appendChild(newPostGif);
        newPost.appendChild(newPostBody);
        newPostBody.appendChild(newPostTitle);
        newPostBody.appendChild(newPostAuthor);
        newPostBody.appendChild(newPostText);
        newPostBody.appendChild(reactionsHolder);
        newPostBody.appendChild(newPostReactionsEtc);
        postBox.appendChild(newPost);

        //styling

        newPost.classList.add(`card`, `animated-div`);
        newPost.setAttribute(`id`, `post-card-id-${postsData[i].id}`);
        newPost.setAttribute("style", `--animation-order: ${postsData.length - i}`);
        newPostBody.classList.add("card-body");

        newPostText.classList.add("card-text", "fs-3");
        newPostImage.classList.add("card-img-top");
        newPostGif.classList.add("card-img-top");
        newPostReactionsEtc.classList.add("text-muted", "quack-reactions");
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`);
        newPostGif.setAttribute("src", `${postsData[i].gif}`);
        reactionsHolder.classList.add("reactions-div");

        //set the title id, author id, and style

        const stringCombo = generateCombination(2, "-", postsData[i].id);
        newPostTitle.textContent = `Quack id ${stringCombo}`;
        newPostTitle.classList.add("card-title", "custom-card-title", "text-muted");
        newPostAuthor.textContent = `posted by ${postsData[i].author}`;

        //add current reactions below the main text
        //we will add a button for each reaction choice
        for (let k = 0; k < reactionChoices.length; k++) {
            const reactionButton = document.createElement("button");
            const currentReactionCount = postsData[i].reactions[k].count;
            reactionButton.classList.add(
                "btn",
                "btn-outline-success",
                "reaction-button"
            );

            reactionButton.setAttribute("type", "button");
            reactionButton.setAttribute(
                "id",
                `reaction-button-${k}-${postsData[i].id}`
            );
            reactionButton.setAttribute("id-tag", `${postsData[i].id}`);
            reactionButton.setAttribute("reaction-tag", `${k + 1}`);
            reactionButton.setAttribute("reaction-count", currentReactionCount);
            reactionButton.textContent = `${currentReactionCount} ${reactionChoices[k]}`;
            reactionsHolder.append(reactionButton);
        }


        //comment and reaction icons

        //comments
        const cardCommentIcon = document.createElement("i");
        cardCommentIcon.classList.add("far", "fa-comments", "card-icons");
        newPostReactionsEtc.appendChild(cardCommentIcon);
        cardCommentIcon.setAttribute("id-tag", `${postsData[i].id}`);

        //reactions
        const cardReactionIcon = document.createElement("i");
        cardReactionIcon.classList.add("far", "fa-heart", "card-icons");
        newPostReactionsEtc.appendChild(cardReactionIcon);
        cardReactionIcon.setAttribute("id-tag", `${postsData[i].id}`);

        //timestamps
        const timeStamp = document.createElement("p");
        timeStamp.textContent = dayjs().to(postsData[i].date);
        newPostReactionsEtc.appendChild(timeStamp);
        timeStamp.classList.add("timeStamp");

        //card footer
        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer", "text-muted");
        newPost.appendChild(cardFooter);

        //comments section title
        const commentsTitle = document.createElement("h4");
        commentsTitle.textContent = "Comments";
        cardFooter.appendChild(commentsTitle);

        //add comment box
        const commentBox = document.createElement("input");
        commentBox.setAttribute("type", "text");
        commentBox.setAttribute("placeholder", "write a comment");
        commentBox.setAttribute("id", `comment-box-${postsData[i].id}`);
        commentBox.classList.add("comment-input", "hidden");
        cardFooter.appendChild(commentBox);

        //submit comment button
        const submitComment = document.createElement("input");
        submitComment.setAttribute("type", "submit");
        submitComment.setAttribute("value", "Submit comment");
        submitComment.setAttribute("id", `comment-button-${postsData[i].id}`);
        submitComment.classList.add("comment-button", "hidden");
        cardFooter.appendChild(submitComment);
        submitComment.setAttribute("id-tag", `${postsData[i].id}`);

        //iterate through comments array and add each one to footer
        if (postsData[i].comments.length !== 0) {
            for (let j = 0; j < postsData[i].comments.length; j++) {
                const commentCard = document.createElement("div");
                commentCard.classList.add("card");
                const commentCardBody = document.createElement("div");
                commentCardBody.classList.add("card-body");
                const commentText = document.createElement("p");
                commentText.classList.add("commentText");
                const commentAuthor = document.createElement("p");
                commentText.classList.add("commentAuthor");
                const commentDate = document.createElement("p");
                commentDate.classList.add("CommentTimeStamp", "commentDate");
                const commentReactionHolder = document.createElement("div");
                commentReactionHolder.classList.add("reactions-div");
                commentText.textContent = postsData[i].comments[j].text;
                commentAuthor.textContent = `comment by ${postsData[i].comments[j].author}`;
                commentDate.textContent = dayjs().to(postsData[i].comments[j].date);
                commentCard.appendChild(commentCardBody);
                commentCardBody.appendChild(commentText);
                commentCardBody.appendChild(commentAuthor);
                commentCardBody.appendChild(commentDate);
                commentCardBody.appendChild(commentReactionHolder);
                cardFooter.appendChild(commentCard);
                for (let q = 0; q < reactionChoices.length; q++) {
                    const commentReactionButton = document.createElement("button");
                    const currentCommentReactionCount =
                        postsData[i].comments[j].reactions[q].count;

                    commentReactionButton.classList.add(
                        "btn",
                        "btn-outline-success",
                        "comment-reaction-button",
                        "btn-sm"
                    );

                    commentReactionButton.setAttribute("type", "button");
                    commentReactionButton.setAttribute(
                        "id",
                        `comment-reaction-button-${q}-${postsData[i].id}}`
                    );
                    commentReactionButton.setAttribute("id-tag", `${postsData[i].id}`);
                    commentReactionButton.setAttribute(
                        "comment-id-tag",
                        `${postsData[i].comments[j].id}`
                    );
                    commentReactionButton.setAttribute("reaction-tag", `${q + 1}`);
                    commentReactionButton.setAttribute(
                        "reaction-count",
                        currentCommentReactionCount
                    );
                    commentReactionButton.textContent = `${currentCommentReactionCount} ${reactionChoices[q]}`;
                    commentReactionHolder.append(commentReactionButton);
                }
            }
        } else {
            const noCommentText = document.createElement("p");
            noCommentText.classList.add("no-comments-text");
            noCommentText.textContent = "no comments 😥 be the first?";
            cardFooter.appendChild(noCommentText);
        }
    }

    //adding 'trending tweet'
    // first check what type of sorting has been used
    // if its 'hot' we can just grab the first child of the cards holder div
    // if its anything else, we need to sort by reaction count
    if (selectionButton.value === "Hot" && !isTrendingAdded) {
        const holder = document.getElementById("quack-test-holder");
        const topCard = holder.firstChild;
        const trendingCard = topCard.cloneNode(true);
        trendingCard.setAttribute("id", "top-trending-card");
        const elementToRemove = trendingCard.childNodes[3];
        trendingCard.removeChild(elementToRemove);

        const trendingHolder = document.getElementById("trending");
        trendingHolder.appendChild(trendingCard);
        isTrendingAdded = true;
    }
    // if its not hot
    // first get sorted array, then grab the ids of the top post
    else {
        postsData.sort((a, b) => sortByReactions(a, b));
        const topPostId = postsData[0].id;
        const cardToCopy = document.getElementById(`post-card-id-${topPostId}`);
        const trendingCard = cardToCopy.cloneNode;
        trendingCard.setAttribute("id", "top-trending-card");
        const elementToRemove = trendingCard.childNodes[3];
        trendingCard.removeChild(elementToRemove);
        // const elementToRemoveAgain = trendingCard.childNodes[3];
        // trendingCard.removeChild(elementToRemoveAgain)
        const trendingHolder = document.getElementById("trending");
        trendingHolder.appendChild(trendingCard);
    }
}

function addComment(postId, commentAuthor) {
    const commentBox = document.getElementById(`comment-box-${postId}`);

    const commentText = commentBox.value;
    const currentTime = dayjs();

    if (commentText === "") {
        commentBox.setAttribute("placeholder", "write something!");

        return console.log("empty string detected");
    }
    //somehow get current id
    const id = postId;
    //send patch request to post id with new comment
    const newComment = fetch(
        `https://quackerapi-nodejs.herokuapp.com/posts/${id}/comments`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                author: `${commentAuthor}`,
                text: `${commentText}`,
                date: `${currentTime}`,
            }),
        }
    ).then((response) => createPage());
}

function addReactionCount(postId, reactionId, currentReactionCount) {
    const newReaction = fetch(
        `https://quackerapi-nodejs.herokuapp.com/posts/${postId}/reactions/${reactionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                count: currentReactionCount,
            }),
        }
    ).then((response) => createPage());
}

function addCommentReactionCount(
    postId,
    commentId,
    reactionId,
    currentReactionCount
) {
    const newReaction = fetch(
        `https://quackerapi-nodejs.herokuapp.com/posts/${postId}/comments/${commentId}/reactions/${reactionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                count: currentReactionCount,
            }),
        }
    ).then((response) => createPage());
}

// giphy api stuff
let fig = document.getElementById("figure");
let APIKEY = "91J9L3KzBaZxex6NxItZcvPTbFjKvQnn";
// you will need to get your own API KEY
// https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", previewGif);

function previewGif() {
    document.getElementById("previewGif").addEventListener("click", (ev) => {
        ev.preventDefault(); //to stop the page reload
        removePreview();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        let out = document.querySelector(".out");

        if (out !== "") {
            out = "";
        }

        fetch(url)
            .then((response) => response.json())
            .then((content) => {
                console.log("this happened");

                let img = document.createElement("img");
                let fc = document.createElement("figcaption");
                img.src = content.data[0].images.fixed_width.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img);
                fig.appendChild(fc);
                out = document.querySelector(".out");
                out.insertAdjacentElement("afterbegin", fig);

                return img.src;
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", (ev) => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);

        fetch(url)
            .then((response) => response.json())
            .then((content) => {
                let fig = document.createElement("figure");
                let img = document.createElement("img");

                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                document.querySelector("#search").value =
                    content.data[0].images.downsized.url;
            })
            .catch((err) => {
                console.error(err);
            });
    });
}

function removePreview() {
    fig.innerHTML = "";
}

async function addQuack(e) {
    e.preventDefault();
    // getting ip logic
    const userIp = await getIp();
    const ipString = userIp.ip.split(".").join("");
    //the ip is now a string of just numbers, we will use this to make an id
    const userId = generateCombination(2, "-", ipString);
    //send post data to server and then retrieve
    //first just console log the data that we get
    const duckImage = document.getElementById("duck-img");
    duckImage.setAttribute("src", "./images/happy.png");
    const quackBox = document.getElementById("quack-input");
    const postText = quackBox.value;
    if (postText === "") {
        quackBox.setAttribute("placeholder", "You need to write something!");
        makeDuckAngry();
        // const duckImage = document.getElementById('duck-img');
        // duckImage.setAttribute('src', './images/Angry-alphabg-mouthopen.png')
        return console.log("empty string detected");
    }
    const gifInputForm = document.getElementById("search");
    const gifForm = document.getElementById("gifForm");
    const imageInputForm = document.getElementById("img-input");
    //check if gif input form has anything - if so use that for image
    const newGif = gifInputForm.value;
    const newImage = imageInputForm.value;
    console.log(gifInputForm.value.slice(0, 4));
    if (gifInputForm.value !== "" && gifInputForm.value.slice(0, 4) !== "http") {
        console.log("error detected");
        gifInputForm.value = "";
        gifInputForm.setAttribute(
            "placeholder",
            "*** !!! you need to click add GIF first !!! ***"
        );
        makeDuckAngry();
        return;
    }
    imageInputForm.value = "";
    gifInputForm.value = "";
    //check if hidden class exists before toggling
    if (!imageInputForm.classList.contains("hidden")) {
        imageInputForm.classList.toggle("hidden");
    }
    if (!gifForm.classList.contains("hidden")) {
        gifForm.classList.toggle("hidden");
    }

    removePreview();
    quackBox.value = "";
    const allPosts = getAllPosts();
    const newPost = fetch("https://quackerapi-nodejs.herokuapp.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            //because we are using object destructuring in the router, we can send only the parameters we want
            //to be overwritten w.r.t default
            author: `${userId}`,
            text: `${postText}`,
            picture: `${newImage}`,
            gif: `${newGif}`,
            reactions: [{
                    id: 1,
                    count: 0,
                },
                {
                    id: 2,
                    count: 0,
                },
                {
                    id: 3,
                    count: 0,
                },
            ],
            comments: [],
        }),
    }).then((response) => {
        createPage();
    });
}



function makeCommentsWork() {
    const commentButtonsHTML = document.getElementsByClassName("comment-button");
    setTimeout(async function () {
        const commentButtons = Array.from(commentButtonsHTML);
        // getting ip logic
        const userIp = await getIp();
        const ipString = userIp.ip.split(".").join("");
        //the ip is now a string of just numbers, we will use this to make an id
        const userId = generateCombination(2, "-", ipString);
        for (let i = 0; i < commentButtons.length; i++) {
            commentButtons[i].addEventListener("click", function (e) {
                e.preventDefault()
                console.log("clicked");
                const postId = this.getAttribute("id-tag");
                addComment(postId, userId);
            });
        }
    }, 1000);
}

function makeReactionsWork() {
    const reactionIcons = document.getElementsByClassName("reaction-button");
    const commentReactionIcons = document.getElementsByClassName(
        "comment-reaction-button"
    );
    setTimeout(() => {
        const reactionIconsArray = Array.from(reactionIcons);
        const commentReactionIconsArray = Array.from(commentReactionIcons);
        for (let i = 0; i < reactionIconsArray.length; i++) {
            reactionIconsArray[i].addEventListener(
                "click",
                function (e) {
                    e.preventDefault()
                    const postId = this.getAttribute("id-tag");
                    const reactionId = this.getAttribute("reaction-tag");
                    const reactionCount = this.getAttribute("reaction-count");
                    addReactionCount(postId, reactionId, reactionCount);
                    //clientside change
                    const currentValue = this.textContent;
                    const valueArray = currentValue.split(" ");
                    this.textContent = `${parseInt(valueArray[0]) + 1} ${valueArray[1]}`;
                    this.classList.remove("btn-outline-success");
                    this.classList.add("btn");
                }, {
                    once: true,
                }
            );
        }
        for (let j = 0; j < commentReactionIconsArray.length; j++) {
            commentReactionIconsArray[j].addEventListener(
                "click",
                function (e) {
                    e.preventDefault()
                    const postId = this.getAttribute("id-tag");
                    const commentId = this.getAttribute("comment-id-tag");
                    const reactionId = this.getAttribute("reaction-tag");
                    const reactionCount = this.getAttribute("reaction-count");
                    addCommentReactionCount(postId, commentId, reactionId, reactionCount);
                    //clientside change
                    const currentValue = this.textContent;
                    const valueArray = currentValue.split(" ");
                    this.textContent = `${parseInt(valueArray[0]) + 1} ${valueArray[1]}`;
                    this.classList.remove("btn-outline-success");
                    this.classList.add("btn");
                }, {
                    once: true,
                }
            );
        }
    }, 1000);
}

function toggleHidden(id) {
    const postId = id;
    const hiddenBox = document.getElementById(`comment-box-${id}`);
    const hiddenButton = document.getElementById(`comment-button-${id}`);
    hiddenButton.classList.toggle("hidden");
    hiddenButton.classList.toggle("img-input-animation")
    hiddenBox.classList.toggle("hidden");
    hiddenBox.classList.toggle("img-input-animation");
}

function makeCommentIconsWork() {
    const cardIcons = document.getElementsByClassName("fa-comments");
    setTimeout(() => {
        const cardIconsArray = Array.from(cardIcons);
        for (let i = 0; i < cardIconsArray.length; i++) {
            cardIconsArray[i].addEventListener("click", function (e) {
                const postId = this.getAttribute("id-tag");
                toggleHidden(postId);
            });
        }
    }, 1000);
}

module.exports = {createPage: createPage, getIp: getIp, changeDuck: changeDuck, makeDuckAngry: makeDuckAngry, hideGifInput: hideGifInput, giveSearchInput: giveSearchInput, changeSort: changeSort, changeLogo: changeLogo, changeLogoBack: changeLogoBack, displayCharLimit: displayCharLimit, addImage: addImage, mainTextContains: mainTextContains, commentTextContains: commentTextContains, sortByReactions: sortByReactions, isFresh: isFresh, risingFunction: risingFunction, generateCard: generateCard, addComment: addComment, addReactionCount: addReactionCount, addCommentReactionCount: addCommentReactionCount, previewGif: previewGif, init: init, removePreview: removePreview, addQuack: addQuack, makeCommentsWork: makeCommentsWork, makeReactionsWork: makeReactionsWork, toggleHidden: toggleHidden, makeCommentIconsWork: makeCommentIconsWork};