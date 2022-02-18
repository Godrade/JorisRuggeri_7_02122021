import {RecipeResults} from "./components/RecipeResults.js";
import {DevicesFilter} from "./components/DevicesFilter.js";
import {UstensilesFilter} from "./components/UstensilesFilter.js";
import {IngredientsFilter} from "./components/IngredientsFilter.js";
import {recipes} from "./data/recipes.js";

class App {
    deviceFilter;
    ingredientsFilter;
    ustensilesFilter;

    constructor(deviceFilter, ingredientsFilter, ustensilesFilter) {
        this.results = recipes;
        this.request = "";
        this.device = new Set();
        this.ustensile = new Set();
        this.ingredient = new Set();

        this.deviceFilter = deviceFilter;
        this.ingredientsFilter = ingredientsFilter;
        this.ustensilesFilter = ustensilesFilter;

        this.render();
        this.listeners();
    }

    render() {
        new RecipeResults(this.results);

        this.deviceFilter.render(this.results);
        this.ingredientsFilter.render(this.results);
        this.ustensilesFilter.render(this.results);
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

        const ingredients = document.querySelectorAll("#listIngredients li");
        ingredients.forEach((ingredient) => {
            ingredient.addEventListener("click", (e) => {
                this.ingredient.add(ingredient.getAttribute("data-name"));
                this.addTag(ingredient.getAttribute("data-name"), "primary");
            });
        });

        const devices = document.querySelectorAll("#listDevices li");
        devices.forEach((device) => {
            device.addEventListener("click", (e) => {
                this.device.add(device.getAttribute("data-name"));
                this.addTag(device.getAttribute("data-name"), "success");
            });
        });

        const ustensiles = document.querySelectorAll("#listUstensiles li");
        ustensiles.forEach((ustensile) => {
            ustensile.addEventListener("click", (e) => {
                this.ustensile.add(ustensile.getAttribute("data-name"));
                this.addTag(ustensile.getAttribute("data-name"), "danger");
            });
        });

        const tagList = document.querySelectorAll(".badge i");
        tagList.forEach((element) => {
            element.addEventListener("click", (e) => {
                const badge = element.closest(".badge");
                console.log({badge});

                if (Array.from(this.device).includes(badge.id)) {
                    this.device.delete(badge.id);
                }
                if (Array.from(this.ingredient).includes(badge.id)) {
                    this.ingredient.delete(badge.id);
                }
                if (Array.from(this.ustensile).includes(badge.id)) {
                    this.ustensile.delete(badge.id);
                }
                badge.remove();
                this.querySearch();
            });
        });
    }

    addTag(tagName, color) {
        const tagSection = document.getElementById("tagSection");
        const tag = document.createElement("span");
        tag.className = `badge rounded-pill bg-${color} me-1`;
        tag.id = tagName;
        tag.dataset.name = tagName;

        const templatePage = `${tagName} <i class="far fa-times-circle"></i>`;

        tagSection.appendChild(tag);
        tag.innerHTML = templatePage;

        this.querySearch();
    }

    querySearch() {
        let recipeItem = document.querySelectorAll(".recipe");
        recipeItem.forEach((element) => {
            element.remove();
        });

        this.search(this.request, this.device, this.ustensile, this.ingredient);
        this.render();
        this.listeners();
    }

    search(request, device, ustensile, ingredients) {
        let results = [];

        results = this.searchAllByRequest(request);
        results = this.searchByDevice(results, device);
        results = this.searchByUstensile(results, ustensile);
        results = this.searchByIngredient(results, ingredients);

        this.results = results;
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
        device = Array.from(device);

        // trie
        for (let arrayDevices = 0; arrayDevices < device.length; arrayDevices++) {
            for (let index = 0; index < recipes.length; index++) {
                if (
                    recipes[index].appliance.toLowerCase().includes(device[arrayDevices].toLowerCase())
                ) {
                    results.add(recipes[index]);
                }
            }
        }

        return Array.from(results);
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();
        ustensile = Array.from(ustensile);

        // trie
        for (let arrayUstensiles = 0; arrayUstensiles < ustensile.length; arrayUstensiles++) {
            for (let index = 0; index < recipes.length; index++) {
                for (let indexU = 0; indexU < recipes[index].ustensils.length; indexU++) {
                    if (
                        recipes[index].ustensils[indexU]
                            .toLowerCase()
                            .includes(ustensile[arrayUstensiles].toLowerCase())
                    ) {
                        results.add(recipes[index]);
                    }
                }
            }
        }

        return Array.from(results);
    }

    searchByIngredient(recipes, ingredient) {
        let results = new Set();
        ingredient = Array.from(ingredient);

        // trie
        for (let arrayIngredients = 0; arrayIngredients < ingredient.length; arrayIngredients++) {
            for (let index = 0; index < recipes.length; index++) {
                for (let indexU = 0; indexU < recipes[index].ingredients.length; indexU++) {
                    if (
                        recipes[index].ingredients[indexU].ingredient
                            .toLowerCase()
                            .includes(ingredient[arrayIngredients].toLowerCase())
                    ) {
                        results.add(recipes[index]);
                    }
                }
            }
        }

        return Array.from(results);
    }
}

const deviceFilter = new DevicesFilter();
const ingredientsFilter = new IngredientsFilter();
const ustensilesFilter = new UstensilesFilter();
new App(deviceFilter, ingredientsFilter, ustensilesFilter);
