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

        recipes.map((recipe) => {
            const wordName = recipe.name.toLowerCase();
            const wordDescription = recipe.description.toLowerCase();
            let wordIngredient = [];

            recipe.ingredients.map((ingredient) => {
                wordIngredient.push(
                    ingredient.ingredient.toLowerCase()
                );
            });

            if (
                wordName.toLowerCase().includes(request) ||
                wordDescription.includes(request) ||
                wordIngredient.includes(request)
            ) {
                results.push(recipe);
            }
        });
        return results;
    }

    searchByDevice(recipes, device) {
        let results = new Set();
        device = Array.from(device);

        // trie
        device.map((deviceName) => {
            recipes.map((recipe) => {
                if (
                    recipe.appliance.toLowerCase().includes(deviceName.toLowerCase())
                ) {
                    results.add(recipe);
                }
            });
        });
        return Array.from(results);
    }


    searchByUstensile(recipes, ustensile) {
        let results = new Set();
        ustensile = Array.from(ustensile);

        // trie
        ustensile.map((deviceName) => {
            recipes.map((recipe) => {
                recipe.ustensils.map((ustensil) => {
                    if (
                        ustensil
                            .toLowerCase()
                            .includes(ustensil.toLowerCase())
                    ) {
                        results.add(recipe);
                    }
                });
            });
        });
        return Array.from(results);
    }

    searchByIngredient(recipes, ingredient) {
        let results = new Set();
        ingredient = Array.from(ingredient);

        // trie
        ingredient.map((ingredientName) => {
            recipes.map((recipe) => {
                recipe.ingredients.map((ingredient) => {
                    if (
                        ingredient
                            .toLowerCase()
                            .includes(ingredient.toLowerCase())
                    ) {
                        results.add(recipe);
                    }
                });
            });
        });

        return Array.from(results);
    }
}

const deviceFilter = new DevicesFilter();
const ingredientsFilter = new IngredientsFilter();
const ustensilesFilter = new UstensilesFilter();
new App(deviceFilter, ingredientsFilter, ustensilesFilter);
