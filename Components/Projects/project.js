// Projects Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize project search and filtering functionality
    initProjectsFilter();
    
    // Initialize filter dropdowns
    initFilterDropdowns();
    
    // Initialize particles.js since we're not using main.js anymore
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    }
});

// Function to handle real-time project filtering based on search input
function initProjectsFilter() {
    const searchInput = document.getElementById('project-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Apply filters (this will also consider the current tech and year filters)
        applyFilters(searchTerm);
    });
}

// Function to initialize tech and year filter dropdowns
function initFilterDropdowns() {
    setupFilterDropdown('tech-btn', 'tech-filter', 'apply-tech-filter');
    setupFilterDropdown('year-btn', 'year-filter', 'apply-year-filter');
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const techFilter = document.getElementById('tech-filter');
        const yearFilter = document.getElementById('year-filter');
        const techBtn = document.querySelector('.tech-btn');
        const yearBtn = document.querySelector('.year-btn');
        
        if (!e.target.closest('.tech-btn') && !e.target.closest('#tech-filter')) {
            techFilter.classList.remove('show');
            techBtn.classList.remove('active');
        }
        
        if (!e.target.closest('.year-btn') && !e.target.closest('#year-filter')) {
            yearFilter.classList.remove('show');
            yearBtn.classList.remove('active');
        }
    });
    
    // Apply tech filter
    document.getElementById('apply-tech-filter').addEventListener('click', function() {
        applyFilters();
        document.getElementById('tech-filter').classList.remove('show');
        document.querySelector('.tech-btn').classList.remove('active');
    });
    
    // Apply year filter
    document.getElementById('apply-year-filter').addEventListener('click', function() {
        applyFilters();
        document.getElementById('year-filter').classList.remove('show');
        document.querySelector('.year-btn').classList.remove('active');
    });
}

// Function to setup a filter dropdown
function setupFilterDropdown(btnClass, filterId, applyBtnId) {
    const filterBtn = document.querySelector('.' + btnClass);
    const filterDropdown = document.getElementById(filterId);
    
    if (!filterBtn || !filterDropdown) return;
    
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the document click from immediately closing it
        
        const isOpen = filterDropdown.classList.contains('show');
        
        // Close all dropdowns first
        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Toggle this dropdown
        if (!isOpen) {
            filterDropdown.classList.add('show');
            this.classList.add('active');
        }
    });
}

// Function to apply all active filters
function applyFilters(searchTerm = '') {
    // Get search term if not provided
    if (searchTerm === '') {
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            searchTerm = searchInput.value.toLowerCase();
        }
    }
    
    // Get selected tech filters
    const selectedTechs = Array.from(document.querySelectorAll('#tech-filter .filter-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    // Get selected year filters
    const selectedYears = Array.from(document.querySelectorAll('#year-filter .filter-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    // Filter projects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Get card data
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const badge = card.querySelector('.project-badge').textContent.toLowerCase();
        const techData = card.getAttribute('data-tech').split(',');
        const yearData = card.getAttribute('data-year');
        
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm) ||
            tags.some(tag => tag.includes(searchTerm)) ||
            badge.includes(searchTerm);
        
        // Tech filter
        const matchesTech = selectedTechs.length === 0 || 
            selectedTechs.some(tech => techData.includes(tech));
        
        // Year filter
        const matchesYear = selectedYears.length === 0 || 
            selectedYears.includes(yearData);
        
        // Show/hide based on all filters with improved animation handling
        if (matchesSearch && matchesTech && matchesYear) {
            // First ensure the card is visible before applying opacity
            if (card.style.visibility === 'hidden' || card.style.opacity === '0') {
                card.style.opacity = '0';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
                // Remove any transform styles that might interfere with hover animations
                card.style.transform = '';
                // Force a reflow to ensure the transition works
                void card.offsetWidth;
            }
            // Then fade it in
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Ensure all transitions are preserved for child elements
            const badgeDesc = card.querySelector('.project-badge-description');
            if (badgeDesc) {
                badgeDesc.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            
            // Reset any transform styles on the project image to ensure smooth hover animations
            const projectImg = card.querySelector('.project-img');
            if (projectImg) {
                projectImg.style.transform = '';
            }
        } else {
            // Fade out first, then hide
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Wait for the transition to complete before hiding
            setTimeout(() => {
                if (card.style.opacity === '0') {
                    card.style.visibility = 'hidden';
                    card.style.pointerEvents = 'none';
                }
            }, 300); // Match the transition duration
        }
    });
    
    // Update filter button states
    updateFilterButtonsState();
}

// Update filter button states to show if filters are active
function updateFilterButtonsState() {
    const techBtn = document.querySelector('.tech-btn');
    const yearBtn = document.querySelector('.year-btn');
    
    // Check if tech filters are active
    const hasTechFilters = document.querySelectorAll('#tech-filter .filter-checkbox:checked').length > 0;
    if (hasTechFilters) {
        techBtn.style.backgroundColor = '#7B3B3B';
    } else {
        techBtn.style.backgroundColor = '';
    }
    
    // Check if year filters are active
    const hasYearFilters = document.querySelectorAll('#year-filter .filter-checkbox:checked').length > 0;
    if (hasYearFilters) {
        yearBtn.style.backgroundColor = '#7B3B3B';
    } else {
        yearBtn.style.backgroundColor = '';
    }
}

// Handler for project card clicks
function cardClickHandler(e) {
    const projectLink = e.currentTarget.querySelector('.project-link');
    if (projectLink) {
        projectLink.click();
    }
}

// Initialize particles.js with custom configuration
function initParticles() {
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
}
