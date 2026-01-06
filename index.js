// Events Page JavaScript
// Handles sorting and filtering of event cards

document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort');
    const eventsGrid = document.getElementById('eventsGrid');
    const filterButtons = document.querySelectorAll('.filters button');
    const registerButtons = document.querySelectorAll('.event-card button');

    // Sort events by date
    if (sortSelect && eventsGrid) {
        sortSelect.addEventListener('change', function() {
            const eventCards = Array.from(eventsGrid.querySelectorAll('.event-card'));
            const sortValue = this.value;
            
            if (sortValue === 'date-asc') {
                // Sort by date ascending (earliest first)
                eventCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateA - dateB;
                });
            } else if (sortValue === 'date-desc') {
                // Sort by date descending (latest first)
                eventCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                });
            }

            // Clear and re-append sorted cards
            eventsGrid.innerHTML = '';
            eventCards.forEach(card => eventsGrid.appendChild(card));
        });
    }

    // Filter functionality for news page
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterText = this.textContent.toLowerCase();
            const newsCards = document.querySelectorAll('.news-card');
            
            newsCards.forEach(card => {
                if (filterText === 'all news') {
                    card.style.display = 'block';
                } else {
                    const cardTag = card.querySelector('.tag').textContent.toLowerCase();
                    if (cardTag.includes(filterText) || filterText.includes(cardTag)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Register interest button functionality
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            
            // Show confirmation message
            alert(`Thank you for your interest in "${eventTitle}"! We'll contact you soon with registration details.`);
            
            // Optional: Change button state
            this.textContent = 'Interest Registered ✓';
            this.style.backgroundColor = '#22c55e';
            this.disabled = true;
        });
    });

    // Newsletter subscription
    const subscribeButton = document.querySelector('.subscribe-box button');
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const emailInput = document.querySelector('.subscribe-box input');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                alert(`Thank you for subscribing! We'll send updates to ${email}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add smooth scroll animation for event cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });

    // Filter functionality for projects page
    const projectFilterButtons = document.querySelectorAll('.filters .filter-btn');
    
    projectFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active styling from all buttons
            projectFilterButtons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#38bdf8';
            });
            
            // Add active styling to clicked button
            this.style.background = '#2a83ba';
            this.style.color = '#ffffff';
            
            const filterValue = this.textContent.toLowerCase();
            const projectCards = document.querySelectorAll('.p');
            
            projectCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                
                if (filterValue === 'all projects') {
                    card.style.display = 'block';
                } else {
                    if (cardText.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Mobile menu toggle (if you want to add hamburger menu later)
function toggleMobileMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('mobile-active');
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// CONTACT PAGE FUNCTIONALITY
// ============================================

// Contact form submission
const contactForm = document.querySelector('#secondpart3 form');
if (contactForm) {
    // Prevent default form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    // Handle send message button
    const sendButton = document.querySelector('#secondpart3 > div:last-child h3');
    if (sendButton) {
        sendButton.style.cursor = 'pointer';
        sendButton.parentElement.style.cursor = 'pointer';
        
        sendButton.parentElement.addEventListener('click', function() {
            const inputs = contactForm.querySelectorAll('input');
            let isValid = true;
            let formData = {};

            inputs.forEach(input => {
                const label = input.previousElementSibling;
                const fieldName = label ? label.textContent : 'Field';
                
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '';
                    formData[fieldName] = input.value;
                }
            });

            if (!isValid) {
                alert('Please fill in all fields');
                return;
            }

            // Validate email
            const emailInput = Array.from(inputs).find(input => {
                const label = input.previousElementSibling;
                return label && label.textContent.toLowerCase() === 'email';
            });

            if (emailInput && !validateEmail(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.style.borderColor = '#ff4444';
                return;
            }

            // Success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Clear form
            inputs.forEach(input => {
                input.value = '';
                input.style.borderColor = '';
            });
        });
    }
}

// Social media follow buttons on contact page
const socialIcons = document.querySelectorAll('#secondpart4 i');
const socialLinks = [
    'https://www.facebook.com/roboticsclub',
    'https://www.instagram.com/robotics_club_nitp',
    'https://twitter.com/roboticsclub',
    'https://www.youtube.com/@roboticsclub'
];

socialIcons.forEach((icon, index) => {
    icon.style.cursor = 'pointer';
    icon.parentElement.style.cursor = 'pointer';
    
    icon.parentElement.addEventListener('click', function() {
        if (socialLinks[index]) {
            window.open(socialLinks[index], '_blank');
        }
    });
    
    icon.parentElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    icon.parentElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// ACHIEVEMENTS PAGE FUNCTIONALITY
// ============================================

// Animate achievement cards on scroll
const achievementSections = document.querySelectorAll('#firstpart2 > div, #firstpart4 > div, #firstpart6 > div');

if (achievementSections.length > 0) {
    const achievementObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                
                achievementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    achievementSections.forEach(section => {
        achievementObserver.observe(section);
    });
}

// Timeline animation
const timelineItems = document.querySelectorAll('#firstpart7 li');

if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 50);
                }, index * 150);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Add hover effects to achievement cards
const achievementCards = document.querySelectorAll('#firstpart2 > div, #firstpart4 > div, #firstpart6 > div');

achievementCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.transition = 'transform 0.3s ease';
        this.style.boxShadow = '0 10px 30px rgba(56, 189, 248, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Read Paper links functionality (for research publications)
const readPaperLinks = document.querySelectorAll('#firstpart4 h5:last-child');

readPaperLinks.forEach(link => {
    if (link.textContent.includes('Read Paper')) {
        link.style.cursor = 'pointer';
        link.style.color = '#38bdf8';
        link.style.textDecoration = 'underline';
        
        link.addEventListener('click', function() {
            alert('Paper link will be available soon. Please contact the research team for more information.');
        });
        
        link.addEventListener('mouseenter', function() {
            this.style.color = '#0ea5e9';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '#38bdf8';
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const head = document.querySelector('.head');
    const navbar = document.getElementById('navbar');
    
    if (head && navbar) {
        // Create hamburger button
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Insert hamburger before navbar
        head.insertBefore(hamburger, navbar);
        
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('mobile-active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = navbar.querySelectorAll('.nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbar.classList.remove('mobile-active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!head.contains(e.target) && navbar.classList.contains('mobile-active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('mobile-active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

function toggleMobileMenu() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    
    if (navbar && hamburger) {
        navbar.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
