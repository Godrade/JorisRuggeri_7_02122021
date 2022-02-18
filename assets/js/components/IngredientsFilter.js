import {recipes} from "../data/recipes";

export class IngredientsFilter {
    constructor(recipes) {
        this.ingredients = new Set();
        this.render();
        this.listeners();
    }

    getIngredients(recipes) {
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
        for (let index = 0; index < recipes.length; index++) {
            for (
                let indexU = 0;
                indexU < recipes[index].ingredients.length;
                indexU++
            ) {
                if (
                    recipes[index].ingredients[indexU].ingredient
                        .toLowerCase()
                        .indexOf(ingredient.toLowerCase()) !== -1
                ) {
                    results.add(
                        recipes[index].ingredients[indexU].ingredient.toLowerCase()
                    );
                }
            }
        }

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
        window.addEventListener("DOMContentLoaded", () => {
            const inputIngredients = document.getElementById("ingredients");

            document
                .getElementById("btnIngredients")
                .addEventListener("click", (e) => {
                    this.toggle(inputIngredients);
                });

            //SearchBar Tag
            inputIngredients.addEventListener("keydown", (e) => {
                console.log(1)
                if (inputIngredients.value.trim().length > 1) {
                    this.searchByIngredient(recipes, inputIngredients.value.trim());
                } else {
                    this.ingredients = this.getIngredients(recipes);
                    this.render();
                }
            });
        });
    }

    toggle(inputIngredients) {
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

        const searchIngredient = document.getElementById("ingredients");
        searchIngredient.addEventListener("keyup", () => {
        });
    }
}
