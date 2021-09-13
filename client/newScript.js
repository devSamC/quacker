const submitButton = document.getElementById('quack-btn');
submitButton.addEventListener('click', e => addQuack(e))
// const axios = require('axios')

function addQuack(e) {
    e.preventDefault();
    //send post data to server and then retrieve
    //first just console log the data that we get
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    console.log(postText)
}

function generateCard() {

}