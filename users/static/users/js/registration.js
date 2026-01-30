// Registration Page JavaScript

// DOM Elements
const registerForm = document.getElementById('registerForm');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Current slide index
let currentSlide = 0;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggles();
    initializeSlideshow();
    initializeFormValidation();
    initializeOAuthButtons();
    animateForm();
});

// Animate form elements on load
function animateForm() {
    const formElements = document.querySelectorAll('.floating-input, .checkbox-container, .auth-btn, .oauth-buttons, .auth-footer');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Password Toggle Functionality
function initializePasswordToggles() {
    togglePassword.addEventListener('click', () => {
        togglePasswordVisibility(passwordInput, togglePassword);
    });

    toggleConfirmPassword.addEventListener('click', () => {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
    });
}

function togglePasswordVisibility(input, toggleIcon) {
    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        toggleIcon.classList.add('active');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        toggleIcon.classList.remove('active');
    }
}

// Slideshow Functionality
function initializeSlideshow() {
    // Auto-advance slides
    startSlideshow();

    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            goToSlide(slideIndex);
            resetSlideshow();
        });
    });
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000); // Change slide every 5 seconds
}

function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Form Validation
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.floating-input input');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        input.addEventListener('input', () => {
            clearInputError(input);
        });
    });

    // Form submission
    registerForm.addEventListener('submit', handleFormSubmit);
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(input.id) {
        case 'firstName':
        case 'lastName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Must be at least 2 characters';
            }
            break;

        case 'username':
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Username must be at least 3 characters';
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Username can only contain letters, numbers, and underscores';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'password':
            if (value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                isValid = false;
                errorMessage = 'Password must contain uppercase, lowercase, and number';
            }
            break;

        case 'confirmPassword':
            if (value !== passwordInput.value) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
            break;
    }

    if (!isValid) {
        showInputError(input, errorMessage);
    } else {
        clearInputError(input);
    }

    return isValid;
}

function showInputError(input, message) {
    const container = input.closest('.floating-input');
    let errorElement = container.querySelector('.input-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        container.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.style.borderColor = '#ef4444';
    
    // Add error styling
    if (!errorElement.style.cssText) {
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.35rem;
            display: block;
        `;
    }
}

function clearInputError(input) {
    const container = input.closest('.floating-input');
    const errorElement = container.querySelector('.input-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '';
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all inputs
    const inputs = registerForm.querySelectorAll('.floating-input input');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    // Check terms acceptance
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showMessage('Please accept the Terms and Conditions', 'error');
        isFormValid = false;
        return;
    }

    if (!isFormValid) {
        showMessage('Please fix the errors before submitting', 'error');
        return;
    }

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
    };

    // Submit registration
    submitRegistration(formData);
}

function submitRegistration(data) {
    const submitButton = registerForm.querySelector('.auth-btn.primary');
    const originalContent = submitButton.innerHTML;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.innerHTML = '<i class="fas fa-spinner"></i><span>Creating Account...</span>';

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.innerHTML = originalContent;

        // Show success message
        showMessage('Account created successfully! Redirecting...', 'success');

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// OAuth Buttons
function initializeOAuthButtons() {
    const googleBtn = document.querySelector('.oauth-btn.google');
    const githubBtn = document.querySelector('.oauth-btn.github');

    googleBtn.addEventListener('click', () => {
        handleOAuthLogin('Google');
    });

    githubBtn.addEventListener('click', () => {
        handleOAuthLogin('GitHub');
    });
}

function handleOAuthLogin(provider) {
    showMessage(`Redirecting to ${provider} login...`, 'success');
    
    // Simulate OAuth redirect
    setTimeout(() => {
        console.log(`OAuth login with ${provider}`);
        // In production, this would redirect to OAuth provider
        // window.location.href = `oauth-url-for-${provider}`;
    }, 1500);
}

// Message Display
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type} show`;
    message.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        <span>${text}</span>
    `;

    // Insert before form
    registerForm.parentNode.insertBefore(message, registerForm);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

// Password strength indicator (optional enhancement)
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    // You can add a visual indicator here if desired
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

console.log('Registration page initialized');