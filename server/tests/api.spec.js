const request = require('supertest');
const server = require('../server.js')
const postsData = require('../data');
const { it } = require('@jest/globals');
const testComment = {id: 4,
    author: "delayed",
    text: "too!",
    reactions: [{id: 1, count: 1},{id: 2, count: 2},{id: 3, count: 3}],
    date: "Tue, 14 Sep 2021 11:45:55 GMT"}
const testData = {
    "id": 4,
    "author": "wild-wild-Duck",
    "text": "this is for testing",
    "picture": "",
    "gif": "",
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
    "comments": [{
            id: 1,
            author: "delayed-artistic-Guppy",
            text: "me too!",
            reactions: [{
                id: 1,
                count: 1
            }, {
                id: 2,
                count: 2
            }, {
                id: 3,
                count: 3
            }],
            date: "Tue, 14 Sep 2021 11:45:55 GMT"
        },
        {
            id: 2,
            author: "wild-wild-Rasool",
            text: "me as well! wow!",
            reactions: [{
                id: 1,
                count: 0
            }, {
                id: 2,
                count: 0
            }, {
                id: 3,
                count: 0
            }],
            date: "Tue, 14 Sep 2021 12:45:55 GMT"
        }
    ],
    "date": "Tue, 14 Sep 2021 09:45:55 GMT"
}
const testReaction = {id: 1, count: 2}
describe("API server", () => {
    let api;
    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () =>
            console.log("Test server running on port 5000")
        );
        
    })
    afterAll((done) => {
        // close the server, then run done
        console.log("Gracefully stopping test server");
        api.close(done);
    })

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done)
    })
    it('responds to get /posts with status 200', (done) => {
        request(api).get('/posts').expect(200, done)
    })
    it('responds to get /posts with posts data', (done) => {
        request(api).get('/posts').expect(postsData, done)
    })
    it('responds to get /posts/:id/comments with correct data', (done) => {
        request(api).get('/posts/1/comments').expect([], done)
    })

    it('responds to get /posts/:id/reactions/:reactionid with correct data', (done) => {
        request(api).get('/posts/1/reactions/1').expect({
            id: 1,
            count: 0
        }, done)
    })

    it('responds to get /posts/:id/comments/:commentid/reactions/:reactionid with correct data', (done) => {
        request(api).get('/posts/3/comments/1/reactions/1').expect({
            id: 1,
            count: 1
        }, done)
    })

    it('responds to post /posts with 200 and new post message', (done) => {
        request(api).post('/posts').send(testData).expect(200).expect({message: 'this is for testing added'},done)
    })
    it('responds to patch /posts/:id/comments with status 200 and comment added message',(done) => {
        request(api).patch('/posts/1/comments').send(testComment).expect(200).expect({message: `comment added`},done)
    })
    it('responds to patch /posts/:id/reactions/:reactionid with status 200 and reaction added message',(done) => {
        request(api).patch('/posts/1/reactions/1').send(testReaction).expect(200).expect({message: `reaction added to post`},done)
    })

    it('responds to patch /posts/:id/comments/:commentid/reactions/:reactionid with status 503 and no message',(done) => {
        request(api).patch('/posts/3/comments/1/reactions/1').send(testReaction).expect(200).expect({},done)
    })



})