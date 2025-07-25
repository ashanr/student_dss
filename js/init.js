/**
 * Initialization script for the Student DSS application
 * Handles routing decisions and authentication flow
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if we have auth.js functionality available
    if (typeof checkLoginStatus === 'function') {
        const { isLoggedIn } = checkLoginStatus();
        
        // Get current path
        const currentPath = window.location.pathname;
        
        // Define paths that require authentication
        const authRequiredPaths = [
            '/dashboard.html',
            '/preferences.html',
            '/results.html',
            '/comparison.html',
            '/analytics.html',
            '/tools/'
        ];
        
        // Check if current path requires authentication
        const requiresAuth = authRequiredPaths.some(path => currentPath.startsWith(path));
        
        // Handle redirect logic
        if (requiresAuth && isLoggedIn !== 'true') {
            // User is trying to access a protected page without login
            const redirectUrl = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
            window.location.href = redirectUrl;
        } else if (currentPath === '/' || currentPath === '/index.html') {
            // User is on the home page
            if (isLoggedIn === 'true') {
                // If already logged in and on home page, redirect to dashboard
                window.location.href = '/dashboard.html';
            }
            // Otherwise, stay on the home page with the decision process
        }
    } else {
        console.warn('Authentication module not loaded');
    }
    
    // Initialize URL parameter handling
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    // Set redirect target in login/register forms if needed
    const loginForm = document.getElementById('loginForm');
    if (loginForm && redirect) {
        const redirectInput = document.createElement('input');
        redirectInput.type = 'hidden';
        redirectInput.name = 'redirect';
        redirectInput.value = redirect;
        loginForm.appendChild(redirectInput);
        
        // Also update any success handlers
        loginForm.addEventListener('submit', function(e) {
            // Add redirect to successful login logic
            const originalOnSuccess = loginForm.onsubmit;
            loginForm.onsubmit = function(e) {
                if (originalOnSuccess) {
                    originalOnSuccess(e);
                }
                // Add redirection after successful login
                if (redirect) {
                    setTimeout(() => {
                        window.location.href = redirect;
                    }, 1000);
                }
            };
        });
    }
});
