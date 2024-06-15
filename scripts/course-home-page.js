

// Hamburger button and Menulinks

const hamburger = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.menuLinks');

const mobileMenu = function (){
    hamburger.classList.toggle('is-active');
    menuLinks.classList.toggle('active');

}

hamburger.addEventListener('click', mobileMenu);


// Date time and Last modified
document.addEventListener("DOMContentLoaded", function() {
    const fullYear = document.querySelector("#currentyear");
    const lastModified = document.querySelector("#lastmodified");

    // Use date object
    const today = new Date();

    fullYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

    lastModified.innerHTML = `<span class="highlight">${new Intl.DateTimeFormat(
        "en-US", {
            dateStyle: "full"
        }
    ).format(today)}</span>`;
});


// Course types


document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const courseContainer = document.querySelector('.courseContainer');
    const filterButtons = document.querySelectorAll('.courseType');
    const totalCreditsElem = document.createElement('p');
    totalCreditsElem.id = 'totalCredits';
    courseContainer.parentElement.appendChild(totalCreditsElem);

    function displayCourses(filter = 'All') {
        courseContainer.innerHTML = '';
        const filteredCourses = courses.filter(course => filter === 'All' || course.subject === filter);
        
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('courses');
            if (course.completed) {
                courseDiv.classList.add('taken');
            }
            courseDiv.textContent = `${course.subject} ${course.number} `;
            courseContainer.appendChild(courseDiv);
        });

        const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
        totalCreditsElem.textContent = `Total Credits: ${totalCredits}`;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayCourses(button.textContent);
        });
    });

    displayCourses();
});

