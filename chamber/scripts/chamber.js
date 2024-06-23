


const hamburger = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.menu__links');

hamburger.addEventListener('click', function (){
    hamburger.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


 // Date time and Last modified
 const fullYear = document.querySelector("#currentyear");
 const lastModified = document.querySelector("#lastmodified");

 const today = new Date();
 fullYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;
 lastModified.innerHTML = `<span class="highlight">${new Intl.DateTimeFormat("en-US", {
     dateStyle: "full"
 }).format(today)}</span>`;


 document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('membersContainer');
    const toggleViewButton = document.getElementById('toggleView');
    const copyrightYear = document.getElementById('copyrightYear');
    const lastModified = document.getElementById('lastModified');

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
                <img src="./images/${member.image}" alt="${member.name}">
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
    toggleViewButton.addEventListener('click', () => {
        membersContainer.classList.toggle('grid');
        membersContainer.classList.toggle('list');
    });


    // Fetch and display members on page load
    fetchMembers();
});


