const postsData = [{
    "id": 1,
    "text": "my first quack. wow i love coding",
    "picture": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [],
    "date": "Sun, 12 Sep 2021 09:45:55 GMT"
}, {
    "id": 2,
    "text": "my second quack. wow i love coding",
    "picture": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [],
    "date": "Mon, 13 Sep 2021 09:45:55 GMT"
}, {
    "id": 3,
    "text": "my third quack. wow i love coding",
    "picture": "",
    "reactions": [{id: 1, count: 0},{id: 2, count: 0},{id: 3, count: 0}],
    "comments": [{
            id: 1,
            text: "me too!",
            reactions: ""
        },
        {
            id: 2,
            text: "me as well! wow!",
            reactions: ""
        }
    ],
    "date": "Tue, 14 Sep 2021 09:45:55 GMT"
}]

module.exports = postsData;