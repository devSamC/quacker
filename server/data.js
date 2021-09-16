const postsData = [{
    "id": 1,
    "author": "delayed-artistic-Guppy",
    "text": "my first quack. wow i love coding",
    "picture": "",
    "gif": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [],
    "date": "Sun, 12 Sep 2021 09:45:55 GMT"
}, {
    "id": 2,
    "author": "proof-of-Concept",
    "text": "my second quack. wow i love coding",
    "picture": "",
    "gif": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [],
    "date": "Mon, 13 Sep 2021 09:45:55 GMT"
}, {
    "id": 3,
    "author": "wild-wild-Duck",
    "text": "my third quack. wow i love coding",
    "picture": "",
    "gif": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [{
            id: 1,
            author: delayed-artistic-Guppy,
            text: "me too!",
            reactions: [{id: 1, count: 1},{id: 2, count: 2},{id: 3, count: 3}],
            date: "Tue, 14 Sep 2021 11:45:55 GMT"
        },
        {
            id: 2,
            author: wild-wild-Rasool,
            text: "me as well! wow!",
            reactions: [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
            date: "Tue, 14 Sep 2021 12:45:55 GMT"
        }
    ],
    "date": "Tue, 14 Sep 2021 09:45:55 GMT"
}]

module.exports = postsData;