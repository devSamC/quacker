// let APIKEY = "91J9L3KzBaZxex6NxItZcvPTbFjKvQnn";
// // you will need to get your own API KEY
// // https://developers.giphy.com/dashboard/
// document.addEventListener("DOMContentLoaded", init);

// function init() {
//   document.getElementById("btnSearch").addEventListener("click", ev => {
//     ev.preventDefault(); //to stop the page reload
//     let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
//     let str = document.getElementById("search").value.trim();
//     url = url.concat(str);
//     console.log(url);
//     fetch(url)
//       .then(response => response.json())
//       .then(content => {
//         //  data, pagination, meta
//         console.log(content.data);
//         console.log('sausage')
//         console.log("META", content.meta);
//         console.log(content.data[0].images.downsized_small.url)
//         let fig = document.createElement("figure");
//         let img = document.createElement("img");
//         img.src = content.data[0].images.downsized.url;
//         img.alt = content.data[0].title;
//         document.querySelector("#search").value = content.data[0].images.downsized.url;
//         console.log('img.src is')
//         console.log(img.src)
//         return img.src;
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   });
// }
// const giphyURL = init()
// module.exports = giphyURL 