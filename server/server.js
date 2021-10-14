const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const postsRoutes = require('./controllers/posts')

let port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use('/', postsRoutes);

app.listen(port, () => {
    console.log(`twitter clone listening on port ${port}`)
})

module.exports = app;