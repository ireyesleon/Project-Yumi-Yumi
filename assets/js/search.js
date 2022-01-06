const API_KEY = "48aeec184b014961a1ee143ca16912b2";
const LIST_RESULTS = 1;
const ingredientListArray = [];
const addIngredientButton = document.getElementById("addIngredient");
const searchRecipeButton = document.getElementById("searchRecipe");
const viewMoreButton = document.getElementsByClassName("viewMore");

function AddIngredient() {
  const ingredientList = document.getElementById("ingredientList");
  const addIngredientText = document.getElementById("ingredient");
  if (addIngredientText.value) {
    if (!ingredientListArray.includes(addIngredientText.value)) {
      ingredientListArray.push(addIngredientText.value);
      const addItem = document.createElement("div");
      addItem.innerHTML = `
        <ion-item>
            <ion-label>${addIngredientText.value}</ion-label>
        </ion-item>
        `;
      ingredientList.appendChild(addItem);
      addIngredientText.value = "";
    } else {
      addIngredientText.value = "";
      const alert = document.createElement("ion-alert");
      alert.header = "Error";
      alert.message = "Ingredient duplicate";
      alert.buttons = ["OK"];
      document.body.appendChild(alert);
      return alert.present();
    }
  }
}
function DetailRecipe(id) {
  const URL_RECIPE_ID = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`;
  return fetch(URL_RECIPE_ID).then((data) => data.json());
}
function SearchRecipe(ingredient) {
  const URL_RECIPE = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredient}&number=${LIST_RESULTS}`;
  return fetch(URL_RECIPE).then((data) => data.json());
}
function SearchRecipeInformation(idName) {
  console.log(idName);
}
function CreateCardRecipe() {
  const addCards = document.getElementById("addCards");
  if (ingredientListArray.length > 0) {
    SearchRecipe(ingredientListArray.toString()).then((data) => {
      for (let i = 0; i < data.length; i++) {
        const createCard = document.createElement("div");
        createCard.innerHTML = `
        <ion-col class="ion-margin-start \"  >
            <ion-card class="img-card">
            <ion-card-header>
                <ion-card-title>${data[i].title}</ion-card-title>
                <img  src="${data[i].image}" />
            </ion-card-header>
            <ion-card-content>
                <p style="font-size: 15px" id="${data[i].id}TimePreparation"></p>
                <p style="font-size: 15px" id="${data[i].id}Serving"></p>
                <p>Ingredients:</p>
                <ul id="${data[i].id}CardContent"></ul>
                <p id="${data[i].id}Summary"></p>
                <ion-button fill="outline" slot="end"  onclick="SearchRecipeInformation(${data[i].id})">
                View More
                </ion-button>
                <ion-button id="addFavorite-${data[i].id}" class="favoriteButton">
                <ion-icon name="bookmark-outline"></ion-icon>
                </ion-button>
            </ion-card-content>
            </ion-card>
        </ion-col>`;
        DetailRecipe(data[i].id).then((recipe) => {
          document.getElementById(
            `${data[i].id}TimePreparation`
          ).innerHTML = `Ready in ${recipe.readyInMinutes} Minutes <ion-icon name="timer-outline"></ion-icon>
          `;
          document.getElementById(
            `${data[i].id}Serving`
          ).innerHTML = `Serving for ${recipe.servings} <ion-icon name="people-outline"></ion-icon>`;
          document.getElementById(
            `${data[i].id}Summary`
          ).innerHTML = `${recipe.summary.slice(0, 450)}...`;
          for (let j = 0; j < recipe.extendedIngredients.length; j++) {
            const cardContent = document.getElementById(
              `${data[i].id}CardContent`
            );
            const extraIngredients = document.createElement("div");
            extraIngredients.innerHTML = `
              <li>${recipe.extendedIngredients[j].name}</li>
            `;
            cardContent.appendChild(extraIngredients);
          }
        });

        addCards.appendChild(createCard);
      }
    });
  } else {
    const alert = document.createElement("ion-alert");
    alert.header = "Error";
    alert.message = "Please add an Ingredient";
    alert.buttons = ["OK"];
    document.body.appendChild(alert);
    return alert.present();
  }
}
addIngredientButton.addEventListener("click", AddIngredient);
searchRecipeButton.addEventListener("click", CreateCardRecipe);
