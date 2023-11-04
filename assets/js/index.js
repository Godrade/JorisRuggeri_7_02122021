import { RecipeResults } from "./components/RecipeResults.js";
import { DevicesFilter } from "./components/DevicesFilter.js";
import { UstensilesFilter } from "./components/UstensilesFilter.js";
import { IngredientsFilter } from "./components/IngredientsFilter.js";
import { addTag } from "./helpers.js";
import { recipes } from "./data/recipes.js";

class App {
  constructor() {
    this.results = recipes;
    this.request = "";

    this.device = new Set();
    this.ustensiles = new Set();
    this.ingredients = new Set();

    this.render();
    this.listeners();
  }

  render() {
    new RecipeResults(this.results);
    new DevicesFilter(this.results);
    new IngredientsFilter(this.results);
    new UstensilesFilter(this.results);
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

    document.querySelectorAll("#listIngredients li").forEach((ingredient) => {
      ingredient.addEventListener("click", (e) => {
        if (!this.ingredients.has(e.target.getAttribute("data-name"))) {
          addTag(e.target.getAttribute("data-name"), "primary");
          this.ingredients.add(e.target.getAttribute("data-name"));
          this.querySearch();
        }
      });
    });

    document.getElementById("ingredients").addEventListener("change", () => {
      document.querySelectorAll("#listIngredients li").forEach((ingredient) => {
        ingredient.addEventListener("click", (e) => {
          this.ingredients.add(e.target.getAttribute("data-name"));
          this.querySearch();
        });
      });
    });

    document.querySelectorAll("#listDevices li").forEach((device) => {
      device.addEventListener("click", (e) => {
        if (!this.device.has(e.target.getAttribute("data-name"))) {
          addTag(e.target.getAttribute("data-name"), "success");
          this.device.add(e.target.getAttribute("data-name"));
          this.querySearch();
        }
      });
    });

    document.getElementById("devices").addEventListener("change", () => {
      document.querySelectorAll("#listDevices li").forEach((device) => {
        device.addEventListener("click", (e) => {
          this.device.add(e.target.getAttribute("data-name"));
          this.querySearch();
        });
      });
    });

    document.querySelectorAll("#listUstensiles li").forEach((ustensile) => {
      ustensile.addEventListener("click", (e) => {
        if (!this.ustensiles.has(e.target.getAttribute("data-name"))) {
          addTag(e.target.getAttribute("data-name"), "danger");
          this.ustensiles.add(e.target.getAttribute("data-name"));
          this.querySearch();
        }
      });
    });

    document.getElementById("ustensiles").addEventListener("change", () => {
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
        if (Array.from(this.device).includes(badge.id)) {
          this.device.delete(badge.id);
          this.querySearch();
        }
        if (Array.from(this.ingredients).includes(badge.id)) {
          this.ingredients.delete(badge.id);
          this.querySearch();
        }
        if (Array.from(this.ustensiles).includes(badge.id)) {
          this.ustensiles.delete(badge.id);
          this.querySearch();
        }
        badge.remove();
      });
    });
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
}

new App();
