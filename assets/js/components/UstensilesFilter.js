import {recipes} from "../data/recipes";

export class UstensilesFilter {
    constructor() {
        this.ustensiles = new Set();
        this.render();
        this.listeners();
    }

    getUstensiles(recipes) {
        let listUstensile = new Set();
        for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
            for (
                let index = 0;
                index < recipes[recipeIndex].ustensils.length;
                index++
            ) {
                listUstensile.add(recipes[recipeIndex].ustensils[index]);
            }
        }

        return Array.from(listUstensile);
    }

    render(recipes) {
        this.remove();

        if (recipes) {
            this.ustensiles = this.getUstensiles(recipes);
        }

        for (let index = 0; index < this.ustensiles.length; index++) {
            const listSection = document.getElementById("listUstensiles");
            const liElt = document.createElement("li");
            liElt.dataset.name = this.ustensiles[index];

            liElt.textContent = this.ustensiles[index];
            listSection.appendChild(liElt);
        }
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            for (let indexU = 0; indexU < recipes[index].ustensils.length; indexU++) {
                if (
                    recipes[index].ustensils[indexU]
                        .toLowerCase()
                        .includes(ustensile.toLowerCase())
                ) {
                    results.add(recipes[index].ustensils[indexU].toLowerCase());
                }
            }
        }

        this.ustensiles = Array.from(results);
        this.render();
    }

    remove() {
        let recipeItem = document.querySelectorAll("#listUstensiles li");
        for (let index = 0; index < recipeItem.length; index++) {
            recipeItem[index].remove();
        }
    }

    listeners() {
        const inputUstensiles = document.getElementById("ustensiles");
        document
            .getElementById("btnUstentiles")
            .addEventListener("click", (e) => {
                this.toggle(inputUstensiles);
            });

        //SearchBar Tag
        inputUstensiles.addEventListener("keydown", (e) => {
            if (inputUstensiles.value.trim().length > 1) {
                this.searchByUstensile(recipes, inputUstensiles.value.trim());
            } else {
                this.ustensiles = this.getUstensiles(recipes);
                this.render();
            }
        });
    }

    toggle(inputUstensiles) {
        const label = document.getElementById("labelUstensiles");
        const combobox = document.getElementById("comboboxUstensiles");
        const list = document.getElementById("listUstensiles");

        if (inputUstensiles.classList.contains("d-none")) {
            inputUstensiles.classList.remove("d-none");
            label.classList.add("d-none");
            combobox.classList.add("expanded");
            list.classList.remove("d-none");
        } else {
            inputUstensiles.classList.add("d-none");
            label.classList.remove("d-none");
            combobox.classList.remove("expanded");
            list.classList.add("d-none");
        }

        const searchIngredient = document.getElementById("ustensiles");
        searchIngredient.addEventListener("keyup", () => {
        });
    }
}
