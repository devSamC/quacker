// const usersData = require('../data.js')

// class User {
//     constructor(data) {
//         this.id = data.id;
//         this.name = data.name
//         this.picture = data.picture;
//         this.posts = data.posts;
//     }

//     static get all() {
//         const users = usersData.map((user) => new User(user));
//         return users;
//     }

//     static create(user) {
//         const newUser = new User({...user})
//         usersData.push(newUser);
//         return newUser;
//     }
// }

// module.exports = User;