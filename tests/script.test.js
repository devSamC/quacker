const funcs = require('../script');
const axios = require('axios');

jest.mock('axios');

//get request that returns all users from heroku

// function getUsers() {
//   axios.get('https://quackerapi-nodejs.herokuapp.com/players').then((response) => console.log(response.data))

// }

describe("getUsers", () => {

  test('it should return all users', () => {
    const users = [{
        "id": 1,
        "name": "Lebron",
        "picture": "none",
        "posts": 27,
        "postData": {}
    }
    ]
    const response = {data: users};

    axios.get.mockResolvedValueOnce(response);    
  })
  
})