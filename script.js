
// import './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


// Пагінація
const images = document.querySelectorAll(".section5 img");
const btnBack = document.querySelector(".btn_1");
const btnNext = document.querySelector(".btn_2");
const paginationContainer = document.querySelector(".countainer__pagination");

document.querySelectorAll(".page-btn").forEach(button => {
    button.classList.remove("active");
    if (Number(button.dataset.page) === currentPage) {
        button.classList.add("active");
    }
});


let currentPage = 1;
const itemsPerPage = 4;
const totalPages = Math.ceil(images.length / itemsPerPage);

function updatePagination() {
    images.forEach((img, index) => {
        img.style.display = (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) ? "block" : "none";
    });

    btnBack.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;

    renderPageNumbers();
}

function renderPageNumbers() {
    let pagesHtml = "";
    for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `<button class="page-btn" data-page="${i}">${i}</button>`;
    }
    const existingPages = document.querySelector(".page-numbers");
    if (existingPages) existingPages.remove();
    
    const pageNumbersContainer = document.createElement("div");
    pageNumbersContainer.classList.add("page-numbers");
    pageNumbersContainer.innerHTML = pagesHtml;
    paginationContainer.insertBefore(pageNumbersContainer, btnNext);

    document.querySelectorAll(".page-btn").forEach(button => {
        button.addEventListener("click", function() {
            currentPage = Number(this.dataset.page);
            updatePagination();
        });
    });
}

btnNext.addEventListener("click", function () {
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
});

btnBack.addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
});


updatePagination();




// бургер меню

document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.querySelector(".burger-icon");
    const mobileMenu = document.querySelector(".mobile-menu");

    burgerIcon.addEventListener("click", function () {
        const isOpen = mobileMenu.style.display === "flex";

        if (isOpen) {
            mobileMenu.style.display = "none";
            burgerIcon.innerHTML = "&#9776;"; 
        } else {
            mobileMenu.style.display = "flex";
            burgerIcon.innerHTML = "&times;"; 
        }
    });

    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !burgerIcon.contains(event.target)) {
            mobileMenu.style.display = "none";
            burgerIcon.innerHTML = "&#9776;"; 
        }
    });
});



// Модальне вікно
document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var closeModal = document.getElementById("closeModal");
    var countdownElement = document.getElementById("countdown");
    var registerNow = document.getElementById("registerNow");
    var registerLater = document.getElementById("registerLater");
    var registrationForm = document.getElementById("registrationForm");
    var submitRegistration = document.getElementById("submitRegistration");

    function showModal() {
        modal.style.display = "block";
        startCountdown();
    }

    function closeModalFunction() {
        modal.style.display = "none";
    }

    closeModal.onclick = function() {
        closeModalFunction();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModalFunction();
        }
    };

    registerNow.onclick = function() {
        registrationForm.style.display = "block";
        registrationForm.style.opacity = 0;
        setTimeout(function() {
            registrationForm.style.opacity = 1;
            registrationForm.style.transition = "opacity 0.5s";
        }, 10);
    };

    registerLater.onclick = function() {
       
        closeModalFunction();
    };

    submitRegistration.onclick = function() {
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        if (name && phone) {
            alert(`You are registered! Hello ${name}!`);
            closeModalFunction();
        } else {
            alert("Please fill in all fields.");
        }
    };

    function startCountdown() {
        var timeLeft = 10 * 60; 
        var timer = setInterval(function() {
            var minutes = Math.floor(timeLeft / 60);
            var seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

            

            timeLeft--;
        }, 1000);
    }

    showModal();
});


document.getElementById('showSectionBtn').addEventListener('click', function() {
    const section = document.getElementById('imageSection');
    section.classList.add('visible');
    
    const imageContainers = document.querySelectorAll('.imagecontainer');
    
    imageContainers.forEach((container, index) => {
        setTimeout(() => {
            container.classList.add('visible');
        }, index * 500); 
    });
});

document.getElementById('closeSectionBtn').addEventListener('click', function() {
    const section = document.getElementById('imageSection');
    section.classList.remove('visible');
    
    const imageContainers = document.querySelectorAll('.imagecontainer');
    imageContainers.forEach(container => {
        container.classList.remove('visible');
    });
});





    // Наші клієнти

const userList = document.getElementById("user-list");

fetch("https://randomuser.me/api/?results=20")
    .then(response => response.json())
    .then(data => {
        data.results.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            const userImage = document.createElement("img");
            userImage.src = user.picture.large;
            userImage.alt = `${user.name.first} ${user.name.last}`;

            const userName = document.createElement("p");
            userName.textContent = `${user.name.first} ${user.name.last}`;

            userCard.appendChild(userImage);
            userCard.appendChild(userName);
            userList.appendChild(userCard);
        });
    })
    .catch(error => {
        console.error("Помилка при отриманні даних:", error);
    });







        // Курс валют

        const getRateUsd = document.getElementById("get-rate-usd");

        getRateUsd.addEventListener("click", () => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json")
                .then(response => response.json())
                .then(data => {
                    const rateInfo = document.getElementById("rate-info-usd");
                    if (data.length > 0) {
                        rateInfo.textContent = `1 USD = ${data[0].rate} UAH (на ${data[0].exchangedate})`;
                        rateInfo.className = "rate_inform";
                    } else {
                        rateInfo.textContent = "Не вдалося отримати курс валют";
                    }
                })
                .catch(error => {
                    console.error("Помилка при отриманні даних:", error);
                });
        });
        
        const getRateEur = document.getElementById("get-rate-eur");
        
        getRateEur.addEventListener("click", () => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json")
                .then(response => response.json())
                .then(data => {
                    const rateInfoEur = document.getElementById("rate-info-eur");
                    if (data.length > 0) {
                        rateInfoEur.textContent = `1 EUR = ${data[0].rate} UAH (на ${data[0].exchangedate})`;
                        rateInfoEur.className = "rate_info_eur";
                    } else {
                        rateInfoEur.textContent = "Не вдалося отримати курс валют";
                    }
                })
                .catch(error => {
                    console.error("Помилка при отриманні даних:", error);
                });
        });
        
        const getRateChf = document.getElementById("get-rate-chf");
        
        getRateChf.addEventListener("click", () => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=CHF&json")
                .then(response => response.json())
                .then(data => {
                    const rateInfoChf = document.getElementById("rate-info-chf");
                    if (data.length > 0) {
                        rateInfoChf.textContent = `1 CHF = ${data[0].rate} UAH (на ${data[0].exchangedate})`;
                        rateInfoChf.className = "rate_info_chf";
                    } else {
                        rateInfoChf.textContent = "Не вдалося отримати курс валют";
                    }
                })
                .catch(error => {
                    console.error("Помилка при отриманні даних:", error);
                });
        });
        

        // Таймер

        function updateCountdown() {
            const targetDate = new Date("March 29, 2025 00:00:00").getTime();
            const now = new Date().getTime();
            const time = targetDate - now;
        
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((time % (1000 * 60)) / 1000);
        
            document.querySelector('[data-value="days"]').textContent = days;
            document.querySelector('[data-value="hours"]').textContent = hours.toString().padStart(2, '0');
            document.querySelector('[data-value="mins"]').textContent = mins.toString().padStart(2, '0');
            document.querySelector('[data-value="secs"]').textContent = secs.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);       