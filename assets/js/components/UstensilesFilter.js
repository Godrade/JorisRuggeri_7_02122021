export class UstensilesFilter {
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
  
        liElt.textContent = ustensile;
        liElt.style.flexBasis = "200px";
  
        listSection.appendChild(liElt);
      });
    }

    remove(){
      let recipeItem = document.querySelectorAll("#listUstensiles li");
      recipeItem.forEach((element) => {
        element.remove();
      });
    }
  
    listeners(){
      const inputUstensiles = document.getElementById('inputUstensiles');
      document.getElementById('ustensiles').addEventListener('click', (e) => {
        if (inputUstensiles.classList.contains('d-none')){
          inputUstensiles.classList.remove("d-none")
        } else {
          inputUstensiles.classList.add("d-none")
        }
      })
  
      //SearchBar Tag
      const tagSection = document.getElementById('tagSection');
      

      inputUstensiles.addEventListener('change', (e) => {
        const tag = document.createElement('span');
        tag.className = 'badge rounded-pill bg-danger me-1';
        tag.id = inputUstensiles.value;

        const templatePage = `${inputUstensiles.value} <i class="far fa-times-circle"></i>`

        tagSection.appendChild(tag)
        tag.innerHTML = templatePage;
      })
    }
  }
  