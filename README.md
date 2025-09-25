# ClarifAI Website

A modern, single-page website for the ClarifAI project featuring glassmorphism design, AI integration, and responsive layout.

## Features

- **Modern Design**: Clean white theme with glassmorphism effects
- **AI Integration**: Google Gemini API integration for intelligent responses
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **Interactive Elements**: Hover effects, scroll animations, and form validation

## Setup Instructions

### 1. Google Gemini API Setup

To enable the AI chat functionality, you need to set up a Google Gemini API key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Open `script.js` and replace `YOUR_API_KEY` with your actual API key:

```javascript
const API_KEY = 'your-actual-api-key-here';
```

### 2. Running the Website

1. Simply open `index.html` in your web browser
2. Or use a local server for better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles with glassmorphism effects
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Sections

### 1. Navigation Bar
- Sticky navigation with glassmorphism effect
- Mobile-responsive hamburger menu
- Smooth scroll navigation

### 2. Hero Section
- AI chat interface with Google Gemini integration
- Download APK button
- Floating background animations

### 3. About Section
- "Why ClarifAI?" information
- Feature highlights with icons
- Glassmorphism card design

### 4. Team Section
- Team member cards in grid layout
- Hover effects and social links
- Responsive grid system

### 5. Contact Section
- Contact form with validation
- Glassmorphism form container
- Form submission handling

### 6. Footer
- Simple footer with navigation links
- Glassmorphism background

## Color Scheme

- **Primary Blue**: #1A73E8
- **Secondary Green**: #34A853
- **Accent Yellow**: #FBBC05
- **Background**: White with gradient overlays

## Technologies Used

- HTML5
- CSS3 (with glassmorphism effects)
- Vanilla JavaScript
- Google Fonts (Poppins)
- Font Awesome Icons
- Google Gemini API

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #1A73E8;
    --secondary-color: #34A853;
    --accent-color: #FBBC05;
}
```

### Adding Team Members
Edit the team section in `index.html`:

```html
<div class="team-card glassmorphism">
    <div class="team-avatar">
        <i class="fas fa-user-circle"></i>
    </div>
    <h3 class="team-name">Your Name</h3>
    <p class="team-role">Your Role</p>
    <p class="team-bio">Your bio here</p>
    <div class="team-social">
        <a href="#"><i class="fab fa-linkedin"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-github"></i></a>
    </div>
</div>
```

## Keyboard Shortcuts

- **A**: Focus on the AI chat input
- **Escape**: Clear AI response
- **Enter**: Submit question in chat input

## Performance Notes

- Images are optimized for web
- CSS animations use GPU acceleration
- JavaScript is debounced for scroll events
- Lazy loading for better performance

## License

This project is created for educational purposes. Feel free to modify and use as needed.

## Support

For questions or issues, please contact the ClarifAI team through the contact form on the website.

---

Made with ❤️ by the ClarifAI Team
