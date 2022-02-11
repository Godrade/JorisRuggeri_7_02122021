import {RecipeResults} from "./components/RecipeResults.js";
import {DevicesFilter} from "./components/DevicesFilter.js";
import {UstensilesFilter} from "./components/UstensilesFilter.js";
import {IngredientsFilter} from "./components/IngredientsFilter.js";
import {recipes} from "./data/recipes.js";

class Index {
    constructor() {
        this.results = recipes;
        this.request = "";
        this.device = "";
        this.ustensile = "";
        this.ingredient = "";
        // ajout d'une variable pour chaque filtre

        this.render();
        this.listeners();
    }

    render() {
        new RecipeResults(this.results);
        new DevicesFilter(this.results);
        new IngredientsFilter(this.results);
        new UstensilesFilter(this.results);
        // appeler les autre composants (les autre filtres)
    }

    listeners() {
        const searchBar = document.getElementById("searchBar");

        searchBar.addEventListener("change", (e) => {
            if (searchBar.value.length >= 3) {
                this.request = searchBar.value;
                this.querySearch();
            } else {
                this.request = "";
                this.querySearch();
            }
        });

        // listener pour chaque filtres (quand on click sur un élément et les inputs des filtres)
    }

    querySearch() {
        let recipeItem = document.querySelectorAll(".recipe");
        recipeItem.forEach((element) => {
            element.remove();
        });

        console.log(this.ingredient);
        // donner à la méthode search tout les filtres en courant
        this.search(this.request, this.device, this.ustensile, this.ingredient);
        this.render();
    }

    search(request, device, ustensile, ingredient) {
        let results = [];

        results = this.searchAllByRequest(request);
        results = this.searchByDevice(results, device);
        results = this.searchByUstensile(results, ustensile);
        results = this.searchByIngredient(results, ingredient);

        this.results = results;
        console.log(results, ingredient);
    }

    searchAllByRequest(request) {
        let results = [];
        for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
            const wordName = recipes[recipeIndex].name.toLowerCase();
            const wordDescription = recipes[recipeIndex].description.toLowerCase();
            let wordIngredient = [];

            for (
                let index = 0;
                index < recipes[recipeIndex].ingredients.length;
                index++
            ) {
                wordIngredient.push(
                    recipes[recipeIndex].ingredients[index].ingredient.toLowerCase()
                );
            }

            if (
                wordName.toLowerCase().includes(request) ||
                wordDescription.includes(request) ||
                wordIngredient.includes(request)
            ) {
                results.push(recipes[recipeIndex]);
            }
        }
        return results;
    }

    searchByDevice(recipes, device) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            if (recipes[index].appliance.toLowerCase().includes(device.toLowerCase())) {
                results.add(recipes[index])
            }
        }

        return Array.from(results);
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            for (let indexU = 0; indexU < recipes[index].ustensils.length; indexU++) {
                if (recipes[index].ustensils[indexU].toLowerCase().includes(ustensile.toLowerCase())) {
                    results.add(recipes[index])
                }
            }
        }

        return Array.from(results);
    }

    searchByIngredient(recipes, ingredient) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            for (let indexU = 0; indexU < recipes[index].ingredients.length; indexU++) {
                if (recipes[index].ingredients[indexU].ingredient.toLowerCase().includes(ingredient.toLowerCase())) {
                    results.add(recipes[index])
                }
            }
        }

        return Array.from(results);
    }
}

new Index();
