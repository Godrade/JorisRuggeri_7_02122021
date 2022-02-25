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
        this.ustensiles = new Set();
        this.ingredients = new Set();

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
        console.log('ingredient 1', ingredients)
        ingredients.forEach((ingredient) => {
            console.log('ingredient 2', ingredient)
            ingredient.addEventListener("click", (e) => {
                console.log('ingredient 3')
                this.ingredients.add(ingredient.getAttribute("data-name"));
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
                this.ustensiles.add(ustensile.getAttribute("data-name"));
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
                if (Array.from(this.ingredients).includes(badge.id)) {
                    this.ingredients.delete(badge.id);
                }
                if (Array.from(this.ustensiles).includes(badge.id)) {
                    this.ustensiles.delete(badge.id);
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

        this.search(this.request, this.device, this.ustensiles, this.ingredients);
        this.render();
        this.listeners();
    }

    search(request, device, ustensiles, ingredients) {
        let results = [];

        results = this.searchAllByRequest(request);
        //results = this.searchByDevice(results, device);
        results = this.searchByUstensile(results, ustensiles);
        results = this.searchByIngredient(results, ingredients);

        this.results = results;
    }

    searchAllByRequest(request) {
        let results = [];

        recipes.map((recipe) => {
            const wordName = recipe.name.toLowerCase();
            const wordDescription = recipe.description.toLowerCase();
            let wordIngredient = [];

            recipe.ingredients.map((ingredients) => {
                wordIngredient.push(
                    ingredients.ingredient.toLowerCase()
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


    searchByUstensile(recipes, ustensiles) {
        let results = new Set();
        ustensiles = Array.from(ustensiles);

        if (ustensiles.length === 0) return recipes

        // trie
        ustensiles.forEach((ustensile) => {
            recipes.forEach((recipe) => {
                results.add(recipe.ustensils.filter((item) => {
                    console.log({item, ustensile}, item.toLowerCase().includes(ustensile.toLowerCase()))
                    item.toLowerCase().includes(ustensile.toLowerCase())
                }).length > 0);
            });
        });

        return Array.from(results);
    }

    searchByIngredient(recipes, ingredients) {
        let results = new Set();
        ingredients = Array.from(ingredients);

        // trie
        for (let recipe of recipes) {
            let ingredientsMatch = [];
            ingredients.forEach((ingredient) => {
                ingredientsMatch.push(
                    recipe.ingredients.filter((item) => item.ingredient.toLowerCase().includes(ingredient.toLowerCase())
                    ).length > 0
                );
            });
            if (ingredientsMatch.every((match) => match)) {
                results.add(recipe);
            }
        }

        return Array.from(results);
    }
}

const deviceFilter = new DevicesFilter();
const ingredientsFilter = new IngredientsFilter();
const ustensilesFilter = new UstensilesFilter();
new App(deviceFilter, ingredientsFilter, ustensilesFilter);
