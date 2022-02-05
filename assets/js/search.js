//Récupération des ingredients
let listIngredient = new Set();
for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
  for (
    let index = 0;
    index < recipes[recipeIndex].ingredients.length;
    index++
  ) {
    listIngredient.add(recipes[recipeIndex].ingredients[index].ingredient);
  }
}

//Affichage des ingredients
const arrayIngredient = Array.from(listIngredient);
for (let index = 0; index < arrayIngredient.length; index++) {
  const ingredient = arrayIngredient[index];

  const listSection = document.getElementById("listIngredients");
  const liElt = document.createElement("li");

  liElt.textContent = ingredient;
  liElt.style.flexBasis = "200px";

  listSection.appendChild(liElt);
}

//Récupération des Appareils
let listDevice = new Set();
for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
  listDevice.add(recipes[recipeIndex].appliance);
}

//Affichage des appareils
const arrayDevice = Array.from(listDevice);
for (let index = 0; index < arrayDevice.length; index++) {
  const device = arrayDevice[index];

  const listSection = document.getElementById("listDevice");
  const liElt = document.createElement("li");

  liElt.textContent = device;
  liElt.style.flexBasis = "200px";

  listSection.appendChild(liElt);
}

//Récupération des Unstensiles
let listUstensils = new Set();
for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
  for (let index = 0; index < recipes[recipeIndex].ustensils.length; index++) {
    listUstensils.add(recipes[recipeIndex].ustensils[index]);
  }
}

//Affichage des Unstensiles
const arrayUnstensils = Array.from(listUstensils);
for (let index = 0; index < arrayDevice.length; index++) {
  const unstensile = arrayUnstensils[index];

  const listSection = document.getElementById("listUstensils");
  const liElt = document.createElement("li");

  liElt.textContent = unstensile;
  liElt.style.flexBasis = "200px";

  listSection.appendChild(liElt);
}
