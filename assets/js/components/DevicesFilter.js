export class DevicesFilter {
  constructor(recipes) {
    this.devices = this.getDevices(recipes);
    this.render();
    this.listeners();
  }

  getDevices(recipes) {
    let listDevice = new Set();
    for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
      listDevice.add(recipes[recipeIndex].appliance);
    }

    return Array.from(listDevice);
  }

  render() {
    this.remove();
    this.devices.forEach((device) => {
      const listSection = document.getElementById("listDevices");
      const liElt = document.createElement("li");

      liElt.textContent = device;
      liElt.style.flexBasis = "200px";

      listSection.appendChild(liElt);
    });
  }

  remove(){
    let recipeItem = document.querySelectorAll("#listDevices li");
    recipeItem.forEach((element) => {
      element.remove();
    });
  }

  listeners(){
    const inputDevices = document.getElementById('inputDevices');
    document.getElementById('devices').addEventListener('click', (e) => {
      if (inputDevices.classList.contains('d-none')){
        inputDevices.classList.remove("d-none")
      } else {
        inputDevices.classList.add("d-none")
      }
    })

    //SearchBar Tag
    const tagSection = document.getElementById('tagSection');
      

    inputDevices.addEventListener('change', (e) => {
      const tag = document.createElement('span');
      tag.className = 'badge rounded-pill bg-success me-1';
      tag.id = inputDevices.value;

      const templatePage = `${inputDevices.value} <i class="far fa-times-circle"></i>`

      tagSection.appendChild(tag)
      tag.innerHTML = templatePage;
    })
  }
}
