const fs = require('fs');
const path = require('path');

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

    // 1. Mobile Menu Toggle Fix
    content = content.replace(
        /<div class="mobile-menu-toggle" aria-label="Toggle menu">([\s\S]*?)<\/div>/g,
        '<button class="mobile-menu-toggle" aria-label="Toggle menu">$1</button>'
    );

    // Dropdown fix
    content = content.replace(
        /<div class="dropdown" onclick="this.classList.toggle\('active'\)">/g,
        '<div class="dropdown" tabindex="0" onclick="this.classList.toggle(\'active\')" onkeypress="if(event.key===\'Enter\') this.classList.toggle(\'active\')">'
    );

    // 2. Book Appointment Links
    content = content.replace(
        /<a href="#" class="btn btn-primary">Book Appointment<\/a>/g,
        '<a href="mailto:Info@flimc.com" class="btn btn-primary">Book Appointment</a>'
    );

    // 3. Remove Generic Hero Section
    content = content.replace(
        /<!-- Hero Section -->[\s\S]*?<\/header>\s*/,
        ''
    );

    // 4. Inline Styles to Classes
    content = content.replace(
        /style="padding:\s*6rem\s*0;\s*text-align:\s*center;"/g,
        'class="page-hero-section"'
    );
    // Remove class="about-hero-section" if we added page-hero-section
    content = content.replace(/class="about-hero-section" class="page-hero-section"/g, 'class="page-hero-section"');

    content = content.replace(
        /style="font-family:\s*'Playfair Display',\s*serif;\s*font-size:\s*3rem;\s*color:\s*var\(--brand-dark\);\s*margin-bottom:\s*1rem;"/g,
        'class="page-hero-title"'
    );
    
    content = content.replace(
        /style="font-size:\s*1\.2rem;\s*color:\s*var\(--text-secondary\);\s*max-width:\s*800px;\s*margin:\s*0\s*auto;"/g,
        'class="page-hero-subtitle"'
    );

    content = content.replace(
        /style="padding:\s*2rem\s*0\s*6rem;"/g,
        'class="page-content-section"'
    );
    // Remove class="about-content-section"
    content = content.replace(/class="about-content-section" class="page-content-section"/g, 'class="page-content-section"');

    content = content.replace(
        /style="max-width:\s*900px;"/g,
        'class="page-content-container"'
    );

    content = content.replace(
        /style="padding:\s*3rem;\s*text-align:\s*left;"/g,
        'class="page-glass-card"'
    );

    content = content.replace(
        /style="color:\s*var\(--brand-dark\);\s*margin-bottom:\s*1\.5rem;\s*font-size:\s*2rem;"/g,
        'class="page-content-h2"'
    );

    content = content.replace(
        /style="color:\s*var\(--brand-dark\);\s*margin-bottom:\s*1rem;\s*font-size:\s*1\.5rem;"/g,
        'class="page-content-h3"'
    );

    content = content.replace(
        /style="margin-bottom:\s*1\.5rem;\s*line-height:\s*1\.8;\s*color:\s*var\(--text-secondary\);"/g,
        'class="page-content-p"'
    );

    content = content.replace(
        /style="margin-bottom:\s*2\.5rem;\s*line-height:\s*1\.8;\s*color:\s*var\(--text-secondary\);"/g,
        'class="page-content-p"'
    );

    content = content.replace(
        /style="font-style:\s*italic;\s*border-left:\s*4px\s*solid\s*var\(--brand-gold\);\s*padding-left:\s*1\.5rem;\s*margin-bottom:\s*2\.5rem;\s*color:\s*var\(--text-primary\);\s*line-height:\s*1\.8;"/g,
        'class="page-content-blockquote"'
    );

    content = content.replace(
        /style="padding-left:\s*1\.5rem;\s*margin-bottom:\s*1\.5rem;\s*line-height:\s*1\.8;\s*color:\s*var\(--text-secondary\);"/g,
        'class="page-content-list"'
    );

    content = content.replace(
        /style="margin-bottom:\s*0\.5rem;"/g,
        ''
    );

    // 5. Fix Footer SVG
    content = content.replace(/fill="var\(--brand-dark\)"/g, '');

    // 6. Meta Description & Title
    // Get page title from h1
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    let titleText = 'FLIMC';
    if (h1Match) {
        titleText = h1Match[1].replace(/<[^>]+>/g, '').trim();
    }

    const newTitle = `<title>${titleText} | FLIMC</title>`;
    content = content.replace(/<title>.*?<\/title>/g, newTitle);

    // Add meta description if not exists
    if (!content.includes('name="description"')) {
        const metaDesc = `\n    <meta name="description" content="Learn more about ${titleText} at Florida Integrative Medical Center (FLIMC) in Sarasota, Florida.">`;
        content = content.replace(/<\/title>/, `</title>${metaDesc}`);
    }

    // 7. Remove placeholders from therapies
    content = content.replace(
        /<p[^>]*>\s*<em>More detailed information about this therapy can be added here\. This page is currently a placeholder template\.<\/em>\s*<\/p>/g,
        ''
    );

    // 8. Fix testimonials.html embedded css/js
    if (file === 'testimonials.html') {
        content = content.replace(/<!-- Testimonial Interactive Styles -->\s*<style>[\s\S]*?<\/style>/, '');
        content = content.replace(/<script>[\s\S]*?function toggleExpand[\s\S]*?<\/script>/, '');
        // Fix grid HTML nesting
        content = content.replace(/<div class="services-grid" style="display:\s*grid;\s*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(350px,\s*1fr\)\);\s*gap:\s*4rem;">/, '');
        content = content.replace(/<\/div><\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, '</div></div></div></section>');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Processed ${file}`);
});
