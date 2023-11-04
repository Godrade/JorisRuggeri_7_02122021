import { RecipeResults } from "./components/RecipeResults.js";
import { recipes } from "./data/recipes.js";
import { addTag } from "./helpers.js";

export class App {
  constructor() {
    this.results = recipes;
    this.request = "";

    this.device = new Set();
    this.ustensiles = new Set();
    this.ingredients = new Set();

    this.render();
  }

  render() {
    new RecipeResults(this.results);
    this.listeners();
  }

  querySearch() {
    console.log("coucou ça query");
    let recipeItem = document.querySelectorAll(".recipe");
    recipeItem.forEach((element) => {
      element.remove();
    });

    this.search(this.request, this.device, this.ustensiles, this.ingredients);
    this.render();
  }

  search(request, device, ustensiles, ingredients) {
    let results = [];

    results = this.searchAllByRequest(request);
    results = this.searchByDevice(results, device);
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
        wordIngredient.push(ingredients.ingredient.toLowerCase());
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

  searchByDevice(recipes, devices) {
    let results = new Set();
    devices = Array.from(devices);

    if (devices.length === 0) return recipes;

    // trie
    devices.forEach((deviceName) => {
      recipes.forEach((recipe) => {
        if (recipe.appliance.toLowerCase().includes(deviceName.toLowerCase())) {
          results.add(recipe);
        }
      });
    });
    return Array.from(results);
  }

  searchByUstensile(recipes, ustensiles) {
    let results = new Set();
    ustensiles = Array.from(ustensiles);

    if (ustensiles.length === 0) return recipes;

    // trie
    for (let recipe of recipes) {
      let ustensilesMatch = [];
      ustensiles.forEach((ustensile) => {
        ustensilesMatch.push(
          recipe.ustensils.filter((item) =>
            item.toLowerCase().includes(ustensile.toLowerCase())
          ).length > 0
        );
      });
      if (ustensilesMatch.every((match) => match)) {
        results.add(recipe);
      }
    }

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
          recipe.ingredients.filter((item) =>
            item.ingredient.toLowerCase().includes(ingredient.toLowerCase())
          ).length > 0
        );
      });
      if (ingredientsMatch.every((match) => match)) {
        results.add(recipe);
      }
    }

    return Array.from(results);
  }

  listeners() {
    const searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("keyup", (e) => {
      if (searchBar.value.length >= 3) {
        this.request = searchBar.value;
        this.querySearch();
      } else {
        this.request = "";
        this.querySearch();
      }
    });

    document.querySelectorAll("#listIngredients li").forEach((ingredient) => {
      ingredient.addEventListener("click", (e) => {
        this.ingredients.add(e.target.getAttribute("data-name"));
        addTag(e.target.getAttribute("data-name"), "primary");
        this.querySearch();
      });
    });

    document.getElementById("ingredients").addEventListener("keyup", () => {
      document.querySelectorAll("#listIngredients li").forEach((ingredient) => {
        ingredient.addEventListener("click", (e) => {
          this.ingredients.add(e.target.getAttribute("data-name"));
          this.querySearch();
        });
      });
    });

    document.querySelectorAll("#listDevices li").forEach((device) => {
      device.addEventListener("click", (e) => {
        this.device.add(e.target.getAttribute("data-name"));
        addTag(e.target.getAttribute("data-name"), "success");
        this.querySearch();
      });
    });

    document.getElementById("devices").addEventListener("keyup", () => {
      document.querySelectorAll("#listDevices li").forEach((device) => {
        device.addEventListener("click", (e) => {
          this.device.add(e.target.getAttribute("data-name"));
          this.querySearch();
        });
      });
    });

    document.querySelectorAll("#listUstensiles li").forEach((ustensile) => {
      ustensile.addEventListener("click", (e) => {
        this.ustensiles.add(e.target.getAttribute("data-name"));
        addTag(e.target.getAttribute("data-name"), "danger");
        this.querySearch();
      });
    });

    document.getElementById("ustensiles").addEventListener("keyup", () => {
      document.querySelectorAll("#listUstensiles li").forEach((ustensile) => {
        ustensile.addEventListener("click", (e) => {
          this.ustensiles.add(e.target.getAttribute("data-name"));
          this.querySearch();
        });
      });
    });

    const tagList = document.querySelectorAll(".badge i");
    tagList.forEach((element) => {
      element.addEventListener("click", (e) => {
        const badge = element.closest(".badge");
        console.log({ badge });

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
}
