
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort');
    const eventsGrid = document.getElementById('eventsGrid');
    const filterButtons = document.querySelectorAll('.filters button');
    const registerButtons = document.querySelectorAll('.event-card button');

    
   if (sortSelect && eventsGrid) {
        sortSelect.addEventListener('change', function() {
            const eventCards = Array.from(eventsGrid.querySelectorAll('.event-card'));
            const sortValue = this.value;
            
            if (sortValue === 'date-asc') {
                
                eventCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateA - dateB;
                });
            } else if (sortValue === 'date-desc') {
                
                eventCards.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                });
            }

            
            eventsGrid.innerHTML = '';
            eventCards.forEach(card => eventsGrid.appendChild(card));
        });
    }

    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            
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

    
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3').textContent;
            
            
            alert(`Thank you for your interest in "${eventTitle}"! We'll contact you soon with registration details.`);
            
            
            this.textContent = 'Interest Registered ✓';
            this.style.backgroundColor = '#22c55e';
            this.disabled = true;
        });
    });

    
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

    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    
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

    
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });

    
    const projectFilterButtons = document.querySelectorAll('.filters .filter-btn');
    
    projectFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            projectFilterButtons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#38bdf8';
            });
            
            
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


function toggleMobileMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('mobile-active');
}


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