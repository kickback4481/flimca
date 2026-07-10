const fs = require('fs');


const files = [
    'about.html',
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
    
    // Fix double class attributes
    content = content.replace(/class="glass-card"\s+class="page-glass-card"/g, 'class="glass-card page-glass-card"');
    
    // Also check for container
    content = content.replace(/class="container"\s+class="page-content-container"/g, 'class="container page-content-container"');

    // Also check for hero title and subtitle which might have been inside an element that didn't have a class originally, 
    // wait, they didn't have a class before, so they just got class="page-hero-title". That's fine.

    // Let's just do a generic check for double class="" attributes on the same element
    // This regex looks for `<tag ... class="X" ... class="Y" ...>`
    // It's safer to just run my specific fixes since I know exactly what my previous script did.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed double classes in ${file}`);
});
