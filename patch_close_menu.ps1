$old_script = @"
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
"@

$new_script = @"
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if(btn && menu) {
                btn.addEventListener('click', function() {
                    menu.classList.toggle('hidden');
                });
                const links = menu.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        menu.classList.add('hidden');
                    });
                });
            }
        });
    </script>
"@

$files = Get-ChildItem -Path "*.html"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    if ($content -match "const links = menu.querySelectorAll") { continue }
    
    # Normalize line endings to avoid matching issues
    $normalized_content = $content -replace "`r`n", "`n"
    $normalized_old = $old_script -replace "`r`n", "`n"
    $normalized_new = $new_script -replace "`r`n", "`n"
    
    if ($normalized_content -match [regex]::Escape($normalized_old)) {
        $normalized_content = $normalized_content -replace [regex]::Escape($normalized_old), $normalized_new
        
        # Convert back to original line endings if needed (or just save as is, browser doesn't care)
        Set-Content -Path $f.FullName -Value $normalized_content
    }
}
Write-Output "Patching complete."
