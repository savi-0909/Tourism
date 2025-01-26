// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const destinationList = document.getElementById('destination-list');
    const favoriteList = document.getElementById('favorite-list');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const apiKey = '56f038fb043b07f59aa7597c41cf8b15'; // Replace with your real API key
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;


    let destinations = [
        { id: 1, name: 'Paris', description: 'The city of light.', weather: 'Cloudy with a temperature of around 17°C (63°F)', image: 'pexels-pixabay-532826.jpg' },
        { id: 2, name: 'New York', description: 'The city that never sleeps.', weather: 'Clear skies with a temperature of approximately 24°C (75°F)', image: 'pexels-mikel-1239162.jpg' },
        { id: 3, name: 'Tokyo', description: 'A bustling metropolis.', weather: 'Partly cloudy with a temperature of 28°C (82°F)', image: 'pexels-agk42-2599247.jpg' },
        { id: 4, name: 'Sydney', description: 'Home to the Sydney Opera House.', weather: 'Mostly sunny with a temperature of about 20°C (68°F)​ ', image: 'pexels-belle-co-99483-783683.jpg' },
        { id: 5, name: 'Rio de Janeiro', description: 'Famous for its carnival.', weather: ' Mostly sunny with a temperature around 29°C (84°F)', image: 'pexels-vinipimenta-311620.jpg' },
        { id: 6, name: 'Cairo', description: 'The city of a thousand minarets.', weather: 'Sunny with a temperature of 34°C (93°F)', image: 'pexels-omarelsharaawy-5609738.jpg' },
        { id: 7, name: 'London', description: 'The capital of England.', weather: 'Sunny with a temperature of around 13°C (55°F) .', image: 'pexels-pixabay-460672.jpg' },
        { id: 8, name: 'Rome', description: 'The Eternal City.', weather: ' Mostly sunny with a temperature of 24°C (75°F)', image: 'pexels-julius-silver-240301-753639.jpg' },
        { id: 9, name: 'Bangkok', description: 'The city of angels.', weather: 'Partly cloudy with a temperature of about 31°C (88°F)​ ', image: 'pexels-freestockpro-1031669.jpg' },
        { id: 10, name: 'Cape Town', description: 'The Mother City.', weather: 'Cloudy with a temperature of 17°C (63°F) .', image: 'pexels-pixabay-259447.jpg' },
    ];

    searchBar.addEventListener('input', () => {  
        const query = searchBar.value.toLowerCase();
        const filteredDestinations = destinations.filter(dest => dest.name.toLowerCase().includes(query));
        displayDestinations(filteredDestinations);
    });

    function displayDestinations(destinations) {
        destinationList.innerHTML = '';
        destinations.forEach(destination => {
            const div = document.createElement('div');
            div.classList.add('destination-card');
            div.innerHTML = `
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <img src="${destination.image}" alt="${destination.name}" class="destination-image">
                <p class="weather-info"><b>Weather: </b>${destination.weather}</p>
                <button onclick="viewDetails(${destination.id})">View Details</button>
                <button onclick="addToFavorites(${destination.id})">Add to Favorites</button>
            `;
            destinationList.appendChild(div);
        });
    }

    window.viewDetails = function(id) {
        const destination = destinations.find(dest => dest.id === id);
        modalContent.innerHTML = `
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <img src="${destination.image}" alt="${destination.name}" class="modal-image">
            <p class="weather-info">Weather: ${destination.weather}</p>
            `;
        modal.style.display = "block";
    }

    window.addToFavorites = function(id) {
        const destination = destinations.find(dest => dest.id === id);
        const li = document.createElement('li');
        li.classList.add('favorite');
        li.innerHTML = `${destination.name} <button onclick="removeFromFavorites(this)">Remove</button>`;
        favoriteList.appendChild(li);
    }

    window.removeFromFavorites = function(button) {
        button.parentElement.remove();
    }

   async function fetchWeather(destination) {
        try {
            const response = await fetch(url + `&appid=${apiKey}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            destination.weather = 'Weather data unavailable';
        }
    }
    fetchWeather();

    async function initialize() {
        for (let destination of destinations) {
            await fetchWeather(destination);
        }
        displayDestinations(destinations);
    }

    initialize();

    closeButton.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});



