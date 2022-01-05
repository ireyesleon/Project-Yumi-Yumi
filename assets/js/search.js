const API_KEY = "836d5ae3b9f844bdb1db505fe0936891";
const LIST_RESULTS = 10;
const ingredientListArray = [];
const addIngredientButton = document.getElementById("addIngredient");
const searchRecipeButton = document.getElementById("searchRecipe");

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

function SearchRecipe(ingredient) {
  const URL_RECIPE = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredient}&number=${LIST_RESULTS}`;
  return fetch(URL_RECIPE).then((data) => data.json());
}
function CreateCardRecipe() {
  const addCards = document.getElementById("addCards");
  if (ingredientListArray.length > 0) {
    SearchRecipe(ingredientListArray.toString()).then((data) => {
      for (let i = 0; i < data.length; i++) {
        const createCard = document.createElement("div");
        createCard.innerHTML = `<ion-col class="ion-margin-start"  >
      <ion-card>
        <ion-card-header>
          <ion-card-title>${data[i].title}</ion-card-title>
          <img class="img-card" src="${data[i].image}" />
        </ion-card-header>
        <ion-card-content>
          <ion-button fill="outline" slot="end">
            View More
          </ion-button>
          <ion-button id="addFavorite-${data[i].id}" class="favoriteButton">
            <ion-icon name="bookmark-outline"></ion-icon>
          </ion-button>
          <ion-button id="searchYoutube-${data[i].title}" class="youtubeRecipe">
            <ion-icon name="logo-youtube"></ion-icon>
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-col>`;
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
