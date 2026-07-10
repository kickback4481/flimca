const fs = require('fs');

const files = [
    'index.html',
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

    // Remove the close button
    content = content.replace(/\s*<button class="mobile-nav-close" aria-label="Close menu">&times;<\/button>/g, '');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Removed close button from ${file}`);
});
