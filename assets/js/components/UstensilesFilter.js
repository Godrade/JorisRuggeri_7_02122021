import {recipes} from "../../../OLD/data/recipes";

export class UstensilesFilter {

    ustensiles;

    constructor(recipes) {
        this.ustensiles = this.getUstensiles(recipes);
        this.render();
        this.listeners();
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
    }

    searchByUstensile(recipes, ustensile) {
        let results = new Set();

        // trie
        for (let index = 0; index < recipes.length; index++) {
            for (let indexU = 0; indexU < recipes[index].ustensils.length; indexU++) {
                if (recipes[index].ustensils[indexU].toLowerCase().includes(ustensile.toLowerCase())) {
                    results.add(recipes[index].ustensils[indexU])
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
        const inputUstensiles = document.getElementById('ustensiles');
        document.getElementById('comboboxUstensiles').addEventListener('click', (e) => {
            this.toggle(inputUstensiles)
        })

        //Click Tag
        let recipeItem = document.querySelectorAll("#listUstensiles li");
        recipeItem.forEach((element) => {
            element.addEventListener('click', (e) => {
                this.addTag(element.getAttribute('data-name'));
            })
        });

        //Click Remove Tag
        let tagList = document.querySelectorAll("span .badge i");
        tagList.forEach((element) => {
            element.addEventListener('click', (e) => {
                element.remove()
            })
        });

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

    addTag(tagName) {
        const tagSection = document.getElementById('tagSection');
        const tag = document.createElement('span');
        tag.className = 'badge rounded-pill bg-danger me-1';
        tag.id = tagName;
        tag.dataset.name = tagName;

        const templatePage = `${tagName} <i class="far fa-times-circle"></i>`

        tagSection.appendChild(tag)
        tag.innerHTML = templatePage;

    }

    toggle(inputUstensiles) {
        const label = document.getElementById('labelUstensiles')
        const combobox = document.getElementById('comboboxUstensiles')
        const list = document.getElementById('listUstensiles')

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
  