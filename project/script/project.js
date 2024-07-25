document.addEventListener('DOMContentLoaded', function() {
    // Toggle bar
    const hamburger = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.menu__links');

    // toggle menuLinks
    hamburger.addEventListener('click', function (){
        hamburger.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // Fetching crop data JSON data
    async function fetchData() {
        try {
            const response = await fetch('data/cropdata.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            populateCards(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            displayErrorMessage();
        }
    }

    function populateCards(data) {
        const shortTermContainer = document.getElementById('short-term');
        const longTermContainer = document.getElementById('long-term');

        shortTermContainer.innerHTML = '';
        longTermContainer.innerHTML = '';

        data.forEach(item => {
            const cardHTML = `
                <div class="card">
                    <img loading="lazy" width="250" height="250" src="./images/${item.image}" alt="${item.cropType} image">
                    <div class="card__content">
                        <div class="crop-type">${item.cropType}</div>
                        <div class="roi">ROI: ${item.roi}</div>
                        <div class="duration">Duration: ${item.maturityMonths} months</div>
                        <button class="learn-more">Learn More</button>
                    </div>
                </div>
            `;

            if (item.duration === 'short') {
                shortTermContainer.innerHTML += cardHTML;
            } else {
                longTermContainer.innerHTML += cardHTML;
            }
        });

        // Add event listeners to all "Learn More" buttons
        document.querySelectorAll('.learn-more').forEach((button, index) => {
            button.addEventListener('click', () => showModal(data[index]));
        });
    }

    function showModal(item) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <h2>${item.cropType}</h2>
            <p>${item.description}</p>
            <p>Investment Maturity: ${item.maturityMonths} months</p>
        `;
        modal.style.display = 'block';
    }

    function displayErrorMessage() {
        const container = document.querySelector('.container');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Failed to load data. Please try again later.';
        container.appendChild(errorMessage);
    }

    // Close modal when the close button is clicked
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    

    fetchData();
});


    // FORM SECTION

    document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('simple-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        storeUserData();
    });

    document.getElementById('check-weather').addEventListener('click', function() {
        const location = document.getElementById('location').value;

        if (location) {
            getWeather(location);
        } else {
            alert('Please enter a location.');
        }
    });

    async function getWeather(location) {
        const apiKey = 'beaef9bdf45d13ece1411b2df3be247c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayWeatherAdvice(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-advice').textContent = 'Failed to fetch weather data. Please try again later.';
        }
    }

    function displayWeatherAdvice(data) {
        const weatherAdvice = document.getElementById('weather-advice');
        const temp = data.main.temp - 273.15; // Convert from Kelvin to Celsius
        const weatherDescription = data.weather[0].description;
        weatherAdvice.textContent = `The current temperature is ${temp.toFixed(2)}°C with ${weatherDescription}.`;
        localStorage.setItem('weatherDescription', weatherDescription);
        localStorage.setItem('temperature', temp.toFixed(2));
    }

    function storeUserData() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('service', service);
        localStorage.setItem('location', location);

        window.location.href = 'thank.html';
    }

});


document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const service = localStorage.getItem('service');
    const location = localStorage.getItem('location');
    const weatherDescription = localStorage.getItem('weatherDescription');
    const temperature = localStorage.getItem('temperature');

    const thankyouMessage = document.getElementById('thankyou-message');
    thankyouMessage.innerHTML = `
        <p>Thank you, ${name}!</p>
        <p>We have received your request for: ${service}.</p>
        <p>We will contact you at ${email} or ${phone}.</p>
        <p>The current weather in ${location} is ${temperature}°C with ${weatherDescription}.</p>
    `;
});
