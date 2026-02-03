// ==============================
// Navigation : menu mobile
// ==============================
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// ==============================
// Réservation : validation & UX
// ==============================
const reservationForm = document.getElementById('reservation-form');
const reservationSuccess = document.getElementById('reservation-success');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldConfig = {
    'full-name': {
        errorId: 'error-full-name',
        validate: (value) => value.trim().length > 1
    },
    email: {
        errorId: 'error-email',
        validate: (value) => emailRegex.test(value.trim())
    },
    phone: {
        errorId: 'error-phone',
        validate: (value) => value.trim().length > 5
    },
    guests: {
        errorId: 'error-guests',
        validate: (value) => Number(value) > 0
    },
    arrival: {
        errorId: 'error-arrival',
        validate: (value) => value.trim().length > 0
    }
};

const setFieldState = (field, isValid) => {
    const errorMessage = document.getElementById(fieldConfig[field.id].errorId);
    if (!errorMessage) {
        return;
    }
    errorMessage.classList.toggle('hidden', isValid);
    field.setAttribute('aria-invalid', (!isValid).toString());
};

const validateField = (field) => {
    const config = fieldConfig[field.id];
    if (!config) {
        return true;
    }
    const isValid = config.validate(field.value);
    setFieldState(field, isValid);
    return isValid;
};

const validateForm = () => {
    return Object.keys(fieldConfig).every((fieldId) => {
        const field = document.getElementById(fieldId);
        return field ? validateField(field) : true;
    });
};

const attachValidationListeners = () => {
    Object.keys(fieldConfig).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field) {
            return;
        }
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });
};

function handleReservation(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    if (!reservationForm || !reservationSuccess) {
        return;
    }

    reservationForm.style.opacity = '0';
    setTimeout(() => {
        reservationForm.classList.add('hidden-section');
        reservationSuccess.classList.remove('hidden-section');
        reservationSuccess.style.opacity = '0';

        document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            reservationSuccess.style.transition = 'opacity 0.5s';
            reservationSuccess.style.opacity = '1';
        }, 50);
    }, 300);
}

function resetForm() {
    if (!reservationForm || !reservationSuccess) {
        return;
    }
    reservationForm.reset();
    reservationSuccess.classList.add('hidden-section');
    reservationForm.classList.remove('hidden-section');
    Object.keys(fieldConfig).forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (field) {
            setFieldState(field, true);
        }
    });
    setTimeout(() => {
        reservationForm.style.transition = 'opacity 0.5s';
        reservationForm.style.opacity = '1';
    }, 50);
}

// ==============================
// Bouton retour en haut
// ==============================
const backToTopButton = document.getElementById('back-to-top');

const toggleBackToTop = () => {
    if (!backToTopButton) {
        return;
    }
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
        backToTopButton.classList.add('flex');
    } else {
        backToTopButton.classList.add('hidden');
        backToTopButton.classList.remove('flex');
    }
};

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==============================
// Modales légales
// ==============================
const modalTriggers = document.querySelectorAll('[data-modal-target]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden-section');
    }
};

const closeModal = (modal) => {
    if (modal) {
        modal.classList.add('hidden-section');
    }
};

modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalTarget));
});

modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => closeModal(button.closest('[role="dialog"]')));
});

window.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-modal-overlay')) {
        closeModal(event.target.closest('[role="dialog"]'));
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('[role="dialog"]').forEach((modal) => closeModal(modal));
    }
});

// ==============================
// Bannière cookies
// ==============================
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptButton = document.getElementById('accept-cookies');

const cookieKey = 'lacantine-cookies-accepted';

const hideCookieBanner = () => {
    if (cookieBanner) {
        cookieBanner.classList.add('hidden-section');
    }
};

if (cookieAcceptButton) {
    cookieAcceptButton.addEventListener('click', () => {
        localStorage.setItem(cookieKey, 'true');
        hideCookieBanner();
    });
}

if (localStorage.getItem(cookieKey) === 'true') {
    hideCookieBanner();
}

// ==============================
// Initialisation
// ==============================
attachValidationListeners();
window.addEventListener('scroll', toggleBackToTop);
window.addEventListener('load', toggleBackToTop);
