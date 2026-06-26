# 🩸 World Sickle Cell Day Awareness Website

A modern, responsive, and accessible awareness website dedicated to educating visitors about sickle cell disease, promoting early genotype testing, encouraging blood donation, and reducing stigma through accurate information.

## 📋 Overview

This website serves as a comprehensive resource for sickle cell disease awareness with a focus on:
- **Education**: Detailed information about SCD symptoms, treatments, and living well
- **Testing**: Importance of early genotype testing and who should get tested
- **Blood Donation**: How blood donations save lives for SCD patients
- **Stigma Reduction**: Debunking myths and spreading accurate information
- **Community Support**: Resources and contact information for affected individuals and families

## 🎨 Design Features

### Healthcare-Inspired Design
- **Color Palette**: 
  - Primary Red (#DC143C) - Healthcare symbol
  - Primary Blue (#1E3A8A) - Trust and stability
  - White (#FFFFFF) - Cleanliness and clarity
- **Modern Aesthetics**: Clean, professional design with smooth gradients and subtle shadows
- **Accessibility Focus**: WCAG 2.1 AA compliant design

### Responsive & Mobile-First
- **Mobile-First Approach**: Optimized for all device sizes
- **Breakpoints**: Custom CSS media queries for tablets and desktops
- **Touch-Friendly**: Large touch targets for mobile users
- **Flexible Layouts**: Grid and Flexbox for responsive design

### Smooth Animations
- **Entrance Animations**: Fade-in and slide-in effects for elements
- **Interactive Hover States**: Smooth transitions on buttons and cards
- **Floating Elements**: Subtle animations that add visual interest
- **Performance Optimized**: Uses CSS animations for better performance

## 📁 File Structure

```
sickle-cell-awareness/
├── index.html           # Main HTML structure
├── styles.css          # Comprehensive CSS styling
├── script.js           # Interactive JavaScript functionality
└── README.md           # Documentation (this file)
```

## 🚀 Key Features

### Navigation
- Sticky navigation bar with mobile hamburger menu
- Smooth scroll navigation to all sections
- Active link indicators
- Keyboard accessible

### Sections

1. **Hero Section**
   - Eye-catching headline and CTA buttons
   - Animated floating shapes
   - Responsive layout

2. **About Section**
   - Four information cards explaining SCD
   - Hover animations and transitions
   - Clear, organized information

3. **Key Facts**
   - Statistics displayed in an engaging format
   - Animated number counters
   - Mobile responsive grid

4. **Education**
   - Symptoms, treatments, and living tips
   - Icon-based organization
   - Easy-to-scan lists

5. **Testing Section**
   - Why test and who should test
   - Step-by-step testing process
   - Call-to-action box

6. **Blood Donation**
   - Importance and benefits
   - Donation requirements
   - Center finder

7. **Stigma Reduction**
   - Myths vs. Truth cards
   - Accurate information
   - Empowering messages

8. **Resources**
   - Medical information
   - Support groups
   - Family resources
   - Educational materials

9. **Contact Section**
   - Contact information
   - Contact form with validation
   - Multiple ways to get in touch

10. **Footer**
    - Quick links
    - Social media
    - Copyright information

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
- **Screen Reader Support**: Proper semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Sufficient contrast ratios (7:1 for text)
- **Skip Links**: Skip to main content link
- **Reduced Motion Support**: Respects `prefers-reduced-motion` preference
- **Form Validation**: Clear error messages and required field indicators
- **Live Regions**: Announcements for dynamic content changes

## 🎯 JavaScript Functionality

### Classes & Modules

1. **MobileMenu**
   - Toggle mobile navigation menu
   - Close on link click
   - Close on outside click
   - Keyboard shortcut support

2. **ScrollAnimations**
   - Trigger animations on scroll
   - Intersection Observer API
   - Performance optimized

3. **NavbarScroll**
   - Sticky navigation effects
   - Scroll detection
   - Dynamic shadow effects

4. **ContactForm**
   - Form validation
   - Email validation
   - Success/error messages
   - Form reset

5. **StatsCounter**
   - Animated number counters
   - Trigger on scroll
   - Smooth incrementing

6. **SmoothScrolling**
   - Smooth anchor link navigation
   - All browsers support

7. **KeyboardNavigation**
   - Escape key handling
   - Tab focus management

8. **AccessibilityEnhancements**
   - ARIA labels
   - Live regions
   - Focus management

## 📱 Responsive Breakpoints

```css
Desktop:   > 968px
Tablet:    768px - 968px
Mobile:    < 768px
Small Mobile: < 480px
```

## 🎨 CSS Features

- **CSS Variables**: Easy customization of colors, spacing, and typography
- **Flexbox & Grid**: Modern layout techniques
- **Media Queries**: Mobile-first responsive design
- **Gradients**: Healthcare-inspired color gradients
- **Transitions**: Smooth interactive effects
- **Box Shadows**: Subtle depth and elevation
- **Border Radius**: Modern curved corners

## 🔧 Customization

### Update Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-red: #DC143C;
    --primary-blue: #1E3A8A;
    --primary-white: #FFFFFF;
    /* ... more colors */
}
```

### Update Typography
Modify font sizes and weights:
```css
:root {
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-size-base: 1rem;
    /* ... more sizes */
}
```

### Update Spacing
Adjust spacing scale:
```css
:root {
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    /* ... more spacing */
}
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Optimized CSS**: Minimal file size (~50KB)
- **Optimized JavaScript**: Modular and efficient (~20KB)
- **Lazy Loading**: Images load on demand
- **Smooth Animations**: Uses CSS for performance
- **Intersection Observer**: Efficient scroll animations
- **Debouncing**: Optimized event handlers

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch to deploy
4. Site will be live at `https://username.github.io/repo-name`

### Netlify
1. Connect GitHub repository
2. Deploy automatically on push
3. Custom domain support

### Traditional Hosting
1. Upload files to web server
2. Ensure `.htaccess` for URL rewrites (if needed)
3. Configure SSL certificate

## 📝 Content Guidelines

- Keep information accurate and up-to-date
- Use plain language for accessibility
- Include medical disclaimers
- Link to trusted resources
- Update regularly with new information

## 🔐 Security Considerations

- Validate all form inputs
- Use HTTPS for deployment
- No sensitive data storage on client
- Implement CORS if needed
- Use CSP headers for protection

## 📞 Support & Resources

### Medical Information
- CDC Sickle Cell Information
- NIH Sickle Cell Disease Resources
- American Sickle Cell Disease Association
- Global Sickle Cell Disease Network

### Blood Donation
- American Red Cross
- Blood Centers of America
- World Health Organization Guidelines

## 📄 License

This website template is provided as-is for educational and awareness purposes.

## 🤝 Contributing

To improve this website:
1. Test for accessibility issues
2. Suggest content improvements
3. Report bugs or broken links
4. Propose design enhancements

## 📧 Contact

For questions or suggestions about this template, please reach out through the contact form on the website.

## 🎓 Educational Disclaimers

**Important**: This website is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical advice regarding sickle cell disease.

## ✅ Checklist for Website Launch

- [ ] Update contact information
- [ ] Customize colors and branding
- [ ] Add organization logo
- [ ] Review all content for accuracy
- [ ] Test on multiple devices
- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Verify all links work
- [ ] Set up email contact handling
- [ ] Add analytics tracking
- [ ] Deploy to live server
- [ ] Submit to search engines
- [ ] Set up SSL certificate
- [ ] Configure backup system
- [ ] Plan content update schedule

## 🌟 Future Enhancements

- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Blog section for articles
- [ ] Event calendar
- [ ] Resource database
- [ ] Community forum
- [ ] Appointment booking
- [ ] Newsletter signup
- [ ] Testimonials section
- [ ] Interactive symptoms checker
- [ ] Treatment timeline visualization
- [ ] Statistics dashboard
- [ ] Social media integration
- [ ] Mobile app
- [ ] Virtual counseling integration

---

**Last Updated**: 2024
**Version**: 1.0.0

For more information about World Sickle Cell Day, visit [https://www.worldsicklecellday.org](https://www.worldsicklecellday.org)