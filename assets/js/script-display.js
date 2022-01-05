var API_KEY = "AIzaSyA99Z54YAvxe1t9L8R0vWnJDNh05hRYElI";
var recBooks = document.querySelector("#books-container");
var videoContainer = document.getElementById("video-container");

//Fuction to get video info
function getYoutube() {
var queryUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}`;
fetch(queryUrl)
      .then(function (response) {
        console.log(response.status);
        if (response.status === 404) {
            responseText.textContent = "Oops, something went wrong!"
          }
          return response.json();
      })
    }

getYoutube();

//Function to get book info
function getBook(userInput) {
userInput = "ceviche"
recBooks.innerHTML = "";
var queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=${API_KEY}`;
fetch(queryUrl)
        .then(function (response) {
         console.log(response.status);
         if (response.status === 404) {
            responseText.textContent = "Oops, something went wrong!"
          }
          return response.json();
        })
        .then(function (data) {
            var book = document.createElement("img");
            var bookURL = (data.items[0].volumeInfo.imageLinks.smallThumbnail);
            book.src = bookURL;
            recBooks.append(book);
    })
}
    
getBook();