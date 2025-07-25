/**
 * Common JavaScript functions for Student DSS application
 */

// Load the sidebar into any page with #sidebar-container
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        // Determine the path prefix based on whether we're in a subdirectory
        const isSubdirectory = window.location.pathname.includes('/tools/');
        const pathPrefix = isSubdirectory ? '../' : '';
        
        // Create the sidebar HTML
        sidebarContainer.innerHTML = `
        <aside class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100 overflow-auto" style="width: 280px;">
            <div class="d-flex align-items-center mb-3">
                <h2 class="fs-4 m-0 text-white">Student DSS</h2>
            </div>
            <div class="d-flex align-items-center mb-4">
                <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2 p-2 text-white fw-bold" id="userInitial">A</div>
                <div>
                    <h4 class="fs-6 m-0 text-white" id="sidebarUsername">Admin</h4>
                    <p class="m-0 text-white-50" id="sidebarUserRole">Administrator</p>
                </div>
            </div>
            <nav class="nav flex-column">
                <a href="${pathPrefix}dashboard.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">🏠</span>
                    <span>Dashboard</span>
                </a>
                <a href="${pathPrefix}preferences.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">⚙️</span>
                    <span>Preferences</span>
                </a>
                <a href="${pathPrefix}results.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">🎯</span>
                    <span>Results</span>
                </a>
                <a href="${pathPrefix}comparison.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">⚖️</span>
                    <span>Compare</span>
                </a>
                <a href="${pathPrefix}analytics.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">📊</span>
                    <span>Analytics</span>
                </a>
                <hr class="text-white-50">
                <a href="${pathPrefix}tools/calculator.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">🧮</span>
                    <span>Cost Calculator</span>
                </a>
                <a href="${pathPrefix}tools/timeline.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">📅</span>
                    <span>Timeline</span>
                </a>
                <a href="${pathPrefix}tools/checklist.html" class="nav-link d-flex align-items-center text-white">
                    <span class="me-2">✓</span>
                    <span>Checklist</span>
                </a>
                <hr class="text-white-50">
                <a href="#" class="nav-link d-flex align-items-center text-white" id="sidebarLogout">
                    <span class="me-2">🚪</span>
                    <span>Logout</span>
                </a>
            </nav>
        </aside>`;
        
        // Set the active link based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const sidebarLinks = sidebarContainer.querySelectorAll('.nav-link');
        
        sidebarLinks.forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentPage)) {
                link.classList.add('active');
            }
        });
        
        // Set user initial, name and role
        const username = localStorage.getItem('username') || 'User';
        const userInitial = sidebarContainer.querySelector('#userInitial');
        if (userInitial) {
            userInitial.textContent = username.charAt(0).toUpperCase();
        }
        
        // Set username and role
        const sidebarUsername = sidebarContainer.querySelector('#sidebarUsername');
        const sidebarUserRole = sidebarContainer.querySelector('#sidebarUserRole');
        
        if (sidebarUsername) {
            sidebarUsername.textContent = username;
        }
        
        if (sidebarUserRole) {
            const userRole = localStorage.getItem('userRole') || 'student';
            sidebarUserRole.textContent = userRole === 'admin' ? 'Administrator' : 'Student';
        }
        
        // Handle logout button
        const sidebarLogoutBtn = sidebarContainer.querySelector('#sidebarLogout');
        if (sidebarLogoutBtn) {
            sidebarLogoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                window.location.href = pathPrefix + 'login.html';
            });
        }
    }
});
