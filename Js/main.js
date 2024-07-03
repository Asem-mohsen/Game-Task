
let list = document.getElementsByClassName('menu');
let defaultCategory = 'MMORPG';
fetchData(defaultCategory);
for (let i = 0; i < list.length; i++) {
    
    
    list[i].addEventListener('click' , function(e){
        var category = list[i].textContent;
        fetchData(category)
    });
}
// Add event listener to each menu item
document.querySelectorAll('.navlist .menu').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.navlist .menu').forEach(menu => menu.classList.remove('active'));

        this.classList.add('active');

    });
});

function fetchData(category) {
    // Show the loader
    document.getElementById('loader-wrapper').style.display = 'flex';

    const apiKey = '7a31cb7180mshdbbd2b3bf0fe1dep1d5e40jsn593b2192d757';
    const baseURL = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL, true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('x-rapidapi-key', '7a31cb7180mshdbbd2b3bf0fe1dep1d5e40jsn593b2192d757');
    xhttp.setRequestHeader('x-rapidapi-host', 'free-to-play-games-database.p.rapidapi.com');


    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            displayBoxes(response)
            document.getElementById('loader-wrapper').style.display = 'none';
        } else if (this.readyState == 4) {
            alert("Error fetching Games data");
            document.getElementById('loader-wrapper').style.display = 'none';
        }
    };

    xhttp.send();
}

function displayBoxes(response) {
    let boxes = document.getElementById('boxes');
    boxes.innerHTML = ''; 

    response.forEach(game => {
        let box = document.createElement('div');
        box.className = 'col-md-3 box';
        box.innerHTML = `
            <div class="img">
                <img src="${game.thumbnail}" alt="${game.title}">
            </div>
            <div class="header">
                <h3>${game.title}</h3>
                <span>Free</span>
            </div>
            <div class="descriptionDiv">
                <p class="description">${game.short_description}</p>
            </div>
            <div class="footer">
                <span>${game.genre}</span>
                <span>${game.platform}</span>
            </div>
        `;
        boxes.appendChild(box);
    });
}