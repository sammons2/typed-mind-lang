// Main JavaScript file for TypedMind website

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeToggle(currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggle(theme);
});

function updateThemeToggle(theme) {
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    button.classList.add('active');
    document.getElementById(`${targetTab}-tab`).classList.add('active');
  });
});

// Playground functionality
const codeEditor = document.getElementById('codeEditor');
const validateBtn = document.getElementById('validateBtn');
const validationOutput = document.getElementById('validationOutput');

validateBtn.addEventListener('click', () => {
  const code = codeEditor.value;
  const validation = validateTypedMind(code);
  displayValidationResult(validation);
});

// Auto-validate on typing (debounced)
let validateTimeout;
codeEditor.addEventListener('input', () => {
  clearTimeout(validateTimeout);
  validateTimeout = setTimeout(() => {
    const code = codeEditor.value;
    const validation = validateTypedMind(code);
    displayValidationResult(validation);
  }, 500);
});

function displayValidationResult(validation) {
  if (validation.isValid) {
    validationOutput.innerHTML = `
      <div class="validation-success">
        <span class="success-icon">✓</span>
        <span>Valid TypedMind syntax!</span>
      </div>
    `;
  } else {
    const errors = validation.errors.map(error => 
      `<div class="validation-error">• ${error}</div>`
    ).join('');
    
    validationOutput.innerHTML = `
      <div class="validation-errors">
        <strong>Validation Errors:</strong>
        ${errors}
      </div>
    `;
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed navbar
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards and example cards
document.querySelectorAll('.feature-card, .example-card, .docs-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});