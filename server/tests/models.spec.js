const postsData = require(`../data`);
const Post = require(`../models/posts`);
var dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
const { it, expect } = require("@jest/globals");
dayjs.extend(relativeTime);

const testData = {
    "id": 4,
    "author": "wild-wild-Duck",
    "text": "this is for testing",
    "picture": "",
    "gif": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [{
            id: 1,
            author: "delayed-artistic-Guppy",
            text: "me too!",
            reactions: [{id: 1, count: 1},{id: 2, count: 2},{id: 3, count: 3}],
            date: "Tue, 14 Sep 2021 11:45:55 GMT"
        },
        {
            id: 2,
            author: "wild-wild-Rasool",
            text: "me as well! wow!",
            reactions: [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
            date: "Tue, 14 Sep 2021 12:45:55 GMT"
        }
    ],
    "date": "Tue, 14 Sep 2021 09:45:55 GMT"
}

describe('Posts model',() => {
    it('should give all posts', () => {
        const posts = Post.all
        expect(posts[2].text).toEqual('my third quack. wow i love coding')
    })

    it('should give post by id', () => {
        expect(Post.findById(3).text).toEqual('my third quack. wow i love coding')
    })

    it('should give error for invalid post id', () => {
        function expectError() {
            Post.findById(-1);
        }
        expect(expectError).toThrowError('no such post with id')
    })


    it('should create a new post',() => {
        const newPost = Post.create(testData);
        expect(newPost).toEqual(testData);
    })

    it('should append new comments',() => {
        const fakeComment = {id: 4,
            author: "delayed",
            text: "too!",
            reactions: [{id: 1, count: 1},{id: 2, count: 2},{id: 3, count: 3}],
            date: "Tue, 14 Sep 2021 11:45:55 GMT"}
        const testPost = Post.create(testData)
        testPost.addComment(fakeComment, 4)
        expect(testPost.comments[2].text).toBe("too!")
        
    })

    it('should append new reactions', () => {
        const testPost = Post.create(testData)
        const testReaction = {id: 1, count: 2}
        testPost.addReaction(testReaction, 4, testReaction.id);
        expect(testPost.reactions[0].count).toBe(3);
    })

    it('should append new reactions to comments',() => {
        const testPost = Post.create(testData)
        const testReaction = {id: 1, count: 2}
        testPost.addCommentReaction(testReaction, 4, 2, 3)
        expect(testPost.comments[1].reactions[2].count).toBe(3)

    })

})
