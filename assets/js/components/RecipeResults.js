export class RecipeResults {
  constructor(results) {
    this.recipes = results;
    this.render();
  }

  getIngredientsHtml(recipe) {
    let item = "";
    for (let index = 0; index < recipe.ingredients.length; index++) {
      const { ingredient, unit, quantity } = recipe.ingredients[index];
      item += `<li><strong>${ingredient}:</strong> ${quantity ?? ""} ${
        unit ?? ""
      }</li>`;
    }
    return item;
  }

  render() {
    this.recipes.forEach((recipe) => {
      const divSection = document.getElementById("sectionRecipe");
      const divElt = document.createElement("div");
      divElt.className =
        "recipe col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mt-3";

      divElt.id = recipe.id;
      const templatePage = `<div class="card h-100">
        <img src="assets/images/default-recipe-cover.svg" class="card-img-top" alt="">
        <div class="card-body row">
            <div class="col-8">
                <p>${recipe["name"]}</p>
            </div>
            <div class="col-4">
                <p class="fw-bold"><i class="far fa-clock"></i> <span>${
                  recipe["time"]
                }</span> min</p>
            </div>
            <div class="col-5">
                <ul class="fs-6 navbar-nav">
                    ${this.getIngredientsHtml(recipe)}
                </ul>
            </div>
            <div class="col-7">
                <p class="card-description">
                ${recipe["description"]}
                </p>
            </div>
        </div>
    </div>`;
    
      divSection.appendChild(divElt);
      divElt.innerHTML = templatePage;
    });
  }
}
