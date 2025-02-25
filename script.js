
import './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';



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

// Ініціалізація
updatePagination();




// fetch("https://api.privatbank.ua/p24api/exchange_rates?date=01.12.2014")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Курси валют на 01.12.2014:", data);
//   })
//   .catch(error => {
//     console.error("Помилка запиту:", error);
//   });


document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.querySelector(".burger-icon");
    const mobileMenu = document.querySelector(".mobile-menu");

    burgerIcon.addEventListener("click", function () {
        const isOpen = mobileMenu.style.display === "flex";

        if (isOpen) {
            mobileMenu.style.display = "none";
            burgerIcon.innerHTML = "&#9776;"; // ☰ (бургер)
        } else {
            mobileMenu.style.display = "flex";
            burgerIcon.innerHTML = "&times;"; // ✖ (хрестик)
        }
    });

    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !burgerIcon.contains(event.target)) {
            mobileMenu.style.display = "none";
            burgerIcon.innerHTML = "&#9776;"; // ☰ (бургер)
        }
    });
});


