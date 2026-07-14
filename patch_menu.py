import os
import glob
import re

mobile_menu_html = """
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
"""

script_html = """
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
"""

btn_target = '<button class="bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-teal-700 transition">'
btn_replace = '<button id="mobile-menu-btn" class="bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-teal-700 transition">'

# The menu should go right after the `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">` is closed inside the header.
# Actually, looking at the header structure:
# <header class="w-full bg-white shadow-sm z-50 sticky top-0">
#     <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
#         <div class="flex justify-between items-center py-4">
#             ...
#         </div>
#     </div>
# </header>

header_end_target = "    </header>"

files = glob.glob("*.html")
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if "mobile-menu-btn" in content:
        continue # Already patched
        
    if "bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center" not in content:
        continue # Not a page with this header
        
    # Replace button
    content = content.replace(btn_target, btn_replace)
    
    # Insert mobile menu right before </header>
    content = content.replace(header_end_target, mobile_menu_html + header_end_target)
    
    # Insert script right before </body>
    content = content.replace("</body>", script_html)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Patching complete.")
