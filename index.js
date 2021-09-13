const express = require('express');
const app = express();
const importData = require('./data.js');
const User = require(`./models/users`)
const Post = require('./models/posts');
const cors = require('cors')
const bodyParser = require('body-parser')

let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.get('/',(req,res) => {
    res.sendFile(`./index.html`)
})

app.get('/players',(req,res) => {
    res.send(importData)
})

app.post('/players', (req,res) => {
    // console.log(req)
    const data = req.body
    const newPost = new Post(data)
    res.send({
        message: `${newPost.text} added to collection`
    })
})

app.listen(port, () => {
    console.log(`twitter clone listening on port ${port}`)
})

// module.exports = index