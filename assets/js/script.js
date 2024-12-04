'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);




/**
 * Form validation logic
 */

const contactForm = document.getElementById('contactForm');
const inputs = {
  namn: document.getElementById('namn'),
  epost: document.getElementById('epost'),
  phone: document.getElementById('phone'),
  meddelande: document.getElementById('meddelande')
};
const errors = {
  namn: document.getElementById('namn-error'),
  epost: document.getElementById('epost-error'),
  phone: document.getElementById('phone-error'),
  meddelande: document.getElementById('meddelande-error')
};
const successMessage = document.getElementById('success-message');

// Validation rules
const validateName = (value) => value.trim() !== '';
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validatePhone = (value) => /^\+?[0-9\s-]{7,15}$/.test(value);
const validateMessage = (value) => value.trim() !== '';

// Error messages
const errorMessages = {
  namn: 'Namnet är obligatoriskt.',
  epost: 'Ogiltig e-postadress.',
  phone: 'Ogiltigt telefonnummer.',
  meddelande: 'Meddelande är obligatoriskt.'
};

// Validate individual field
const validateField = (field, value) => {
  let isValid;
  switch (field) {
    case 'namn':
      isValid = validateName(value);
      break;
    case 'epost':
      isValid = validateEmail(value);
      break;
    case 'phone':
      isValid = validatePhone(value);
      break;
    case 'meddelande':
      isValid = validateMessage(value);
      break;
  }
  if (!isValid) {
    errors[field].textContent = errorMessages[field];
    errors[field].classList.add('active');
  } else {
    errors[field].textContent = '';
    errors[field].classList.remove('active');
  }
  return isValid;
};

// Clear form inputs
const clearFormInputs = () => {
  for (const field in inputs) {
    inputs[field].value = '';
  }
};

// Form submission event
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isFormValid = true;

  for (const field in inputs) {
    const isValid = validateField(field, inputs[field].value);
    if (!isValid) isFormValid = false;
  }

  if (isFormValid) {
    // Show success message
    successMessage.textContent = 'Tack för kontakt vi ska svara dig snart!';
    successMessage.classList.add('active');

    // Clear the form inputs
    clearFormInputs();

    // Optionally hide the message after some time
    setTimeout(() => {
      successMessage.classList.remove('active');
    }, 5000); // Hides message after 5 seconds
  }
});

// Real-time validation
for (const field in inputs) {
  inputs[field].addEventListener('input', () => {
    validateField(field, inputs[field].value);
  });
}


// Set current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;
