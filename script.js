// ============================================================
// Navigation — scroll effect
// ============================================================
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

// ============================================================
// Mobile navigation toggle
// ============================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ============================================================
// Smooth scroll with offset for fixed nav
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============================================================
// Intersection Observer — general fade-up animations
// ============================================================
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

document.querySelectorAll('[data-aos="fade-up"]').forEach(el => {
    observer.observe(el);
});

// ============================================================
// Stat cards — staggered scale-up animation
// ============================================================
const statCards = document.querySelectorAll('.stat-card');
if (statCards.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(statCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 120);
            }
        });
    }, { threshold: 0.3 });

    statCards.forEach(card => statObserver.observe(card));
}

// ============================================================
// Skill category panels — staggered fade-up
// ============================================================
const skillCategories = document.querySelectorAll('.skill-category');
if (skillCategories.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(skillCategories).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.15 });

    skillCategories.forEach(cat => skillObserver.observe(cat));
}

// ============================================================
// Hero stat pills — staggered fade-up
// ============================================================
const heroPills = document.querySelectorAll('.hero-pill');
if (heroPills.length > 0) {
    // Pills are already visible on load via CSS animation; enhance with JS stagger on re-entry
    heroPills.forEach((pill, i) => {
        pill.style.animationDelay = `${0.4 + i * 0.1}s`;
    });
}

// ============================================================
// Timeline items animation with stagger
// ============================================================
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

// ============================================================
// Active navigation tracking based on scroll
// ============================================================
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

// ============================================================
// Page load
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    setActiveNav();
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================================
// Mobile nav styles (injected)
// ============================================================
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

// ============================================================
// Timeline marker pulse on scroll into view
// ============================================================
const markers = document.querySelectorAll('.timeline-marker');
if (markers.length > 0) {
    const markerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const marker = entry.target;
                marker.style.animation = 'markerPulse 0.6s ease-out';
                setTimeout(() => { marker.style.animation = ''; }, 600);
            }
        });
    }, { threshold: 0.5 });

    markers.forEach(marker => markerObserver.observe(marker));
}

// ============================================================
// Portfolio Filter
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show / hide cards
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === 'all' || category === filter;

                if (show) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.display = '';
                    card.style.pointerEvents = '';
                    // Re-animate on next frame
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    card.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// ============================================================
// Portfolio Modal
// ============================================================
const projects = {
    project1: {
        title: 'AI-Powered HR Chatbot Assistant',
        image: 'images/chatbot.png',
        Projecttype: 'LLM with RAG',
        Projectgoal: 'HR assistant to provide employees with real-time, context-aware answers to HR queries.',
        Problemsolved: 'Employees and HR teams get instant, accurate answers to policies, procedures, and FAQs, reducing response times and manual workload.',
        type: 'video',
        videoUrl: 'images/Chatbot_video_2x.mp4',
        videoType: 'local',
        liveUrl: null,
        overview: 'This AI-powered HR chatbot leverages a Large Language Model (LLM) combined with Retrieval-Augmented Generation (RAG) to provide employees with context-aware answers. It integrates HR documentation, company policies, and FAQs, allowing users to ask questions in natural language and get precise, actionable responses. The solution reduces HR workload and improves employee experience.',
        features: [
            'Context-aware answers using LLM + RAG',
            'Integration with company HR knowledge base and policy documents',
            'Real-time question answering with personalized responses',
            'Scalable architecture for handling multiple employees simultaneously',
            'Secure and privacy-compliant handling of employee queries'
        ],
        skills: ['LLM', 'RAG', 'Python', 'OpenAI API', 'Vector Databases', 'NLP', 'Git']
    },
    project2: {
        title: 'KTM Showroom',
        image: 'images/ktm_card.png',
        Projecttype: 'Data Visualization',
        Projectgoal: 'Interactive dashboard to compare motorcycle performance and key features.',
        Problemsolved: 'Quickly visualize and analyze metrics for smarter insights.',
        type: 'powerbi',
        powerbiUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYzE1ZDhhZjItMjRhMS00ZWUxLWIyOGYtYzM4MGMxMGYxYjc0IiwidCI6ImViNjFmY2UzLTU0NmUtNDVjMC1iZGI5LWM2NDNjOTA1YjMzNyIsImMiOjl9',
        liveUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYzE1ZDhhZjItMjRhMS00ZWUxLWIyOGYtYzM4MGMxMGYxYjc0IiwidCI6ImViNjFmY2UzLTU0NmUtNDVjMC1iZGI5LWM2NDNjOTA1YjMzNyIsImMiOjl9',
        overview: 'KTM, a renowned Austrian motorcycle manufacturer, offers a wide range of high-performance bikes. This interactive web application showcases their lineup of naked bike models, allowing customers to explore and compare different options with ease. Users can browse through models, select their preferred colors, and view key technical specifications side by side.',
        features: [
            'Interactive model selection and comparison',
            'Dynamic color customization options',
            'Side-by-side technical specifications',
            'Responsive design for all devices',
            'Real-time filtering and search capabilities'
        ],
        skills: ['PowerBI', 'DAX', 'Power Query', 'Data Modeling', 'ETL', 'Data Visualization']
    },
    project3: {
        title: 'HR Attrition Dashboard',
        image: 'images/hr_dashboard.png',
        Projecttype: 'Data Visualization',
        Projectgoal: 'Visualize and analyze employee attrition to identify patterns and drivers.',
        Problemsolved: 'Quick insights into turnover trends, high-risk groups, and workforce dynamics.',
        type: 'powerbi',
        powerbiUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYmUwNDM4NzQtZjZhZC00NTI2LTk1MWUtYTAxMzBiZTI3MTJiIiwidCI6ImViNjFmY2UzLTU0NmUtNDVjMC1iZGI5LWM2NDNjOTA1YjMzNyIsImMiOjl9',
        liveUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYmUwNDM4NzQtZjZhZC00NTI2LTk1MWUtYTAxMzBiZTI3MTJiIiwidCI6ImViNjFmY2UzLTU0NmUtNDVjMC1iZGI5LWM2NDNjOTA1YjMzNyIsImMiOjl9',
        overview: 'This interactive HR attrition dashboard provides a clear and anonymized view of employee turnover, enabling HR teams and managers to explore trends, identify high-risk groups, and make informed workforce decisions. Users can filter by department, role, tenure, or location and instantly visualize key metrics to understand patterns at a glance.',
        features: [
            'Interactive filtering by department, role, and education',
            'Attrition trend visualization and turnover rates over time',
            'Python analytics for deeper insights into attrition drivers',
            'Actionable recommendations for workforce planning'
        ],
        skills: ['PowerBI', 'DAX', 'Power Query', 'Python', 'SQL', 'Data Modeling', 'ETL', 'Data Visualization']
    }
};

// Track current open project for keyboard nav
let currentProjectId = null;
const projectOrder = ['project1', 'project2', 'project3'];

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const allProjectCards = document.querySelectorAll('.project-card[data-project]');

if (modal && modalClose) {
    function openModal(projectId) {
        const project = projects[projectId];
        if (!project) return;

        currentProjectId = projectId;

        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalProjectType').textContent = project.Projecttype || '';
        document.getElementById('modalProjectGoal').textContent = project.Projectgoal || '';
        document.getElementById('modalProblemSolved').textContent = project.Problemsolved || '';
        document.getElementById('modalOverview').textContent = project.overview;

        const modalImageContainer = document.querySelector('.modal-image');

        if (project.type === 'powerbi' && project.powerbiUrl) {
            modalImageContainer.innerHTML = `
                <div class="powerbi-aspect-ratio">
                    <iframe
                        title="${project.title}"
                        src="${project.powerbiUrl}"
                        frameborder="0"
                        allowFullScreen="true">
                    </iframe>
                </div>
            `;
        } else if (project.type === 'video' && project.videoUrl) {
            if (project.videoType === 'local') {
                modalImageContainer.innerHTML = `
                    <div class="video-container">
                        <video controls>
                            <source src="${project.videoUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
            } else {
                modalImageContainer.innerHTML = `
                    <div class="video-container">
                        <iframe
                            title="${project.title}"
                            src="${project.videoUrl}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen="true">
                        </iframe>
                    </div>
                `;
            }
        } else {
            modalImageContainer.innerHTML = `<img id="modalImage" src="${project.image}" alt="${project.title}">`;
        }

        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

        const skillsContainer = document.getElementById('modalSkills');
        skillsContainer.innerHTML = project.skills.map(s =>
            `<span class="skill-chip">${s}</span>`
        ).join('');

        // Live button
        const liveBtn = document.getElementById('modalLiveBtn');
        if (liveBtn) {
            if (project.liveUrl) {
                liveBtn.href = project.liveUrl;
                liveBtn.style.display = 'inline-flex';
                liveBtn.innerHTML = project.type === 'video'
                    ? '<i class="fa-solid fa-play"></i> Watch Demo'
                    : '<i class="fa-solid fa-arrow-up-right-from-square"></i> View Live';
            } else {
                liveBtn.style.display = 'none';
            }
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProjectId = null;
    }

    // Open via card click
    allProjectCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.project);
        });
    });

    // Close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard nav: Escape, ← →
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            const currentIndex = projectOrder.indexOf(currentProjectId);
            if (currentIndex !== -1) {
                const nextIndex = (currentIndex + 1) % projectOrder.length;
                openModal(projectOrder[nextIndex]);
            }
        } else if (e.key === 'ArrowLeft') {
            const currentIndex = projectOrder.indexOf(currentProjectId);
            if (currentIndex !== -1) {
                const prevIndex = (currentIndex - 1 + projectOrder.length) % projectOrder.length;
                openModal(projectOrder[prevIndex]);
            }
        }
    });

    // Prevent modal body clicks from closing
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => e.stopPropagation());
    }
}

// ============================================================
// Console branding
// ============================================================
console.log('%c🚀 Portfolio by Piene Claessen', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cData Scientist | ML Engineer | LLM Specialist', 'color: #94a3b8; font-size: 14px;');
console.log('%cInterested in working together? Reach out at info@claessentech.com', 'color: #00d9ff; font-size: 12px;');
