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

const mobileNavReplacement = `        <!-- Mobile Nav Overlay -->
        <div class="mobile-nav">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="index.html#services">Services</a>
            <div class="dropdown" tabindex="0" onclick="this.classList.toggle('active')" onkeypress="if(event.key==='Enter') this.classList.toggle('active')">
                <a style="cursor: pointer;">Therapies</a>
                <div class="dropdown-menu">
                    <a href="iv-therapies.html">IV & Infusion Therapies</a>
                    <a href="ozone-therapy.html">Ozone Therapy</a>
                    <a href="ubi-therapy.html">UBI Therapy</a>
                    <a href="eboo-therapy.html">EBOO</a>
                    <a href="ebo2-therapy.html">EBO&#8322;</a>
                    <a href="eboo-vs-ebo2.html">EBOO vs EBO&#8322;</a>
                </div>
            </div>
            <a href="testimonials.html">Testimonials</a>
            <a href="index.html#process">How it Works</a>
            <a href="index.html#faq">FAQ</a>
            <a href="https://flimc.myshopify.com/" target="_blank">Supplements</a>
            <a href="mailto:Info@flimc.com" class="btn btn-primary">Book Appointment</a>
        </div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
        /<!-- Mobile Nav Overlay -->[\s\S]*?<\/nav>/,
        mobileNavReplacement + '\n    </nav>'
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated mobile nav in ${file}`);
});
