export class IngredientsFilter {
    constructor(recipes) {
      this.ingredients = this.getIngredients(recipes);
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
  
        console.log(listIngredient);
      return Array.from(listIngredient);
    }
  
    render() {
      this.remove();
      console.log('yo');
      this.ingredients.forEach((ingredient) => {
        const listSection = document.getElementById("listIngredients");
        const liElt = document.createElement("li");
  
        liElt.textContent = ingredient;
        liElt.style.flexBasis = "200px";
  
        listSection.appendChild(liElt);
      });
    }

    remove(){
      let recipeItem = document.querySelectorAll("#listIngredients li");
      recipeItem.forEach((element) => {
        element.remove();
      });
    }
  
    listeners(){
      console.log('ntm');
      const inputIngredients = document.getElementById('inputIngredients');
      
      document.getElementById('ingredients').addEventListener('click', (e) => {
        this.toggle(inputIngredients);
      })
      document.getElementById('ingredients').removeEventListener('click', (e) => {
        this.toggle(inputIngredients);
      })
      
      //SearchBar Tag
      const tagSection = document.getElementById('tagSection');
    
      inputIngredients.addEventListener('keypress', (e) => {
        const tag = document.createElement('span');
        tag.className = 'badge rounded-pill bg-primary me-1';
        tag.id = inputIngredients.value;

        const templatePage = `${inputIngredients.value} <i class="far fa-times-circle"></i>`

        tagSection.appendChild(tag)
        tag.innerHTML = templatePage;
      })
    }

    toggle(inputIngredients){
      console.log(inputIngredients.classList);
        if (inputIngredients.classList.contains('d-none')){
          inputIngredients.classList.remove("d-none")
        } else {
          inputIngredients.classList.add("d-none")
        }


        const searchUser = document.getElementById('searchUser');
        const listUser = document.querySelectorAll('.listUser');

        searchUser.addEventListener('change', () => {
            listUser.forEach((user) => {
                if (searchUser.value.length !== 0) {
                    if (user.id !== searchUser.value) {
                        user.style.display = 'none';
                    } else {
                        user.style.removeProperty('display')
                    }
                } else {
                    user.style.removeProperty('display')
                }
            });
        })
    }
  }
  