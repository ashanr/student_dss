/**
 * Loads HTML content from a file into a specified element
 * @param {string} url - The URL of the HTML file to load
 * @param {string} elementId - The ID of the element to load the content into
 */
function loadHTMLContent(url, elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID "${elementId}" not found`);
        return;
    }
    
    // Show loading indicator
    element.innerHTML = `
        <div class="d-flex justify-content-center p-3">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            
            // After loading sidebar, highlight current page in nav
            if (elementId === 'sidebar-container') {
                highlightCurrentPage();
            }
            
            // Execute any scripts in the loaded HTML
            const scripts = element.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerText);
            }
        })
        .catch(error => {
            console.error('Error loading HTML content:', error);
            // Display an error message in the container
            element.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Failed to load navigation. Please refresh the page.
                    <small class="d-block mt-2">Error: ${error.message}</small>
                </div>`;
        });
}

// Function to highlight the current page in the navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#sidebar-container .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Extract just the filename to compare
            const currentFile = currentPath.split('/').pop();
            const linkFile = href.split('/').pop();
            
            if (currentFile === linkFile || 
                (currentFile === '' && linkFile === 'dashboard.html') || 
                (currentFile === 'index.html' && linkFile === 'dashboard.html')) {
                link.classList.add('active');
            }
        }
    });
}

// Function to initialize common elements
function initializeCommonElements() {
    // Load sidebar if sidebar container exists
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        loadHTMLContent('common/sidebar.html', 'sidebar-container');
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCommonElements);
