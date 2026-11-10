const modal = document.querySelector("#project-modal");
const openButtons = document.querySelectorAll("[data-modal-open]");
const closeButton = document.querySelector("[data-modal-close]");
const projectForm = document.querySelector(".project-form");
const formMessage = document.querySelector(".form-message");
const nameInput = document.querySelector("#project-name");
const emailInput = document.querySelector("#project-email");
const detailsInput = document.querySelector("#project-details");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const websiteTypeSelect = document.querySelector("#website-type");
const pageCountSelect = document.querySelector("#page-count");
const aiFeatureSelect = document.querySelector("#ai-feature");
const estimatedPrice = document.querySelector("#estimated-price");

const websiteBasePrices = {
    business: 1500,
    landing: 900,
    prototype: 2500
};

function updateEstimatedPrice() {
    const basePrice = websiteBasePrices[websiteTypeSelect.value];
    const pagesPrice = Number(pageCountSelect.value) * 150;
    const aiPrice = aiFeatureSelect.value === "yes" ? 600 : 0;
    const totalPrice = basePrice + pagesPrice + aiPrice;

    estimatedPrice.textContent = `$${totalPrice.toLocaleString("en-US")}`;
}

[websiteTypeSelect, pageCountSelect, aiFeatureSelect].forEach(function (select) {
    select.addEventListener("change", updateEstimatedPrice);
});

updateEstimatedPrice();

let previousFocus;

function openModal() {
    previousFocus = document.activeElement;
    formMessage.textContent = "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    nameInput.focus();
}

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previousFocus) {
        previousFocus.focus();
    }
}

openButtons.forEach(function (button) {
    button.addEventListener("click", openModal);
});

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
    }
});

projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const request = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        details: detailsInput.value.trim()
    };

    if (!request.name && !request.email) {
        formMessage.textContent = "Please enter your name and email.";
        nameInput.focus();
        return;
    }

    if (!request.name) {
        formMessage.textContent = "Please enter your name.";
        nameInput.focus();
        return;
    }

    if (!request.email) {
        formMessage.textContent = "Please enter your email.";
        emailInput.focus();
        return;
    }

    if (!emailPattern.test(request.email)) {
        formMessage.textContent = "Please enter a valid email address.";
        emailInput.focus();
        return;
    }

    if (request.details.length < 10) {
        formMessage.textContent = "Please add at least 10 characters to Project Details.";
        detailsInput.focus();
        return;
    }

    formMessage.textContent = `Thanks, ${request.name}! Your request has been recorded.`;
    projectForm.reset();
});
