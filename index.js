const html = document.documentElement;
const mountingContainer = document.getElementById("mounts");

//Toggle button for CSS to light and dark mode
const toggleBtn = document.getElementById("toggle-mode-btn");
toggleBtn.addEventListener('click', () => { 
    if (html.getAttribute('data-bs-theme') == 'dark') {
        html.setAttribute('data-bs-theme','light');
    }
    else {
        html.setAttribute('data-bs-theme','dark');
    }
});


//display all items in API to div with id "mounts"
fetch("https://ffxivcollect.com/api/mounts")
.then(res => res.json())
.then(objects => {
    const arr = Array.from(objects.results);
    arr.forEach(item => {
        const divCard = document.createElement("div");
        const name = document.createElement("h2");
        const description = document.createElement("p");
        const image = document.createElement("img");
        const saveButton = document.createElement("button");
        const ownedButton = document.createElement("button");
        divCard.className = "card";
        name.innerText = item.name;
        divCard.appendChild(name);
        image.src=item.image;
        divCard.appendChild(image);
        description.innerText=item.description;
        divCard.appendChild(description);
        saveButton.textContent = "❤️";
        saveButton.id = item.id;
        saveButton.className = "btn btn-outline-danger";
        divCard.appendChild(saveButton);
        ownedButton.textContent = "Owned";
        ownedButton.className = "btn"
        ownedButton.id = item.id;
        divCard.appendChild(ownedButton);
        mountingContainer.appendChild(divCard);
    });
});