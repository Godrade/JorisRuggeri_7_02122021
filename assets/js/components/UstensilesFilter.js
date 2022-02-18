import {recipes} from "../data/recipes";

export class UstensilesFilter {
    constructor() {
        this.ustensiles = new Set();
        this.render();
        this.listeners();
    }

    getUstensiles(recipes) {
        let listUstensile = new Set();

        recipes.map((recipe) => {
            recipe.ustensils.map((ustensil) => {
                listUstensile.add(ustensil);
            });
        });

        return Array.from(listUstensile);
    }

    render(recipes) {
        this.remove();

        if (recipes) {
            this.ustensiles = this.getUstensiles(recipes);
        }

        this.ustensiles.forEach((ustensile) => {
            const listSection = document.getElementById("listUstensiles");
            const liElt = document.createElement("li");
            liElt.dataset.name = ustensile;

            liElt.textContent = ustensile;
            listSection.appendChild(liElt);
        });
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();

        // trie
        recipes.map((recipe) => {
            recipe.ustensils.map((ustensil) => {
                if (ustensil.toLowerCase().indexOf(ustensile.toLowerCase()) !== -1) {
                    results.add(ustensil.toLowerCase());
                }
            });
        });

        this.ustensiles = Array.from(results);
        this.render();
    }

    remove() {
        let recipeItem = document.querySelectorAll("#listUstensiles li");
        recipeItem.forEach((element) => {
            element.remove();
        });
    }

    listeners() {
        const inputUstensiles = document.getElementById("ustensiles");
        document.getElementById("comboboxUstensiles").addEventListener("click", (e) => {
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
