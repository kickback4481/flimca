$mobile_menu_html = @"
        <!-- Mobile Menu (Hidden by default) -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-full">
            <div class="px-4 pt-2 pb-4 space-y-1">
                <a href="new-home.html" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">Home</a>
                <a href="conditions.html" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">Conditions</a>
                
                <!-- Therapies Section -->
                <div class="block px-3 py-2 text-base font-bold text-gray-800 uppercase">Therapies</div>
                <div class="pl-6 space-y-1">
                    <a href="eboo.html" class="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-50 uppercase">EBOO</a>
                    <a href="ebo2.html" class="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-50 uppercase">EBO2</a>
                    <a href="ozone-therapy.html" class="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-50 uppercase">Ozone Therapy</a>
                    <a href="ubi-therapy.html" class="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-teal-500 hover:bg-gray-50 uppercase">UBI Therapy</a>
                </div>

                <a href="new-home.html#primary-care" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">Wellness</a>
                <a href="about.html" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">About</a>
                <a href="testimonials.html" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">Testimonials</a>
                <a href="https://flimc.myshopify.com/" target="_blank" class="block px-3 py-2 rounded-md text-base font-bold text-gray-800 hover:text-teal-500 hover:bg-gray-50 uppercase">Supplements</a>
                <a href="#contact-us" class="block mt-4 px-3 py-2 bg-teal-600 text-white rounded-md text-base font-bold text-center hover:bg-teal-700 uppercase">Request an Appointment</a>
            </div>
        </div>
"@

$script_html = @"
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if(btn && menu) {
                btn.addEventListener('click', function() {
                    menu.classList.toggle('hidden');
                });
            }
        });
    </script>
</body>
"@

$btn_target = '<button class="bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-teal-700 transition">'
$btn_replace = '<button id="mobile-menu-btn" class="bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-teal-700 transition">'

$header_end_target = "    </header>"

$files = Get-ChildItem -Path "*.html"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    if ($content -match "mobile-menu-btn") { continue }
    if ($content -notmatch "bg-teal-600 text-white rounded-full p-2 h-10 w-10") { continue }
    
    $content = $content.Replace($btn_target, $btn_replace)
    $content = $content.Replace($header_end_target, "$mobile_menu_html`r`n$header_end_target")
    $content = $content.Replace("</body>", $script_html)
    
    Set-Content -Path $f.FullName -Value $content
}
Write-Output "Patching complete."
