const body = document.body;


const toggleBtn = document.getElementById("toggle-mode-btn");
toggleBtn.addEventListener('click', () => { 
    body.classList.toggle('dark-mode');
});