export const addTag = (tagName, color) => {
    const tag = document.createElement("span");
    tag.className = `badge rounded-pill bg-${color} me-1`;
    tag.id = tagName;
    tag.dataset.name = tagName;

    const templatePage = `${tagName} <i class="far fa-times-circle"></i>`;

    document.getElementById("tagSection").appendChild(tag);
    tag.innerHTML = templatePage;
};