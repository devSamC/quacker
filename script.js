console.log('hello this is script')
const players = fetch('https://quackerapi-nodejs.herokuapp.com/players', {method: 'GET'}).then(response => response.json()).then (console.log(response.json()))
