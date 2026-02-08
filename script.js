// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Timeline items animation with stagger
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the index of this item in the NodeList
                const index = Array.from(timelineItems).indexOf(entry.target);
                // Add a delay based on the item's index for stagger effect
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Add page load animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    setActiveNav();
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add CSS for mobile navigation
const style = document.createElement('style');
style.textContent = `
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 14, 23, 0.98);
        padding: calc(var(--spacing-unit) * 2);
        border-top: 1px solid rgba(0, 217, 255, 0.2);
        box-shadow: var(--shadow-lg);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    .nav-link.active {
        color: var(--color-accent-primary);
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Timeline marker pulse effect on scroll into view
const markers = document.querySelectorAll('.timeline-marker');
if (markers.length > 0) {
    const markerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const marker = entry.target;
                marker.style.animation = 'markerPulse 0.6s ease-out';
                setTimeout(() => {
                    marker.style.animation = '';
                }, 600);
            }
        });
    }, { threshold: 0.5 });

    markers.forEach(marker => {
        markerObserver.observe(marker);
    });
}

// Portfolio Modal Functionality
// Project data
const projects = {
    project1: {
        title: 'KTM Showroom',
        image: 'images/ktm_dashboard.png',
        year: '2024',
        role: 'Data Analyst',
        duration: '2 weeks',
        type: 'powerbi', // Set to 'powerbi' for interactive dashboards
        powerbiUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYzE1ZDhhZjItMjRhMS00ZWUxLWIyOGYtYzM4MGMxMGYxYjc0IiwidCI6ImViNjFmY2UzLTU0NmUtNDVjMC1iZGI5LWM2NDNjOTA1YjMzNyIsImMiOjl9',
        overview: 'KTM, a renowned Austrian motorcycle manufacturer, offers a wide range of high-performance bikes. This interactive web application showcases their lineup of naked bike models, allowing customers to explore and compare different options with ease. Users can browse through models, select their preferred colors, and view key technical specifications side by side.',
        features: [
            'Interactive model selection and comparison',
            'Dynamic color customization options',
            'Side-by-side technical specifications',
            'Responsive design for all devices',
            'Real-time filtering and search capabilities'
        ],
        skills: ['Python', 'PowerBI', 'DAX', 'Data Visualization']
    },
    project2: {
        title: 'Interactive Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=400&fit=crop&sat=-100',
        year: '2023',
        role: 'Data Analyst',
        duration: '3 months',
        type: 'standard', // Regular project with just an image
        overview: 'Created a comprehensive analytics dashboard for the Royal Netherlands Air Force, providing real-time insights into operational metrics, resource allocation, and performance indicators. The dashboard serves multiple departments and has become a critical tool for data-driven decision making.',
        features: [
            'Real-time data integration from multiple sources',
            'Custom KPI tracking and visualization',
            'Role-based access control and data filtering',
            'Automated report generation and distribution',
            'Mobile-responsive design for field access'
        ],
        skills: ['Tableau', 'SQL', 'ETL', 'Data Analysis', 'Power BI', 'Data Modeling', 'Visualization']
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const projectCards = document.querySelectorAll('.project-card');

if (modal && modalClose && projectCards.length > 0) {
    function openModal(projectId) {
        const project = projects[projectId];
        
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalRole').textContent = project.role;
        document.getElementById('modalDuration').textContent = project.duration;
        document.getElementById('modalOverview').textContent = project.overview;
        
        // Handle modal image/PowerBI display at the top
        const modalImageContainer = document.querySelector('.modal-image');
        
        if (project.type === 'powerbi' && project.powerbiUrl) {
            // Show PowerBI dashboard instead of image
            modalImageContainer.innerHTML = `
                <iframe 
                    title="${project.title}" 
                    width="100%" 
                    height="600"
                    src="${project.powerbiUrl}"
                    frameborder="0" 
                    allowFullScreen="true"
                    style="border: none; display: block;">
                </iframe>
            `;
        } else {
            // Show regular image
            modalImageContainer.innerHTML = `<img id="modalImage" src="${project.image}" alt="${project.title}">`;
        }
        
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
        
        const skillsContainer = document.getElementById('modalSkills');
        skillsContainer.innerHTML = project.skills.map(skill => 
            `<span class="skill-chip">${skill}</span>`
        ).join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for opening modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openModal(projectId);
        });
    });

    // Event listeners for closing modal
    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

console.log('%c🚀 Portfolio by Piene Claessen', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cData Scientist | ML Engineer | LLM Specialist', 'color: #94a3b8; font-size: 14px;');
console.log('%cInterested in working together? Reach out at info@claessentech.com', 'color: #00d9ff; font-size: 12px;');