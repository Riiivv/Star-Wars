// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => section.style.display = 'none');

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        activeSection.scrollIntoView({ behavior: 'smooth' });
    }
}

let allCharacters = []; // Store all characters from the API
let currentPage = 1;

// Fetch all characters from the API (handles pagination internally)
async function fetchAllCharacters() {
    let url = `https://swapi.py4e.com/api/people/`;
    try {
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            allCharacters = [...allCharacters, ...data.results]; // Append results
            url = data.next; // Update URL for the next page
        }
        renderAllCharacters();
    } catch (error) {
        console.error("Error fetching all characters:", error);
    }
}

// Render all characters
function renderAllCharacters() {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';

    allCharacters.forEach(character => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Name:</strong> ${character.name}<br>
            <strong>Height:</strong> ${character.height} cm<br>
            <strong>Birth Year:</strong> ${character.birth_year}<br>
            <strong>Gender:</strong> ${character.gender}
        `;
        characterList.appendChild(li);
    });
}

// Search characters from all loaded data
function searchCharacters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';

    filteredCharacters.forEach(character => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Name:</strong> ${character.name}<br>
            <strong>Height:</strong> ${character.height} cm<br>
            <strong>Birth Year:</strong> ${character.birth_year}<br>
            <strong>Gender:</strong> ${character.gender}
        `;
        characterList.appendChild(li);
    });
}

// Fetch all characters when the page loads
fetchAllCharacters();

let planets = []; // Store planets from the API

// Fetch planets from the API
async function fetchPlanets() {
    let url = `https://swapi.py4e.com/api/planets/`;
    try {
        while (url) {
            const response = await fetch(url);
            const data = await response.json();
            planets = [...planets, ...data.results]; // Append results
            url = data.next; // Update URL for the next page
        }
        renderPlanets(planets); // Render all planets initially
    } catch (error) {
        console.error("Error fetching planets:", error);
    }
}

// Render planets to the UI
function renderPlanets(planetsToRender) {
    const planetList = document.getElementById('planet-list');
    planetList.innerHTML = ''; // Clear previous list

    planetsToRender.forEach(planet => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Name:</strong> ${planet.name}<br>
            <strong>Population:</strong> ${planet.population === 'unknown' ? 'Unknown' : planet.population}<br>
            <strong>Climate:</strong> ${planet.climate}<br>
            <strong>Terrain:</strong> ${planet.terrain}
        `;
        planetList.appendChild(li);
    });
}

// Filter planets based on climate
function filterPlanets() {
    const climateFilter = document.getElementById('climate-filter').value;
    const filteredPlanets = climateFilter === 'all'
        ? planets
        : planets.filter(planet => planet.climate.toLowerCase().includes(climateFilter.toLowerCase()));
    renderPlanets(filteredPlanets);
}

// Fetch planets when the page loads
fetchPlanets();


// Fetch films from API
async function fetchFilms() {
    const url = "https://swapi.py4e.com/api/films/";
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFilms(data.results);
    } catch (error) {
        console.error("Error fetching films:", error);
    }
}

// Render films to the UI
function renderFilms(films) {
    const filmList = document.getElementById('film-list');
    filmList.innerHTML = ''; // Clear existing content

    films.forEach(film => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Title:</strong> ${film.title}<br>
            <strong>Release Date:</strong> ${film.release_date}<br>
            <button onclick="showModal('${film.title}', \`${film.opening_crawl}\`)">View Opening Crawl</button>
        `;
        filmList.appendChild(li);
    });
}

// Show modal with opening crawl
function showModal(title, text) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Fetch films on load
fetchFilms();


// Wait for the animation to complete
function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.addEventListener('animationend', () => {
        splashScreen.style.display = 'none';
        showSection('home'); // Show the home section after splash screen
    });

    // Ensure it hides after the animation duration (fallback for older browsers)
    setTimeout(() => {
        splashScreen.style.display = 'none';
        showSection('home');
    }, 20000); // Matches the 20s animation duration
}

// Funktion til at skjule splash screen
function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.style.display = 'none'; // Skjul splash screen
    showSection('home'); // Vis forsiden
}

// Når animationen er færdig, skjul splash screen
const intro = document.querySelector('.intro');
intro.addEventListener('animationend', () => {
    hideSplashScreen();
});
