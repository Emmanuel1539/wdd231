


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
    const apiKey = 'beaef9bdf45d13ece1411b2df3be247c';
    const lat = 'LATITUDE'; // Replace with actual latitude
    const lon = 'LONGITUDE'; // Replace with actual longitude
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    // Fetch weather data
    async function fetchWeatherData() {
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            displayCurrentWeather(data.current);
            displayForecast(data.daily);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Display current weather
    function displayCurrentWeather(current) {
        const weatherDescription = current.weather.map(w => capitalizeWords(w.description)).join(', ');
        const temperature = Math.round(current.temp);

        document.getElementById('current-weather').innerHTML = `
            <div class="info__wrapper emoji__weather">
                <div class="current__weather__emoji">🌤️</div>
                <div class="current__weather__info">
                    <p><span class="temp">${temperature}°C</span></p>
                    <p>${weatherDescription}</p>
                    <p>High: ${Math.round(current.temp_max)}°</p>
                    <p>Low: ${Math.round(current.temp_min)}°</p>
                    <p>Humidity: ${current.humidity}%</p>
                    <p>Sunrise: ${new Date(current.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: ${new Date(current.sunset * 1000).toLocaleTimeString()}</p>
                </div>
            </div>
        `;
    }

    // Display 3-day forecast
    function displayForecast(daily) {
        let forecastHtml = '';
        for (let i = 1; i <= 3; i++) {
            const day = daily[i];
            const date = new Date(day.dt * 1000).toLocaleDateString();
            const temp = Math.round(day.temp.day);
            forecastHtml += `<p>${date}: <span class="bold">${temp}°C</span></p>`;
        }
        document.getElementById('forecast').innerHTML = forecastHtml;
    }

    // Capitalize each word in a string
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Fetch and display chamber members
    async function fetchMembers() {
        try {
            const response = await fetch('members.json');
            const members = await response.json();
            const goldSilverMembers = members.filter(member => member.membership === 'gold' || member.membership === 'silver');
            displayRandomMembers(goldSilverMembers);
        } catch (error) {
            console.error('Error fetching members data:', error);
        }
    }

    // Display random members
    function displayRandomMembers(members) {
        shuffleArray(members);
        const selectedMembers = members.slice(0, 3);
        let membersHtml = '';
        selectedMembers.forEach(member => {
            membersHtml += `
                <div class="business__card">
                    <div class="business__card__name">
                        <h3>${member.name}</h3>
                        <p>...${member.tagline}</p>
                    </div>
                    <div class="business__card__info">
                        <div class="card__img">
                            <img src="${member.image}" alt="">
                        </div>
                        <div class="card__info">
                            <p><span class="bold">Email:</span> ${member.email}</p>
                            <p><span class="bold">Phone:</span> ${member.phone}</p>
                            <p><span class="bold">URL:</span> ${member.url}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('company-spotlights').innerHTML = membersHtml;
    }

    // Shuffle array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initialize the page
    function init() {
        fetchWeatherData();
        fetchMembers();
    }

    init();
});
