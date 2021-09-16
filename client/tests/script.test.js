/*
  @jest-environment jsdom
*/


const newScript = require('../scripts/newScript');
const animals = require('../scripts/generate-ids/animals');
const generateCombination = require('../scripts/generate-ids/generateCombination');
const adjectives = require('../scripts/generate-ids/adjectives');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
window.document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest.mock('axios');

describe('index.html', () => {

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  })

  describe("animals", () => {
    let animals = animals.animals;
    test("it exists", () => {
      expect(animals).toBeTruthy();
    })
  })


  // describe("getUsers", () => {

  //   test('it should return all users', () => {
  //     const users = [{
  //         "id": 1,
  //         "name": "Lebron",
  //         "picture": "none",
  //         "posts": 27,
  //         "postData": {}
  //     }
  //     ]
  //     const response = {data: users};
  
  //     axios.get.mockResolvedValueOnce(response);    
  //   })
    
  // })
})


//get request that returns all users from heroku

// function getUsers() {
//   axios.get('https://quackerapi-nodejs.herokuapp.com/posts').then((response) => console.log(response.data))

// }

