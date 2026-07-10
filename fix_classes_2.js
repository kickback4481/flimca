const fs = require('fs');

const files = [
    'ebo2-therapy.html',
    'eboo-therapy.html',
    'eboo-vs-ebo2.html',
    'iv-therapies.html',
    'ozone-therapy.html',
    'testimonials.html',
    'ubi-therapy.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix double class attributes with scroll-fade-up
    content = content.replace(/class="glass-card scroll-fade-up"\s+class="page-glass-card"/g, 'class="glass-card scroll-fade-up page-glass-card"');
    
    // Fix double class in testimonials
    content = content.replace(/class="testimonials-section"\s+class="page-content-section"/g, 'class="testimonials-section page-content-section"');

    // Also check for hero title and subtitle
    content = content.replace(/class="about-hero-section"\s+class="page-hero-section"/g, 'class="about-hero-section page-hero-section"');
    content = content.replace(/class="about-content-section"\s+class="page-content-section"/g, 'class="about-content-section page-content-section"');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed double classes in ${file}`);
});
