// Typewriter effect
const typewriter = document.querySelector('.typewriter');
const words = ['Developer', 'Designer', 'Professional']; // Update with client's roles
let wordIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        typewriter.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriter.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

// Start the typewriter effect
setTimeout(type, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('DOMContentLoaded', function() {
    // Skill tabs functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillContents = document.querySelectorAll('.skill-content');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            skillTabs.forEach(t => t.classList.remove('active'));
            skillContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.querySelector(`#${tab.dataset.tab}`).classList.add('active');
        });
    });

    // Animate skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.level-fill').style.width = 
                    entry.target.querySelector('.level-fill').dataset.level;
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));

    // Experience section interactions
    const expCards = document.querySelectorAll('.exp-card');
    
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.exp-details').style.maxHeight = 
                card.querySelector('.exp-details').scrollHeight + 'px';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = 'Send Message';
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scroll with offset for header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    const cube = document.querySelector('.cube');
    const wrapper = document.querySelector('.cube-wrapper');
    let bounds;
    let isHovered = false;

    function updateBounds() {
        bounds = wrapper.getBoundingClientRect();
    }

    window.addEventListener('resize', updateBounds);
    updateBounds();

    wrapper.addEventListener('mouseenter', () => {
        isHovered = true;
        cube.style.animation = 'none'; // Pause rotation on hover
    });

    wrapper.addEventListener('mouseleave', () => {
        isHovered = false;
        cube.style.animation = 'rotate 15s infinite linear'; // Resume rotation
        cube.style.transform = 'rotateX(0) rotateY(0)';
    });

    document.addEventListener('mousemove', (e) => {
        if (!bounds || !isHovered) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const angleX = (mouseY - centerY) * 0.2;
        const angleY = (mouseX - centerX) * 0.2;

        cube.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
    });

    // Update the skill progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const percentage = entry.target.querySelector('.percentage').textContent;
                progressBar.style.width = percentage;
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => progressObserver.observe(item));
});

// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
})();

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Shaili Srivastava',
        to_email: 'shailisrivastava0905@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            document.getElementById('contactForm').reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = 'Thank you! Your message has been sent successfully.';
            document.getElementById('contactForm').appendChild(successMessage);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                successMessage.remove();
            }, 3000);
        }, function(error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to send';
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = 'Sorry, there was an error sending your message. Please try again.';
            document.getElementById('contactForm').appendChild(errorMessage);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                errorMessage.remove();
            }, 3000);
        });
}); 