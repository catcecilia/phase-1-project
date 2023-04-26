const body = document.body;
const characterContainer = document.getElementById("mounts");

//Toggle button for CSS to light and dark mode
const toggleBtn = document.getElementById("toggle-mode-btn");
toggleBtn.addEventListener('click', () => { 
    body.classList.toggle('dark-mode');
});


//display all items in API
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
        divCard.className = "card col-6 col-sm-4 col-md-3 col-lg-2";
        name.innerText = item.name;
        divCard.appendChild(name);
        image.src=item.image;
        divCard.appendChild(image);
        description.innerText=item.description;
        divCard.appendChild(description);
        saveButton.textContent = "❤️";
        saveButton.id = item.id;
        divCard.appendChild(saveButton);
        ownedButton.textContent = "Owned";
        ownedButton.id = item.id;
        divCard.appendChild(ownedButton);
        characterContainer.appendChild(divCard);
    });
});