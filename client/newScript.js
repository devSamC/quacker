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

//character limit function
function displayCharLimit() {
    let length = 0;
    const charLimit = 281;
    const inputBox = document.getElementById('quack-input');
    const remainingChars = document.getElementById('remaining-chars')
    inputBox.addEventListener('keyup', function (e) {
        length = this.value.length;
        if (length > charLimit) {
            return false
        } else if (length > 0) {
            remainingChars.textContent = `${charLimit-length} characters remaining`
        } else {
            remainingChars.textContent = `${charLimit} characters remaining`
        }
    })
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

function makeGifBtnWork() {
    setTimeout(() => {
        const gifForm = document.getElementById('gifForm')
        const gifBtn = document.getElementById('gifBtn')
        gifBtn.addEventListener('click', e => hideGifInput(e))
    }, 1000)




}

function hideGifInput() {

    gifForm.classList.toggle('hidden')
}


async function generateCard() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/posts')

    const postsData = await posts.json()
    const selectionButton = document.getElementById('sortBy');
    console.log(selectionButton.value)
    console.log(postsData)
    if (selectionButton.value === 'Hot') {
        postsData.sort(function compareFunction(a, b) {
            //a counter
            console.log(a)
            let acount = 0
            for (let i = 0; i < a.reactions.length; i++) {
                acount += a.reactions[i].count
                console.log(`added ${a.reactions[i].count} to acount`)
            }
            console.log(acount)
            let bcount = 0
            for (let i = 0; i < b.reactions.length; i++) {
                bcount += b.reactions[i].count
            }
            console.log(bcount)
            console.log(bcount - acount)
            return acount - bcount;
        })
    }
    console.log(postsData)
    const postBox = document.getElementById('quack-test-holder');
    postBox.innerHTML = ""
    for (let i = postsData.length - 1; i >= 0; i--) {
        //iterate backwards through array to give posts in chronological order
        const newPost = document.createElement('div');
        const newPostTitle = document.createElement('h2');
        const newPostBody = document.createElement('div');
        const newPostImage = document.createElement('img');
        const newPostGif = document.createElement('img')
        const newPostText = document.createElement('p')
        const newPostReactionsEtc = document.createElement('div')
        const currentReactions = document.createElement('div')
        const reactionsHolder = document.createElement('div')

        //give div the right children
        newPost.appendChild(newPostImage)
        newPost.appendChild(newPostGif)
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
        newPostGif.classList.add('card-img-top')
        newPostReactionsEtc.classList.add('text-muted', 'quack-reactions')
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`)
        newPostGif.setAttribute("src", `${postsData[i].gif}`)
        //set the title
        const stringCombo = generateCombination(2, "-")
        newPostTitle.textContent = `Quack id ${stringCombo}`
        newPostTitle.classList.add('card-title', 'custom-card-title')
        //add current reactions below the main text
        //we will add a button for each reaction choice, hopefully styled as a pill or something
        for (let k = 0; k < reactionChoices.length; k++) {
            const reactionButton = document.createElement('button')
            const currentReactionCount = postsData[i].reactions[k].count
            reactionButton.classList.add('btn', 'btn-outline-dark', 'reaction-button')

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
    const gifForm = document.getElementById('gifForm')
    const imageInputForm = document.getElementById('img-input')
    //check if gif input form has anything - if so use that for image
    const newGif = gifInputForm.value;
    const newImage = imageInputForm.value;

    imageInputForm.value = ""
    gifInputForm.value = ""
    //check if hidden class exists before toggling
    if (!imageInputForm.classList.contains('hidden')) {
        imageInputForm.classList.toggle('hidden');

    }
    if (!gifForm.classList.contains('hidden')) {
        gifForm.classList.toggle('hidden')
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
    makeGifBtnWork()
    displayCharLimit()

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
                //clientside change
                const currentValue = this.textContent
                const valueArray = currentValue.split(' ')
                this.textContent = `${parseInt(valueArray[0])+1} ${valueArray[1]}`
                this.classList.remove('btn-outline-dark')
                this.classList.add('btn-dark')
                console.log(currentValue)

            }, {
                once: true
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

//animal id stuff - will move into different js files at some point
const animals = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Anteater',
    'Antelope',
    'Ape',
    'Armadillo',
    'Donkey',
    'Baboon',
    'Badger',
    'Barracuda',
    'Bat',
    'Bear',
    'Beaver',
    'Bee',
    'Bison',
    'Boar',
    'Buffalo',
    'Butterfly',
    'Camel',
    'Capybara',
    'Caribou',
    'Cassowary',
    'Cat',
    'Caterpillar',
    'Cattle',
    'Chamois',
    'Cheetah',
    'Chicken',
    'Chimpanzee',
    'Chinchilla',
    'Chough',
    'Clam',
    'Cobra',
    'Cockroach',
    'Cod',
    'Cormorant',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
    'Curlew',
    'Deer',
    'Dinosaur',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Dotterel',
    'Dove',
    'Dragonfly',
    'Duck',
    'Dugong',
    'Dunlin',
    'Eagle',
    'Echidna',
    'Eel',
    'Eland',
    'Elephant',
    'Elk',
    'Emu',
    'Falcon',
    'Ferret',
    'Finch',
    'Fish',
    'Flamingo',
    'Fly',
    'Fox',
    'Frog',
    'Gaur',
    'Gazelle',
    'Gerbil',
    'Giraffe',
    'Gnat',
    'Gnu',
    'Goat',
    'Goldfinch',
    'Goldfish',
    'Goose',
    'Gorilla',
    'Goshawk',
    'Grasshopper',
    'Grouse',
    'Guanaco',
    'Gull',
    'Hamster',
    'Hare',
    'Hawk',
    'Hedgehog',
    'Heron',
    'Herring',
    'Hippopotamus',
    'Hornet',
    'Horse',
    'Human',
    'Hummingbird',
    'Hyena',
    'Ibex',
    'Ibis',
    'Jackal',
    'Jaguar',
    'Jay',
    'Jellyfish',
    'Kangaroo',
    'Kingfisher',
    'Koala',
    'Kookabura',
    'Kouprey',
    'Kudu',
    'Lapwing',
    'Lark',
    'Lemur',
    'Leopard',
    'Lion',
    'Llama',
    'Lobster',
    'Locust',
    'Loris',
    'Louse',
    'Lyrebird',
    'Magpie',
    'Mallard',
    'Manatee',
    'Mandrill',
    'Mantis',
    'Marten',
    'Meerkat',
    'Mink',
    'Mole',
    'Mongoose',
    'Monkey',
    'Moose',
    'Mosquito',
    'Mouse',
    'Mule',
    'Narwhal',
    'Newt',
    'Nightingale',
    'Octopus',
    'Okapi',
    'Opossum',
    'Oryx',
    'Ostrich',
    'Otter',
    'Owl',
    'Oyster',
    'Panther',
    'Parrot',
    'Partridge',
    'Peafowl',
    'Pelican',
    'Penguin',
    'Pheasant',
    'Pig',
    'Pigeon',
    'Pony',
    'Porcupine',
    'Porpoise',
    'Quail',
    'Quelea',
    'Quetzal',
    'Rabbit',
    'Raccoon',
    'Rail',
    'Ram',
    'Rat',
    'Raven',
    'Reindeer',
    'Rhinoceros',
    'Rook',
    'Salamander',
    'Salmon',
    'Sandpiper',
    'Sardine',
    'Scorpion',
    'Seahorse',
    'Seal',
    'Shark',
    'Sheep',
    'Shrew',
    'Skunk',
    'Snail',
    'Snake',
    'Sparrow',
    'Spider',
    'Spoonbill',
    'Squid',
    'Squirrel',
    'Starling',
    'Stingray',
    'Stinkbug',
    'Stork',
    'Swallow',
    'Swan',
    'Tapir',
    'Tarsier',
    'Termite',
    'Tiger',
    'Toad',
    'Trout',
    'Turkey',
    'Turtle',
    'Viper',
    'Vulture',
    'Wallaby',
    'Walrus',
    'Wasp',
    'Weasel',
    'Whale',
    'Wildcat',
    'Wolf',
    'Wolverine',
    'Wombat',
    'Woodcock',
    'Woodpecker',
    'Worm',
    'Wren',
    'Yak',
    'Zebra'
];

const adjectives = ['aback',
'abaft',
'abandoned',
'abashed',
'aberrant',
'abhorrent',
'abiding',
'abject',
'ablaze',
'able',
'abnormal',
'aboard',
'aboriginal',
'abortive',
'abounding',
'abrasive',
'abrupt',
'absent',
'absorbed',
'absorbing',
'abstracted',
'absurd',
'abundant',
'abusive',
'acceptable',
'accessible',
'accidental',
'accurate',
'acid',
'acidic',
'acoustic',
'acrid',
'actually',
'ad',
'hoc',
'adamant',
'adaptable',
'addicted',
'adhesive',
'adjoining',
'adorable',
'adventurous',
'afraid',
'aggressive',
'agonizing',
'agreeable',
'ahead',
'ajar',
'alcoholic',
'alert',
'alike',
'alive',
'alleged',
'alluring',
'aloof',
'amazing',
'ambiguous',
'ambitious',
'amuck',
'amused',
'amusing',
'ancient',
'angry',
'animated',
'annoyed',
'annoying',
'anxious',
'apathetic',
'aquatic',
'aromatic',
'arrogant',
'ashamed',
'aspiring',
'assorted',
'astonishing',
'attractive',
'auspicious',
'automatic',
'available',
'average',
'awake',
'aware',
'awesome',
'awful',
'axiomatic',
'bad',
'barbarous',
'bashful',
'bawdy',
'beautiful',
'befitting',
'belligerent',
'beneficial',
'bent',
'berserk',
'best',
'better',
'bewildered',
'big',
'billowy',
'bite-sized',
'bitter',
'bizarre',
'black',
'black-and-white',
'bloody',
'blue',
'blue-eyed',
'blushing',
'boiling',
'boorish',
'bored',
'boring',
'bouncy',
'boundless',
'brainy',
'brash',
'brave',
'brawny',
'breakable',
'breezy',
'brief',
'bright',
'bright',
'broad',
'broken',
'brown',
'bumpy',
'burly',
'bustling',
'busy',
'cagey',
'calculating',
'callous',
'calm',
'capable',
'capricious',
'careful',
'careless',
'caring',
'cautious',
'ceaseless',
'certain',
'changeable',
'charming',
'cheap',
'cheerful',
'chemical',
'chief',
'childlike',
'chilly',
'chivalrous',
'chubby',
'chunky',
'clammy',
'classy',
'clean',
'clear',
'clever',
'cloistered',
'cloudy',
'closed',
'clumsy',
'cluttered',
'coherent',
'cold',
'colorful',
'colossal',
'combative',
'comfortable',
'common',
'complete',
'complex',
'concerned',
'condemned',
'confused',
'conscious',
'cooing',
'cool',
'cooperative',
'coordinated',
'courageous',
'cowardly',
'crabby',
'craven',
'crazy',
'creepy',
'crooked',
'crowded',
'cruel',
'cuddly',
'cultured',
'cumbersome',
'curious',
'curly',
'curved',
'curvy',
'cut',
'cute',
'cute',
'cynical',
'daffy',
'daily',
'damaged',
'damaging',
'damp',
'dangerous',
'dapper',
'dark',
'dashing',
'dazzling',
'dead',
'deadpan',
'deafening',
'dear',
'debonair',
'decisive',
'decorous',
'deep',
'deeply',
'defeated',
'defective',
'defiant',
'delicate',
'delicious',
'delightful',
'demonic',
'delirious',
'dependent',
'depressed',
'deranged',
'descriptive',
'deserted',
'detailed',
'determined',
'devilish',
'didactic',
'different',
'difficult',
'diligent',
'direful',
'dirty',
'disagreeable',
'disastrous',
'discreet',
'disgusted',
'disgusting',
'disillusioned',
'dispensable',
'distinct',
'disturbed',
'divergent',
'dizzy',
'domineering',
'doubtful',
'drab',
'draconian',
'dramatic',
'dreary',
'drunk',
'dry',
'dull',
'dusty',
'dynamic',
'dysfunctional',
'eager',
'early',
'earsplitting',
'earthy',
'easy',
'eatable',
'economic',
'educated',
'efficacious',
'efficient',
'eight',
'elastic',
'elated',
'elderly',
'electric',
'elegant',
'elfin',
'elite',
'embarrassed',
'eminent',
'empty',
'enchanted',
'enchanting',
'encouraging',
'endurable',
'energetic',
'enormous',
'entertaining',
'enthusiastic',
'envious',
'equable',
'equal',
'erect',
'erratic',
'ethereal',
'evanescent',
'evasive',
'even',
'excellent',
'excited',
'exciting',
'exclusive',
'exotic',
'expensive',
'extra-large',
'extra-small',
'exuberant',
'exultant',
'fabulous',
'faded',
'faint',
'fair',
'faithful',
'fallacious',
'false',
'familiar',
'famous',
'fanatical',
'fancy',
'fantastic',
'far',
'far-flung',
'fascinated',
'fast',
'fat',
'faulty',
'fearful',
'fearless',
'feeble',
'feigned',
'female',
'fertile',
'festive',
'few',
'fierce',
'filthy',
'fine',
'finicky',
'first',
'five',
'fixed',
'flagrant',
'flaky',
'flashy',
'flat',
'flawless',
'flimsy',
'flippant',
'flowery',
'fluffy',
'fluttering',
'foamy',
'foolish',
'foregoing',
'forgetful',
'fortunate',
'four',
'frail',
'fragile',
'frantic',
'free',
'freezing',
'frequent',
'fresh',
'fretful',
'friendly',
'frightened',
'frightening',
'full',
'fumbling',
'functional',
'funny',
'furry',
'furtive',
'future',
'futuristic',
'fuzzy',
'gabby',
'gainful',
'gamy',
'gaping',
'garrulous',
'gaudy',
'general',
'gentle',
'giant',
'giddy',
'gifted',
'gigantic',
'glamorous',
'gleaming',
'glib',
'glistening',
'glorious',
'glossy',
'godly',
'good',
'goofy',
'gorgeous',
'graceful',
'grandiose',
'grateful',
'gratis',
'gray',
'greasy',
'great',
'greedy',
'green',
'grey',
'grieving',
'groovy',
'grotesque',
'grouchy',
'grubby',
'gruesome',
'grumpy',
'guarded',
'guiltless',
'gullible',
'gusty',
'guttural',
'habitual',
'half',
'hallowed',
'halting',
'handsome',
'handsomely',
'handy',
'hanging',
'hapless',
'happy',
'hard',
'hard-to-find',
'harmonious',
'harsh',
'hateful',
'heady',
'healthy',
'heartbreaking',
'heavenly',
'heavy',
'hellish',
'helpful',
'helpless',
'hesitant',
'hideous',
'high',
'highfalutin',
'high-pitched',
'hilarious',
'hissing',
'historical',
'holistic',
'hollow',
'homeless',
'homely',
'honorable',
'horrible',
'hospitable',
'hot',
'huge',
'hulking',
'humdrum',
'humorous',
'hungry',
'hurried',
'hurt',
'hushed',
'husky',
'hypnotic',
'hysterical',
'icky',
'icy',
'idiotic',
'ignorant',
'ill',
'illegal',
'ill-fated',
'ill-informed',
'illustrious',
'imaginary',
'immense',
'imminent',
'impartial',
'imperfect',
'impolite',
'important',
'imported',
'impossible',
'incandescent',
'incompetent',
'inconclusive',
'industrious',
'incredible',
'inexpensive',
'infamous',
'innate',
'innocent',
'inquisitive',
'insidious',
'instinctive',
'intelligent',
'interesting',
'internal',
'invincible',
'irate',
'irritating',
'itchy',
'jaded',
'jagged',
'jazzy',
'jealous',
'jittery',
'jobless',
'jolly',
'joyous',
'judicious',
'juicy',
'jumbled',
'jumpy',
'juvenile',
'kaput',
'keen',
'kind',
'kindhearted',
'kindly',
'knotty',
'knowing',
'knowledgeable',
'known',
'labored',
'lackadaisical',
'lacking',
'lame',
'lamentable',
'languid',
'large',
'last',
'late',
'laughable',
'lavish',
'lazy',
'lean',
'learned',
'left',
'legal',
'lethal',
'level',
'lewd',
'light',
'like',
'likeable',
'limping',
'literate',
'little',
'lively',
'lively',
'living',
'lonely',
'long',
'longing',
'long-term',
'loose',
'lopsided',
'loud',
'loutish',
'lovely',
'loving',
'low',
'lowly',
'lucky',
'ludicrous',
'lumpy',
'lush',
'luxuriant',
'lying',
'lyrical',
'macabre',
'macho',
'maddening',
'madly',
'magenta',
'magical',
'magnificent',
'majestic',
'makeshift',
'male',
'malicious',
'mammoth',
'maniacal',
'many',
'marked',
'massive',
'married',
'marvelous',
'material',
'materialistic',
'mature',
'mean',
'measly',
'meaty',
'medical',
'meek',
'mellow',
'melodic',
'melted',
'merciful',
'mere',
'messy',
'mighty',
'military',
'milky',
'mindless',
'miniature',
'minor',
'miscreant',
'misty',
'mixed',
'moaning',
'modern',
'moldy',
'momentous',
'motionless',
'mountainous',
'muddled',
'mundane',
'murky',
'mushy',
'mute',
'mysterious',
'naive',
'nappy',
'narrow',
'nasty',
'natural',
'naughty',
'nauseating',
'near',
'neat',
'nebulous',
'necessary',
'needless',
'needy',
'neighborly',
'nervous',
'new',
'next',
'nice',
'nifty',
'nimble',
'nine',
'nippy',
'noiseless',
'noisy',
'nonchalant',
'nondescript',
'nonstop',
'normal',
'nostalgic',
'nosy',
'noxious',
'null',
'numberless',
'numerous',
'nutritious',
'nutty',
'oafish',
'obedient',
'obeisant',
'obese',
'obnoxious',
'obscene',
'obsequious',
'observant',
'obsolete',
'obtainable',
'oceanic',
'odd',
'offbeat',
'old',
'old-fashioned',
'omniscient',
'one',
'onerous',
'open',
'opposite',
'optimal',
'orange',
'ordinary',
'organic',
'ossified',
'outgoing',
'outrageous',
'outstanding',
'oval',
'overconfident',
'overjoyed',
'overrated',
'overt',
'overwrought',
'painful',
'painstaking',
'pale',
'paltry',
'panicky',
'panoramic',
'parallel',
'parched',
'parsimonious',
'past',
'pastoral',
'pathetic',
'peaceful',
'penitent',
'perfect',
'periodic',
'permissible',
'perpetual',
'petite',
'petite',
'phobic',
'physical',
'picayune',
'pink',
'piquant',
'placid',
'plain',
'plant',
'plastic',
'plausible',
'pleasant',
'plucky',
'pointless',
'poised',
'polite',
'political',
'poor',
'possessive',
'possible',
'powerful',
'precious',
'premium',
'present',
'pretty',
'previous',
'pricey',
'prickly',
'private',
'probable',
'productive',
'profuse',
'protective',
'proud',
'psychedelic',
'psychotic',
'public',
'puffy',
'pumped',
'puny',
'purple',
'purring',
'pushy',
'puzzled',
'puzzling',
'quack',
'quaint',
'quarrelsome',
'questionable',
'quick',
'quickest',
'quiet',
'quirky',
'quixotic',
'quizzical',
'rabid',
'racial',
'ragged',
'rainy',
'rambunctious',
'rampant',
'rapid',
'rare',
'raspy',
'ratty',
'ready',
'real',
'rebel',
'receptive',
'recondite',
'red',
'redundant',
'reflective',
'regular',
'relieved',
'remarkable',
'reminiscent',
'repulsive',
'resolute',
'resonant',
'responsible',
'rhetorical',
'rich',
'right',
'righteous',
'rightful',
'rigid',
'ripe',
'ritzy',
'roasted',
'robust',
'romantic',
'roomy',
'rotten',
'rough',
'round',
'royal',
'ruddy',
'rude',
'rural',
'rustic',
'ruthless',
'sable',
'sad',
'safe',
'salty',
'same',
'sassy',
'satisfying',
'savory',
'scandalous',
'scarce',
'scared',
'scary',
'scattered',
'scientific',
'scintillating',
'scrawny',
'screeching',
'second',
'second-hand',
'secret',
'secretive',
'sedate',
'seemly',
'selective',
'selfish',
'separate',
'serious',
'shaggy',
'shaky',
'shallow',
'sharp',
'shiny',
'shivering',
'shocking',
'short',
'shrill',
'shut',
'shy',
'sick',
'silent',
'silent',
'silky',
'silly',
'simple',
'simplistic',
'sincere',
'six',
'skillful',
'skinny',
'sleepy',
'slim',
'slimy',
'slippery',
'sloppy',
'slow',
'small',
'smart',
'smelly',
'smiling',
'smoggy',
'smooth',
'sneaky',
'snobbish',
'snotty',
'soft',
'soggy',
'solid',
'somber',
'sophisticated',
'sordid',
'sore',
'sore',
'sour',
'sparkling',
'special',
'spectacular',
'spicy',
'spiffy',
'spiky',
'spiritual',
'spiteful',
'splendid',
'spooky',
'spotless',
'spotted',
'spotty',
'spurious',
'squalid',
'square',
'squealing',
'squeamish',
'staking',
'stale',
'standing',
'statuesque',
'steadfast',
'steady',
'steep',
'stereotyped',
'sticky',
'stiff',
'stimulating',
'stingy',
'stormy',
'straight',
'strange',
'striped',
'strong',
'stupendous',
'stupid',
'sturdy',
'subdued',
'subsequent',
'substantial',
'successful',
'succinct',
'sudden',
'sulky',
'super',
'superb',
'superficial',
'supreme',
'swanky',
'sweet',
'sweltering',
'swift',
'symptomatic',
'synonymous',
'taboo',
'tacit',
'tacky',
'talented',
'tall',
'tame',
'tan',
'tangible',
'tangy',
'tart',
'tasteful',
'tasteless',
'tasty',
'tawdry',
'tearful',
'tedious',
'teeny',
'teeny-tiny',
'telling',
'temporary',
'ten',
'tender',
'tense',
'tense',
'tenuous',
'terrible',
'terrific',
'tested',
'testy',
'thankful',
'therapeutic',
'thick',
'thin',
'thinkable',
'third',
'thirsty',
'thoughtful',
'thoughtless',
'threatening',
'three',
'thundering',
'tidy',
'tight',
'tightfisted',
'tiny',
'tired',
'tiresome',
'toothsome',
'torpid',
'tough',
'towering',
'tranquil',
'trashy',
'tremendous',
'tricky',
'trite',
'troubled',
'truculent',
'true',
'truthful',
'two',
'typical',
'ubiquitous',
'ugliest',
'ugly',
'ultra',
'unable',
'unaccountable',
'unadvised',
'unarmed',
'unbecoming',
'unbiased',
'uncovered',
'understood',
'undesirable',
'unequal',
'unequaled',
'uneven',
'unhealthy',
'uninterested',
'unique',
'unkempt',
'unknown',
'unnatural',
'unruly',
'unsightly',
'unsuitable',
'untidy',
'unused',
'unusual',
'unwieldy',
'unwritten',
'upbeat',
'uppity',
'upset',
'uptight',
'used',
'useful',
'useless',
'utopian',
'utter',
'uttermost',
'vacuous',
'vagabond',
'vague',
'valuable',
'various',
'vast',
'vengeful',
'venomous',
'verdant',
'versed',
'victorious',
'vigorous',
'violent',
'violet',
'vivacious',
'voiceless',
'volatile',
'voracious',
'vulgar',
'wacky',
'waggish',
'waiting',
'wakeful',
'wandering',
'wanting',
'warlike',
'warm',
'wary',
'wasteful',
'watery',
'weak',
'wealthy',
'weary',
'well-groomed',
'well-made',
'well-off',
'well-to-do',
'wet',
'whimsical',
'whispering',
'white',
'whole',
'wholesale',
'wicked',
'wide',
'wide-eyed',
'wiggly',
'wild',
'willing',
'windy',
'wiry',
'wise',
'wistful',
'witty',
'woebegone',
'womanly',
'wonderful',
'wooden',
'woozy',
'workable',
'worried',
'worthless',
'wrathful',
'wretched',
'wrong',
'wry',
'xenophobic',
'yellow',
'yielding',
'young',
'youthful',
'yummy',
'zany',
'zealous',
'zesty',
'zippy',
'zonked'
];

function generateCombination(numAdjectives, delimiter, capitalizeFirstLetter) {
    let combination = '';
    const animal = animals[Math.floor(Math.random() * animals.length)];

    for (let i = 0; i < numAdjectives; i++) {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

        combination += capitalizeFirstLetter ? adjective.charAt(0).toUpperCase() + adjective.slice(1) + delimiter : adjective + delimiter;
    }

    combination += capitalizeFirstLetter ? animal.charAt(0).toUpperCase() + animal.slice(1) : animal;
    return combination;
}






// for (let i = 0; i < commentButtonsArray.length; i++)
// console.log(commentButtonsArray)