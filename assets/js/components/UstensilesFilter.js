import {recipes} from "../data/recipes";

export class UstensilesFilter {

    ustensiles;
    existe = false;

    constructor(recipes) {
        this.ustensiles = this.getUstensiles(recipes);
        if (this.existe){
            throw new Error('Existe')
        }
        this.existe = true;
        this.render();
    }

    getUstensiles(recipes) {
        let listUstensile = new Set();
        for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
            for (let index = 0; index < recipes[recipeIndex].ustensils.length; index++) {
                listUstensile.add(recipes[recipeIndex].ustensils[index]);
            }
        }

        return Array.from(listUstensile);
    }

    render() {
        this.remove();
        this.ustensiles.forEach((ustensile) => {
            const listSection = document.getElementById("listUstensiles");
            const liElt = document.createElement("li");
            liElt.dataset.name = ustensile

            liElt.textContent = ustensile;
            listSection.appendChild(liElt);
        });

        this.listeners();
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            for (let indexU = 0; indexU < recipes[index].ustensils.length; indexU++) {
                if (recipes[index].ustensils[indexU].toLowerCase().includes(ustensile.toLowerCase())) {
                    results.add(recipes[index].ustensils[indexU].toLowerCase())
                }
            }
        }

        this.ustensiles = Array.from(results);
        this.render()
    }

    remove() {
        let recipeItem = document.querySelectorAll("#listUstensiles li");
        recipeItem.forEach((element) => {
            element.remove();
        });
    }

    listeners() {
        console.log(1);
        const inputUstensiles = document.getElementById('ustensiles');
        document.getElementById('comboboxUstensiles').addEventListener('click', (e) => {
            console.log(inputUstensiles);

            this.toggle(inputUstensiles)
        })

        //SearchBar Tag
        inputUstensiles.addEventListener('keydown', (e) => {
            if (inputUstensiles.value.trim().length > 1) {
                this.searchByUstensile(recipes, inputUstensiles.value.trim())
            } else {
                this.ustensiles = this.getUstensiles(recipes)
                this.render()
            }
        })
    }

    toggle(inputUstensiles) {
        console.log('toogle');
        const label = document.getElementById('labelUstensiles')
        const combobox = document.getElementById('comboboxUstensiles')
        const list = document.getElementById('listUstensiles')

        console.log(inputUstensiles.classList);

        if (inputUstensiles.classList.contains('d-none')) {
            inputUstensiles.classList.remove("d-none")
            label.classList.add('d-none')
            combobox.classList.add('expanded')
            list.classList.remove('d-none')
        } else {
            inputUstensiles.classList.add("d-none")
            label.classList.remove('d-none')
            combobox.classList.remove('expanded')
            list.classList.add('d-none')
        }

        const searchIngredient = document.getElementById('ustensiles');
        searchIngredient.addEventListener('keyup', () => {

        })
    }
}
  