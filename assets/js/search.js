
//Affichage des recettes (Toutes)
for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
   
    const divSection = document.getElementById('sectionRecipe');
    const divElt = document.createElement('div');
    divElt.className = "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mt-3";
    divElt.id = recipes[recipeIndex].id;

    const ingredients = () => {
        let item = "";
        for (let index = 0; index < recipes[recipeIndex].ingredients.length; index++) {
            const { ingredient, unit, quantity } = recipes[recipeIndex].ingredients[index]
            item += `<li><strong>${ingredient}:</strong> ${quantity ?? ''} ${unit ?? ''}</li>`;
        }
        return item;
    }
      

    const templatePage = `<div class="card">
        <img src="assets/images/default-recipe-cover.svg" class="card-img-top" alt="">
        <div class="card-body row">
            <div class="col-8">
                <p>${recipes[recipeIndex]['name']}</p>
            </div>
            <div class="col-4">
                <p class="fw-bold"><i class="far fa-clock"></i> <span>${recipes[recipeIndex]['time']}</span> min</p>
            </div>
            <div class="col-5">
                <ul class="fs-6 navbar-nav">
                    ${ingredients()}
                </ul>
            </div>
            <div class="col-7">
                <p class="fs-6">
                ${recipes[recipeIndex]['description']}
                </p>
            </div>
        </div>
    </div>`;

    divSection.appendChild(divElt);
    divElt.innerHTML = templatePage;
}

//Récupération des ingredients
let listIngredient = new Set();
for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
    for (let index = 0; index < recipes[recipeIndex].ingredients.length; index++) {
        listIngredient.add(recipes[recipeIndex].ingredients[index].ingredient);
    }
}

//Affichage des ingredients
const arrayIngredient = Array.from(listIngredient);
for (let index = 0; index < arrayIngredient.length; index++) {
    const ingredient = arrayIngredient[index];
    
    const listSection = document.getElementById('listIngredients');
    const liElt = document.createElement('li');

    liElt.textContent = ingredient;
    liElt.style.flexBasis = '200px';

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
    
    const listSection = document.getElementById('listDevice');
    const liElt = document.createElement('li');

    liElt.textContent = device;
    liElt.style.flexBasis = '200px';

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
    
    const listSection = document.getElementById('listUstensils');
    const liElt = document.createElement('li');

    liElt.textContent = unstensile;
    liElt.style.flexBasis = '200px';

    listSection.appendChild(liElt);
}

//Detection de la barre de recherche (3 lettres minimum)
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('change', (e) => {
    if (searchBar.value.length >= 3){
        for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
            document.getElementById(recipes[recipeIndex].id).style.display = 'block';

            const searchValue = searchBar.value.toLowerCase().trim();
            const wordName = recipes[recipeIndex].name.toLowerCase().split(' ');
            const wordDescription = recipes[recipeIndex].description.toLowerCase().split(' ');
            let wordIngredient = [];

            for (let index = 0; index < recipes[recipeIndex].ingredients.length; index++) {
                wordIngredient.push(recipes[recipeIndex].ingredients[index].ingredient.toLowerCase().split(' ').pop());
            }

            const wordNameNotFind = wordName.indexOf(searchValue) === -1;
            const wordDescriptionNotFind = wordDescription.indexOf(searchValue) === -1;
            const wordIngredientNotFind = wordIngredient.indexOf(searchValue) === -1;
            
            if (wordDescriptionNotFind && wordNameNotFind && wordIngredientNotFind){
                document.getElementById(recipes[recipeIndex].id).style.display = 'none';
            }
             
        }
    }
})