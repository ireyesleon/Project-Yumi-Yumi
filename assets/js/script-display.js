var API_KEY = "AIzaSyBRWCznDxhq751Q02Bn8LA8WOrb8k4Ue0E";
var API_KEY_SPOON = "e2319ee545584427ad0527994d2a1890";
// var recBooks = document.querySelector("#books-container");
var videoContainer = document.getElementById("video-container");
var recipeTitle = document.getElementById("recipe-title");
var recipePhoto = document.getElementById("photo-container");
var recipeIngredients = document.getElementById("recipe-ingredients");
var recipeInstructions = document.getElementById("recipe-instructions");
var recipeList = document.createElement("ul");
var instructionsList = document.createElement("ol");
var nextInstructionsList = document.createElement("ol");
var summaryInfo = document.getElementById("summary");

//Fuction to get video info
function getYoutube(recipeKeywords) {
  var queryUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=1&q=${recipeKeywords}`;

  return fetch(queryUrl).then((data) => data.json());
}

//Function to display local storage info
function getRecipe() {
  var id = JSON.parse(localStorage.getItem("recipeID"));
  var URL_RECIPE_ID = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_SPOON}&includeNutrition=false&instructionsRequired=true`;
  console.log(URL_RECIPE_ID);
  fetch(URL_RECIPE_ID)
    .then(function (response) {
      console.log(response.status);
      if (response.status === 404) {
        responseText.textContent = "Oops, something went wrong!";
      }
      return response.json();
    })
    .then(function (data) {
      recipeTitle.textContent = data.title;
      var image = document.createElement("img");
      image.src = data.image;
      recipePhoto.append(image);
      var ingredients = data.extendedIngredients;
      for (i = 0; i < ingredients.length; i++) {
        console.log(ingredients[i].original);
        var item = document.createElement("li");
        item.textContent = ingredients[i].original;
        recipeList.append(item);
        recipeIngredients.append(recipeList);
      }
      var stepsArray = data.analyzedInstructions[0].steps;
      console.log(stepsArray);
      var instructionOne = document.createElement("p");
      instructionOne.textContent = data.analyzedInstructions[0].name;
      instructionsList.append(instructionOne);
      var summaryOne = document.createElement("div");
      summaryOne.innerHTML = data.summary;
      summaryInfo.append(summaryOne);
      console.log(summaryOne);
      for (l = 0; l < stepsArray.length; l++) {
        console.log(stepsArray[l].step);
        var instruction = document.createElement("li");
        instruction.textContent = stepsArray[l].step;
        instructionsList.append(instruction);
        recipeInstructions.append(instructionsList);
      }
      if (data.analyzedInstructions.length > 1) {
        var nextStep = data.analyzedInstructions[1].steps;
        var instructionTwo = document.createElement("p");
        instructionTwo.textContent = data.analyzedInstructions[1].name;
        nextInstructionsList.append(instructionTwo);
        for (m = 0; m < nextStep.length; m++) {
          console.log(stepsArray[m].step);
          var nextInstruction = document.createElement("li");
          nextInstruction.textContent = nextStep[m].step;
          nextInstructionsList.append(nextInstruction);
          recipeInstructions.append(nextInstructionsList);
        }
      }
      getYoutube(data.title).then((data) => {
        document.getElementById("youtubeVideo").innerHTML = ` 
              <iframe width="280" height="158" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" title=${data.items[0].snippet.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              `;
      });
    });
}
getRecipe();
