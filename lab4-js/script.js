// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});
// smooth form scroll
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        let isValid = true;
        
        if (!name) {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!subject) {
            showError('subject', 'Please enter a subject');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Please enter your message');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message should be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show personalized success message
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>We've received your message about "${subject}" and will respond to you at ${email} within 24 hours.</p>
                <p>Here's what you sent us:</p>
                <blockquote>${message}</blockquote>
            `;
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            contactForm.reset();
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444';
    errorElement.style.marginTop = '5px';
    errorElement.style.fontSize = '0.9rem';
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = '#ff4444';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// used system preference
const currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});
// Load Team Members
document.getElementById('loadUsersBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('loadUsersBtn');
    const userList = document.getElementById('userList');
    
    btn.disabled = true;
    btn.textContent = 'Loading...';
    userList.innerHTML = '<div class="loading"></div>';
    
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const users = await res.json();
        
        userList.innerHTML = '';
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.company.name}</p>
                <p>${user.address.city}</p>
            `;
            userList.appendChild(card);
        });
    } catch (err) {
        userList.innerHTML = `<p class="error">${err.message}. Please try again later.</p>`;
        console.error('Failed to load users:', err);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Load Team Members';
    }
});

document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.classList.toggle('visible');
    });
});
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});