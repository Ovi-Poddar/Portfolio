// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .publication-item, .research-item, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#4f46e5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Only run typing animation on desktop
        if (window.innerWidth > 768) {
            typeWriter(heroTitle, originalText, 50);
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// CV Download functionality
function downloadCV() {
    // Create CV content based on Ovi Poddar's actual information
    const cvContent = `
# Ovi Poddar - Software Engineer

## Contact Information
Email: ovipdr.202575@gmail.com
Phone: +8801521114325
Location: Dhaka, Bangladesh
LinkedIn: linkedin.com/in/ovi-poddar
GitHub: github.com/Ovi-Poddar

## Research Interest
Artificial Intelligence (ML, DL, LLMs), Software Engineering, and System & Network Security — with a focus on program analysis, automated verification, and vulnerability detection. I am interested in applying AI to large-scale software and security data for intrusion detection, anomaly analysis, and trustworthy systems, as well as in software testing and debugging for ML/AI-driven applications.

## Experience
### Software Development Engineer - IQVIA (Feb 2024 - Current)
- Contributing to the development of a cloud-based storage management application (similar to OneDrive) leveraging AWS S3
- Working on both frontend (Angular) and backend (.NET Core APIs)
- Designed and implemented scalable, maintainable features
- Collaborated in the core team, focusing on authentication, security, and system reliability
- Technology stack: .NET Core, C#, Angular, PostgreSQL, Entity Framework Core, Python, Robot Framework

### Software Engineer I - Enosis Solutions (June 2023 - Jan 2024)
- Developed expertise in ASP.NET Core, C#, Angular, Microsoft SQL Server, and Entity Framework Core
- Contributed to an e-learning, education-focused web application
- Implemented new features, optimized performance, and ensured high scalability
- Collaborated with cross-functional teams to refine requirements and enhance code quality

### Undergraduate Research Work - BUET (February 2022 - April 2023)
- Conducted research on deep learning-based classification of code review comments
- Integrated natural language and code context
- Demonstrated significant performance improvement over existing models
- Supervisor: Dr. Anindya Iqbal

## Education
### Bangladesh University of Engineering & Technology (BUET) (March 2018 - May 2023)
- BSc in Computer Science and Engineering
- CGPA: 3.61/4.00

## Publications
### Towards Automated Classification of Code Review Feedback to Support Analytics
- ESEM 2023 · Jul 7, 2023
- Authors: Asif Kamal Turzo, Fahim Faysal, Ovi Poddar, Anindya Iqbal, Amiangshu Bosu
- Link: arxiv.org/abs/2307.03852

## Projects
### Compass - Local Business Review Site
- Full-stack MERN application for discovering local businesses
- Features: business profiles, reviews, star ratings, photo uploads
- Tools: Node.js, Express.js, React.js, MongoDB

### Social Shout - Social Media Platform
- Instagram-like social networking platform
- Features: authentication, photo sharing, following, likes, comments, notifications, chat
- Tools: Django, Python, HTML, CSS, JavaScript, Oracle Database

### Simple Alarm Clock - ATMEGA32 Interfaced with SD-Card Module
- Digital alarm clock system using ATMEGA32 microcontroller
- Integrated with SD-Card module for data storage
- Tools: C, Proteus, ATMEGA32, SD-Card Module

## Technical Skills
- Languages: C++, C, Java, Python, C#, SQL, JavaScript, HTML, CSS
- Frameworks: .NET, Django, MERN Stack, Entity Framework Core
- Databases: PostgreSQL, MongoDB, MS SQL Server
- Libraries: NumPy, Pandas, Scikit-learn, TensorFlow, Matplotlib
- Tools & Platforms: Git, Linux, AWS S3, Robot Framework

## Awards and Achievements
- Competitive programmer with 2500+ solved problems on Codeforces, LeetCode, and other platforms
- Silver Award at IQVIA for delivering higher-than-expected contributions
- Talent Pool Scholarship in both Secondary and Higher Secondary Examinations in Bangladesh

## References
- Dr. Anindya Iqbal, Professor, Dept. of CSE, BUET
- Sonu Varma, Associate Director of Software Development at IQVIA, Pennsylvania, United States
    `;
    
    // Create and download the file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ovi_Poddar_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('CV downloaded successfully!', 'success');
}

// Add click event to CV download button
document.addEventListener('DOMContentLoaded', () => {
    const cvButton = document.querySelector('a[href="cv.pdf"]');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCV();
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4f46e5';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

