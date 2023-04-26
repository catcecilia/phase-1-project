//When HTML document has been completely parsed and all deferred scripts have been downloaded and executed, add functionality for webpage
addEventListener("DOMContentLoaded", e => {
    const html = document.documentElement;
    const mountingContainer = document.getElementById("mounts");
    var form = document.getElementById("search-form");

    //Eventlistener for functionality of toggle button
    //Changing CSS styling to light and dark mode
    const toggleBtn = document.getElementById("toggle-mode-btn");
    toggleBtn.addEventListener('click', () => { 
        if (html.getAttribute('data-bs-theme') == 'dark') {
            html.setAttribute('data-bs-theme','light');
            toggleBtn.innerText = "Dark Mode";
        }
        else {
            html.setAttribute('data-bs-theme','dark');
            toggleBtn.innerText = "Light Mode";
        }
    });


    //Display all items in API to div with id "mounts"
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

            //Eventlistener for functionality of like button
            saveButton.addEventListener("click", ()=>{
                saveButton.classList.toggle('btn-danger');
                divCard.classList.toggle("liked");
            });

            ownedButton.textContent = "Owned";
            ownedButton.className = "btn"
            ownedButton.id = item.id;
            divCard.appendChild(ownedButton);

            //Eventlistener for functionality of like button
            ownedButton.addEventListener("click", ()=>{
                divCard.classList.toggle('owned');
                ownedButton.classList.toggle('btn-secondary');
            });
            mountingContainer.appendChild(divCard);
        });
    });



    //Event listener for functionality of search funciton

    form.addEventListener("submit", e => {  
        //Prevent form from reloading after submitting and obtaining search results
        e.preventDefault();

        const divs = document.querySelectorAll('.card');
        let searchTerm = document.getElementById('searching').value;
        searchTerm = searchTerm.toLowerCase(); //make search term(s) lowercase
        
        //display all potential results in case prior search was made
        const hiddenDivs = document.querySelectorAll('.hidden');
        hiddenDivs.forEach(div => {
            div.classList.toggle('hidden');
        });

        //if search term does not match card item, card item is hidden and search term is not blank
        if (searchTerm.trim() != ""){
            divs.forEach(div => {
                const headerName = div.querySelector('h2').textContent.toLowerCase();
                if (headerName.indexOf(searchTerm) == -1){
                    div.classList.toggle("hidden");
                }
        });
        }

        }
    );


    //Eventlistener for filtering search results to show only liked OR owned div cards
    const filter = document.getElementById('filter');
    filter.addEventListener('change', () => {
        const filtering = filter.value;
        console.log(filtering);
        
        const divs = document.querySelectorAll('.card');

        divs.forEach(div => {
            if(!div.classList.contains(filtering)){
                div.classList.toggle('hidden');
            }
 
        });
    })

    //Eventlistener for functionality of the easter egg: spinning video game emoji when clicked
    const spin = document.getElementById("spin");
    spin.addEventListener("click", () => {
        spin.style.animation = 'spin 2s linear';
        

        //remove animation after it is done
        setTimeout(()=>{
            spin.style.animation="none";
        }, 2000);
    });
});