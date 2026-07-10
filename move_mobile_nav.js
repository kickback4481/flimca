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

    // Regex to match the mobile nav block and the closing nav tag
    const mobileNavRegex = /(<!-- Mobile Nav Overlay -->\s*<div class="mobile-nav">[\s\S]*?<\/div>\s*<\/div>)\s*(<\/nav>)/;
    
    // Check if the HTML actually has the closing div for mobile-nav and mobile-nav-inner
    // Let's be more precise
    const preciseRegex = /(<!-- Mobile Nav Overlay -->\s*<div class="mobile-nav">[\s\S]*?<\/div>\s*<\/div>)\s*<\/nav>/;
    
    // We want to swap the order of the mobile nav block and </nav>
    content = content.replace(preciseRegex, '</nav>\n    $1');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed mobile nav position in ${file}`);
});
