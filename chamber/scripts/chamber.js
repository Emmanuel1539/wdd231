


 document.addEventListener('DOMContentLoaded', () => {



    const membersContainer = document.getElementById('membersContainer');
    const gridViewButton = document.getElementById('gridView');
    const listViewButton = document.getElementById('listView');
    const hamburger = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.menu__links');

    // toggle menulinks
    hamburger.addEventListener('click', function (){
        hamburger.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
    
    // Fetch and display members
    async function fetchMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Display members in the container
    function displayMembers(members) {
        membersContainer.innerHTML = '';
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('memberCard');
            memberCard.innerHTML = `
                <img loading = 'lazy' width= 250 height= "250" src="./images/${member.image}" alt="${member.imageDesc}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membership}</p>
                <p>${member.description}</p>
            `;
            membersContainer.appendChild(memberCard);
        });
    }

    // Toggle between grid and list views
    gridViewButton.addEventListener('click', () => {
        membersContainer.classList.add('grid');
        membersContainer.classList.remove('list');
        gridViewButton.style.backgroundColor = '#ffffff';
        gridViewButton.style.color = 'var(--accent2)';
        listViewButton.style.backgroundColor = 'var(--primary)';
        listViewButton.style.color = '#ffffff';
    });

    listViewButton.addEventListener('click', () => {
        membersContainer.classList.add('list');
        membersContainer.classList.remove('grid');
        listViewButton.style.backgroundColor = '#ffffff';
        listViewButton.style.color = 'var(--accent2)';
        gridViewButton.style.backgroundColor = 'var(--primary)';
        gridViewButton.style.color = '#ffffff';
    })


    // Fetch and display members on page load
    fetchMembers();



    // Date time and Last modified
    const fullYear = document.querySelector("#currentyear");
    const lastModified = document.querySelector("#lastmodified");

    const today = new Date();
    fullYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;
    lastModified.innerHTML = `<span class="highlight">${new Intl.DateTimeFormat("en-US", {
        dateStyle: "full"
    }).format(today)}</span>`;

});


document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    loadBusinessSpotlights();
    updateCurrentYear();
});

async function fetchWeatherData() {
    const apiKey = 'beaef9bdf45d13ece1411b2df3be247c';
    const location = 'Lagos';  
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(weatherData);
        displayWeatherForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('currentWeather');
    const temperature = Math.round(data.main.temp);
    const weatherDescriptions = data.weather.map(event => capitalizeWords(event.description)).join(', ');

    currentWeatherContainer.innerHTML = `
        <div class="info__wrapper emoji__weather">
            <div class="current__weather__emoji">🌡️</div>
            <div class="current__weather__info">
                <p><span class="temp bold">${temperature}°F</span></p>
                <p>${weatherDescriptions}</p>
                <p>High: ${Math.round(data.main.temp_max)}°F</p>
                <p>Low: ${Math.round(data.main.temp_min)}°F</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        </div>
    `;
}

function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('weatherForecast');
    const forecastDays = data.list.filter((entry, index) => index % 8 === 0).slice(0, 3);

    forecastContainer.innerHTML = forecastDays.map(day => `
        <p>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}: <span class="bold">${Math.round(day.main.temp)}°F</span></p>
    `).join('');
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function loadBusinessSpotlights() {
    const businessSpotlightContainer = document.getElementById('businessSpotlight');
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const eligibleMembers = data.filter(member => member.membership === 1 || member.membership === 2);
            const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            businessSpotlightContainer.innerHTML = randomMembers.map(member => `
                <div class="business__card">
                    <div class="business__card__name">
                        <h3>${member.name}</h3>
                        <p>...${member.description}</p>
                    </div>
                    <div class="business__card__info">
                        <div class="card__img">
                            <img src="/chamber/images/${member.image}" alt="${member.imageDesc}">
                        </div>
                        <div class="card__info">
                            <p><span class="bold">Email:</span> ${member.address}</p>
                            <p><span class="bold">Phone:</span> ${member.phone}</p>
                            <p><span class="bold">URL:</span> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading business spotlights:', error));
}

function updateCurrentYear() {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastmodified').textContent = document.lastModified;
}
