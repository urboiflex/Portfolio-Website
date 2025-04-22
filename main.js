// Particle.js Configuration for Portfolio Background

document.addEventListener('DOMContentLoaded', function() {

    
    // Initialize particles.js with custom configuration
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event for header styling and animation with smooth transitions
    let lastScrollTop = 0;
    let scrollTimer;
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const currentScrollTop = window.scrollY;
        
        // Apply background color and padding changes with smooth transition
        if (currentScrollTop > 50) {
            header.style.padding = '15px 0';
            header.classList.add('visible');
        } else {
            header.style.padding = '20px 0';
            header.classList.remove('visible');
        }
        
        // Handle header visibility based on scroll direction with smoother transitions
        if (currentScrollTop > lastScrollTop && currentScrollTop > 150) {
            // Scrolling down - smoothly hide header
            if (!header.classList.contains('hidden')) {
                header.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
                header.classList.add('hidden');
                header.classList.remove('visible');
            }
        } else {
            // Scrolling up - smoothly show header
            if (header.classList.contains('hidden')) {
                header.style.transition = 'all 0.5s cubic-bezier(0.0, 0.0, 0.2, 1)';
                header.classList.remove('hidden');
                if (currentScrollTop > 50) {
                    header.classList.add('visible');
                }
            }
        }
        
        // Add a small delay to prevent flickering on small scroll movements
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            lastScrollTop = currentScrollTop;
        }, 50);
    });
    
    // Add hover effect to make header reappear when near top of page
    document.addEventListener('mousemove', function(e) {
        const header = document.querySelector('header');
        // Check if mouse is near the top of the viewport
        if (e.clientY < 60) {
            // Make header visible and ensure it's interactive
            header.classList.remove('hidden');
            header.classList.add('visible');
            // Ensure pointer-events are enabled
            header.style.pointerEvents = 'auto';
        }
    });
    
    // Special handling for footer section
    const footerIframe = document.getElementById('footer-iframe');
    if (footerIframe) {
        // When mouse enters the iframe area, check if it's near the top
        footerIframe.addEventListener('mouseenter', function() {
            document.addEventListener('mousemove', function checkTopHover(e) {
                const header = document.querySelector('header');
                if (e.clientY < 60) {
                    header.classList.remove('hidden');
                    header.classList.add('visible');
                    header.style.pointerEvents = 'auto';
                }
                
                // Remove this event listener when mouse leaves the iframe
                footerIframe.addEventListener('mouseleave', function() {
                    document.removeEventListener('mousemove', checkTopHover);
                }, { once: true });
            });
        });
    }}
);



