// ClarifAI Website JavaScript
// This file handles all interactive functionality including:
// - Navigation menu toggle
// - Smooth scrolling
// - Google Gemini API integration
// - Form handling
// - Animations and effects

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // NAVIGATION FUNCTIONALITY
    // ===========================================
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const typewriterEl = document.getElementById('typewriter');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 90;
                const rect = targetSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const offsetTop = rect.top + scrollTop - navbarHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===========================================
    // SCROLL SPY FOR NAV ACTIVE BORDER
    // ===========================================
    const sectionMap = {
        '#home': document.querySelector('#home'),
        '#about': document.querySelector('#about'),
        '#team': document.querySelector('#team'),
        '#contact': document.querySelector('#contact')
    };
    const linkMap = {
        '#home': document.querySelector('a[href="#home"]'),
        '#about': document.querySelector('a[href="#about"]'),
        '#team': document.querySelector('a[href="#team"]'),
        '#contact': document.querySelector('a[href="#contact"]')
    };

    function setActiveLink(hash) {
        Object.values(linkMap).forEach(a => a && a.classList.remove('active'));
        if (linkMap[hash]) linkMap[hash].classList.add('active');
    }

    const spyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = '#' + entry.target.id;
                setActiveLink(id);
            }
        });
    }, { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    Object.values(sectionMap).forEach(sec => sec && spyObserver.observe(sec));
    
    // ===========================================
    // TYPEWRITER EFFECT
    // ===========================================

    const typewriterPhrases = [
        "Your intelligent AI assistant powered by advanced machine learning",
        "Ask about our app — get clear, friendly answers",
        "ClarifAI blends AI + community for trusted learning"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let typing = true;

    function typewriterLoop() {
        const phrase = typewriterPhrases[currentPhraseIndex];
        if (typing) {
            typewriterEl.textContent = phrase.slice(0, currentCharIndex + 1);
            currentCharIndex++;
            if (currentCharIndex === phrase.length) {
                typing = false;
                setTimeout(typewriterLoop, 1300); // pause at full text
                return;
            }
        } else {
            typewriterEl.textContent = phrase.slice(0, currentCharIndex - 1);
            currentCharIndex--;
            if (currentCharIndex === 0) {
                typing = true;
                currentPhraseIndex = (currentPhraseIndex + 1) % typewriterPhrases.length;
            }
        }
        setTimeout(typewriterLoop, typing ? 40 : 25);
    }

    if (typewriterEl) {
        typewriterLoop();
    }

    // ===========================================
    // GOOGLE GEMINI API INTEGRATION
    // ===========================================
    
    const questionInput = document.getElementById('questionInput');
    const askButton = document.getElementById('askButton');
    const aiResponse = document.getElementById('aiResponse');
    // Removed history elements
    
    // Removed history functions
    
    // ClarifAI context for the AI to understand what the project is about
    const clarifaiContext = `
    You are ClarifAI, a smart Q&A assistant designed for students.  
    ClarifAI blends AI-powered insights with community knowledge to provide reliable, verified, and quick answers.  

    Core Vision:  
    - Help students save time by giving accurate answers.  
    - Provide trusted information by combining AI + peer reviews.  
    - Be available anytime, anywhere, on mobile and web.  

    Key Features:  
    1. Students can ask any academic or project-related question.  
    2. ClarifAI first tries to answer using AI (powered by Google Gemini).  
    3. Community members can also contribute answers, improving reliability.  
    4. Answers are short, clear, and easy to understand.  
    5. Students can download the ClarifAI Android app directly from the website.  
    6. ClarifAI promotes collaborative learning and problem-solving.  

    Rules for answering:  
    - Only answer based on ClarifAI and its features, not random internet topics.  
    - If a user asks something outside ClarifAI's scope, politely say:  
      "I can only answer questions related to ClarifAI."  
    - Keep answers student-friendly, clear, and simple.  

    You are helpful, reliable, and supportive.
    `;
    
    // Function to call Google Gemini API
    async function callGeminiAPI(question) {
        // Note: You'll need to replace 'YOUR_API_KEY' with your actual Google Gemini API key
        const API_KEY = 'AIzaSyAAcGJ-zzGFPsoQR3wTPPKxeub3u73URoo'; // Your actual API key
        // Update to current model endpoint
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        // Guard: if question appears out-of-scope, instruct the model to respond accordingly
        const prompt = `${clarifaiContext}\n\nUser Question: ${question}\n\nIf the question is not related to ClarifAI or its features, respond exactly with: \"I can only answer questions related to ClarifAI.\" Otherwise, provide a short, friendly, professional answer.`;
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later or contact our support team.";
        }
    }
    
    // Handle ask button click
    askButton.addEventListener('click', async function() {
        const question = questionInput.value.trim();
        
        if (!question) {
            alert('Please enter a question about ClarifAI!');
            return;
        }
        
        // Show loading state
        askButton.innerHTML = '<div class="loading"></div> Processing...';
        askButton.disabled = true;
        
        // Clear previous response
        aiResponse.style.display = 'none';
        
        try {
            // Call Gemini API
            const response = await callGeminiAPI(question);
            
            // Display response
            aiResponse.innerHTML = `
                <div style="margin-bottom: 1rem;">
                    <strong>Your Question:</strong> ${question}
                </div>
                <div>
                    <strong>ClarifAI Response:</strong><br>
                    ${response}
                </div>
            `;
            aiResponse.classList.add('show');
            aiResponse.style.display = 'block';
            
        } catch (error) {
            aiResponse.innerHTML = `
                <div style="color: #e74c3c;">
                    <strong>Error:</strong> ${error.message}
                </div>
            `;
            aiResponse.classList.add('show');
            aiResponse.style.display = 'block';
        }
        
        // Reset button
        askButton.innerHTML = '<i class="fas fa-paper-plane"></i> Ask';
        askButton.disabled = false;
        
        // Clear input
        questionInput.value = '';
    });
    
    // Handle Enter key press in input
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            askButton.click();
        }
    });
    
    // ===========================================
    // CONTACT FORM HANDLING
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const email = formData.get('email');
        const phone = formData.get('phone');
        const title = formData.get('title');
        const note = formData.get('note');
        
        // Basic validation
        if (!email || !title || !note) {
            alert('Please fill in all required fields (Email, Title, and Message).');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (in a real app, you'd send this to a server)
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // ===========================================
    // DOWNLOAD APK BUTTON
    // ===========================================
    
    const downloadBtn = document.querySelector('.download-btn');
    
    downloadBtn.addEventListener('click', function() {
        // In a real application, this would trigger the actual APK download
        alert('APK download will be available soon! Please check back later or contact us for early access.');
        
        // You could also redirect to a download page or trigger a file download:
        // window.location.href = 'path/to/clarifai.apk';
    });
    
    // ===========================================
    // SCROLL ANIMATIONS
    // ===========================================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.team-card, .about-card, .contact-form-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===========================================
    // TEAM CARD HOVER EFFECTS
    // ===========================================
    
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===========================================
    // FLOATING ELEMENTS ANIMATION
    // ===========================================
    
    // Add random movement to floating circles
    const floatingCircles = document.querySelectorAll('.floating-circle');
    
    floatingCircles.forEach((circle, index) => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        circle.style.left = randomX + '%';
        circle.style.top = randomY + '%';
        
        // Add random animation delay
        circle.style.animationDelay = Math.random() * 6 + 's';
    });
    
    // ===========================================
    // HERO MOUSE PARTICLE EFFECT
    // ===========================================
    const heroSection = document.querySelector('.hero');
    let lastParticleTime = 0;
    heroSection.addEventListener('mousemove', function(e) {
        const now = performance.now();
        // throttle particle creation
        if (now - lastParticleTime < 35) return;
        lastParticleTime = now;

        const particle = document.createElement('span');
        particle.className = 'mouse-particle';
        const rect = heroSection.getBoundingClientRect();
        particle.style.left = e.clientX - rect.left + 'px';
        particle.style.top = e.clientY - rect.top + 'px';
        heroSection.appendChild(particle);

        // remove after animation ends
        setTimeout(() => particle.remove(), 1200);
    });

    // ===========================================
    // FORM INPUT ANIMATIONS
    // ===========================================
    
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ===========================================
    // SMOOTH SCROLLING FOR ALL ANCHOR LINKS
    // ===========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================================
    // LOADING ANIMATION FOR PAGE
    // ===========================================
    
    // Add a subtle loading effect when the page loads
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===========================================
    // KEYBOARD SHORTCUTS
    // ===========================================
    
    document.addEventListener('keydown', function(e) {
        // Press 'A' to focus on the ask input
        if (e.key === 'a' && !e.ctrlKey && !e.altKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                questionInput.focus();
            }
        }
        
        // Press 'Escape' to clear the AI response
        if (e.key === 'Escape') {
            aiResponse.style.display = 'none';
            aiResponse.classList.remove('show');
        }
        
        // removed history toggle
    });
    
    // ===========================================
    // CONSOLE WELCOME MESSAGE
    // ===========================================
    
    console.log(`
    🚀 Welcome to ClarifAI Website!
    
    This website is built with:
    - Modern HTML5 & CSS3
    - Glassmorphism design effects
    - Google Gemini AI integration
    - Responsive design
    - Smooth animations
    
    Keyboard shortcuts:
    - Press 'A' to focus on the ask input
    - Press 'Escape' to clear AI response
    - Press 'H' to toggle question history
    
    Made with ❤️ by the ClarifAI Team
    `);
    
});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Function to debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add ripple effect to buttons
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(addRippleEffect);
});
