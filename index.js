const express = require('express');
const app = express();
const importData = require('./data.json');
const cors = require('cors')

let port = process.env.PORT || 3000;
app.get('/',(req,res) => {
    res.send(`hello world`)
})

app.get('/players',(req,res) => {
    res.send(importData)
})

app.post('/players', (req,res) => {
    const data = req.body;
    const newUser = User.create(data);
    res.send({
        message: `${newUser.name} added to collection`
    })
})

app.listen(port, () => {
    console.log(`twitter clone listening on port ${port}`)
})