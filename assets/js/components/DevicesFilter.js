import {recipes} from "../data/recipes.js";
import {addTag} from "../helpers.js";

export class DevicesFilter {
    constructor() {
        this.devices = new Set();
        this.render();
        this.listeners();
    }

    getDevices(recipes) {
        let listDevice = new Set();

        recipes.map((recipe) => {
            listDevice.add(recipe.appliance.toLowerCase());
        });

        return Array.from(listDevice);
    }

    render(recipes) {
        this.remove();

        if (recipes) {
            this.devices = this.getDevices(recipes);
        }

        this.devices.forEach((device) => {
            const listSection = document.getElementById("listDevices");
            const liElt = document.createElement("li");
            liElt.dataset.name = device;

            liElt.textContent = device;
            listSection.appendChild(liElt);
        });
    }

    searchByDevices(recipes, device) {
        let results = new Set();

        // trie

        recipes.map((recipe) => {
            if (recipe.appliance.toLowerCase().indexOf(device.toLowerCase()) !== -1) {
                results.add(recipe.appliance);
            }
        });

        this.devices = Array.from(results);
        this.render();
    }

    remove() {
        let recipeItem = document.querySelectorAll("#listDevices li");
        recipeItem.forEach((element) => {
            element.remove();
        });
    }

    listeners() {
        const inputDevices = document.getElementById("devices");
        document.getElementById("btnDevices").addEventListener("click", (e) => {
                this.toggle(inputDevices);
            });

        //SearchBar Tag
        inputDevices.addEventListener("keydown", (e) => {
            if (inputDevices.value.trim().length > 1) {
                this.searchByDevices(recipes, inputDevices.value.trim());
            } else {
                this.devices = this.getDevices(recipes);
                this.render();
            }
        });

        document.getElementById("devices").addEventListener("change", () => {
            document.querySelectorAll("#listDevices li").forEach((device) => {
                device.addEventListener("click", (e) => {
                    addTag(e.target.getAttribute("data-name"), "success");
                });
            });
        });
    }

    toggle(inputDevices) {
        const label = document.getElementById("labelDevices");
        const combobox = document.getElementById("comboboxDevices");
        const list = document.getElementById("listDevices");

        if (inputDevices.classList.contains("d-none")) {
            inputDevices.classList.remove("d-none");
            label.classList.add("d-none");
            combobox.classList.add("expanded");
            list.classList.remove("d-none");
        } else {
            inputDevices.classList.add("d-none");
            label.classList.remove("d-none");
            combobox.classList.remove("expanded");
            list.classList.add("d-none");
        }

        const searchIngredient = document.getElementById("devices");
        searchIngredient.addEventListener("keyup", () => {
        });
    }
}
