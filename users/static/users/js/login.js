// Login Page JavaScript

// DOM Elements
const loginForm = document.getElementById('loginForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const emailUsernameInput = document.getElementById('emailUsername');
const rememberMeCheckbox = document.getElementById('rememberMe');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Current slide index
let currentSlide = 0;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggle();
    initializeSlideshow();
    initializeFormValidation();
    initializeOAuthButtons();
    loadRememberedCredentials();
    animateForm();
});

// Animate form elements on load
function animateForm() {
    const formElements = document.querySelectorAll('.floating-input, .form-options, .auth-btn, .oauth-buttons, .auth-footer');
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
function initializePasswordToggle() {
    togglePassword.addEventListener('click', () => {
        togglePasswordVisibility(passwordInput, togglePassword);
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

// Remember Me Functionality
function loadRememberedCredentials() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailUsernameInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
}

function saveCredentials(email) {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
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
    loginForm.addEventListener('submit', handleFormSubmit);
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(input.id) {
        case 'emailUsername':
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Please enter your email or username';
            }
            break;

        case 'password':
            if (value.length < 6) {
                isValid = false;
                errorMessage = 'Password must be at least 6 characters';
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
    const inputs = loginForm.querySelectorAll('.floating-input input');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showMessage('Please fix the errors before submitting', 'error');
        return;
    }

    // Collect form data
    const formData = {
        emailUsername: emailUsernameInput.value.trim(),
        password: passwordInput.value,
        rememberMe: rememberMeCheckbox.checked
    };

    // Submit login
    submitLogin(formData);
}

function submitLogin(data) {
    const submitButton = loginForm.querySelector('.auth-btn.primary');
    const originalContent = submitButton.innerHTML;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.innerHTML = '<i class="fas fa-spinner"></i><span>Signing In...</span>';

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.classList.remove('loading');
        submitButton.innerHTML = originalContent;

        // For demo purposes, we'll assume login is successful
        // In production, you would check the API response
        const loginSuccessful = true; // Replace with actual API response check

        if (loginSuccessful) {
            // Save credentials if remember me is checked
            saveCredentials(data.emailUsername);

            // Show success message
            showMessage('Login successful! Redirecting...', 'success');

            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Show error message
            showMessage('Invalid email/username or password', 'error');
        }
    }, 1500);
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
        
        // For demo, redirect to dashboard
        window.location.href = 'index.html';
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
    loginForm.parentNode.insertBefore(message, loginForm);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

// Enter key support
emailUsernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        passwordInput.focus();
    }
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Forgot Password Link
document.querySelector('.auth-link[href="#"]').addEventListener('click', (e) => {
    if (e.target.textContent === 'Forgot Password?') {
        e.preventDefault();
        showMessage('Password reset functionality coming soon!', 'success');
    }
});

console.log('Login page initialized');