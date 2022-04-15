export class RecipeResults {
    constructor(results) {
        this.recipes = results;
        this.render();
    }

    getIngredientsHtml(recipe) {
        let item = "";
        for (let index = 0; index < recipe.ingredients.length; index++) {
            const {ingredient, unit, quantity} = recipe.ingredients[index];
            item += `<li><strong>${ingredient}:</strong> ${quantity ?? ""} ${
                unit ?? ""
            }</li>`;
        }
        return item;
    }

    render() {
        for (let index = 0; index < this.recipes.length; index++) {
            const divSection = document.getElementById("sectionRecipe");
            const divElt = document.createElement("div");
            divElt.className =
                "recipe col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 mt-3";

            divElt.id = this.recipes[index].id;
            const templatePage = `<div class="card h-100">
        <img src="assets/images/default-recipe-cover.svg" class="card-img-top" alt="">
        <div class="card-body row">
            <div class="col-8">
                <p>${this.recipes[index]["name"]}</p>
            </div>
            <div class="col-4">
                <p class="fw-bold"><i class="far fa-clock"></i> <span>${
                this.recipes[index]["time"]
            }</span> min</p>
            </div>
            <div class="col-5">
                <ul class="fs-6 navbar-nav">
                    ${this.getIngredientsHtml(this.recipes[index])}
                </ul>
            </div>
            <div class="col-7">
                <p class="card-description">
                ${this.recipes[index]["description"]}
                </p>
            </div>
        </div>
    </div>`;

            divSection.appendChild(divElt);
            divElt.innerHTML = templatePage;
        }
    }
}
