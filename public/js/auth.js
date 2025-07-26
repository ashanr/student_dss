// Basic authentication script
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple demo authentication
            if (username === 'admin' && password === 'admin') {
                // Store user info
                const userData = {
                    id: 1,
                    username: 'admin',
                    role: 'admin'
                };
                
                localStorage.setItem('token', 'demo-admin-token');
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('username', userData.username);
                
                // Check if we have a redirect
                const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'dashboard.html';
                localStorage.removeItem('redirectAfterLogin');
                
                // Show success message and redirect
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.className = 'alert alert-success mb-4';
                
                setTimeout(function() {
                    window.location.href = redirectUrl;
                }, 1000);
            } else {
                // Show error message
                loginMessage.textContent = 'Invalid username or password';
                loginMessage.className = 'alert alert-danger mb-4';
            }
        });
    }
});
