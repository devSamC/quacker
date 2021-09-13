const express = require('express');
const app = express();
const importData = require('./data.js');
const User = require(`./models/users`)
// const cors = require('cors')
const bodyParser = require('body-parser')

let port = process.env.PORT || 3000;

// app.use(cors());
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
    console.log(User.all)
    console.log(req.body)
    const data = (req.body);
    console.log(data)
    const fakeData = {
        "id": 3,
        "name": "James",
        "picture": "none",
        "posts": 30
    }
    const newUser = User.create(data);
    console.log(User.all)
    res.send({
        message: `${newUser.name} added to collection`
    })
})

app.listen(port, () => {
    console.log(`twitter clone listening on port ${port}`)
})

// module.exports = index