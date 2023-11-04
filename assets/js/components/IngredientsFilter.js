import { recipes } from "../data/recipes.js";
import { addTag } from "../helpers.js";

export class IngredientsFilter {
  constructor(recipes) {
    this.ingredients = new Set();
    this.render(recipes);
    this.listeners();
  }

  getIngredients(recipes) {
    let listIngredient = new Set();

    recipes.map((recipe) => {
      recipe.ingredients.map((ingredient) => {
        listIngredient.add(ingredient.ingredient);
      });
    });

    return Array.from(listIngredient);
  }

  render(recipes) {
    if (recipes) {
      this.ingredients = this.getIngredients(recipes);
    }
    this.remove();
    this.ingredients.forEach((ingredient) => {
      const listSection = document.getElementById("listIngredients");
      const liElt = document.createElement("li");
      liElt.dataset.name = ingredient;

      liElt.textContent = ingredient;
      listSection.appendChild(liElt);
    });
  }

  searchByIngredient(recipes, ingredient) {
    let results = new Set();

    // trie

    recipes.map((recipe) => {
      recipe.ingredients.map((ingredientsList) => {
        if (
          ingredientsList.ingredient
            .toLowerCase()
            .indexOf(ingredient.toLowerCase()) !== -1
        ) {
          results.add(ingredientsList.ingredient.toLowerCase());
        }
      });
    });

    this.ingredients = Array.from(results);
    this.render();
  }

  remove() {
    let recipeItem = document.querySelectorAll("#listIngredients li");
    recipeItem.forEach((element) => {
      element.remove();
    });
  }

  listeners() {
    console.log("LISTENERS INGREDIENTS");

    const inputIngredients = document.getElementById("ingredients");
    document.getElementById("btnIngredients").addEventListener("click", (e) => {
      console.log("what");
      this.toggle(inputIngredients);
    });

    //SearchBar Tag
    inputIngredients.addEventListener("keydown", (e) => {
      if (inputIngredients.value.trim().length > 1) {
        this.searchByIngredient(recipes, inputIngredients.value.trim());
      } else {
        this.ingredients = this.getIngredients(recipes);
        this.render();
      }
    });

    document.getElementById("ingredients").addEventListener("change", () => {
      document.querySelectorAll("#listIngredients li").forEach((ingredient) => {
        ingredient.addEventListener("click", (e) => {
          addTag(e.target.getAttribute("data-name"), "primary");
        });
      });
    });
  }

  toggle(inputIngredients) {
    console.log("TOGGLE");
    const label = document.getElementById("labelIngredients");
    const combobox = document.getElementById("comboboxIngredients");
    const list = document.getElementById("listIngredients");

    if (inputIngredients.classList.contains("d-none")) {
      inputIngredients.classList.remove("d-none");
      label.classList.add("d-none");
      combobox.classList.add("expanded");
      list.classList.remove("d-none");
    } else {
      inputIngredients.classList.add("d-none");
      label.classList.remove("d-none");
      combobox.classList.remove("expanded");
      list.classList.add("d-none");
    }
  }
}
