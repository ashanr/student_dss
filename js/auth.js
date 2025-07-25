// Authentication logic for Student DSS

// Check if user is already logged in
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (!token || !userJson) {
        return { isLoggedIn: 'false' };
    }
    
    try {
        const user = JSON.parse(userJson);
        return { 
            isLoggedIn: 'true', 
            userRole: user.role,
            username: user.username
        };
    } catch (e) {
        console.error('Error parsing user data:', e);
        return { isLoggedIn: 'false' };
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');
            
            // Show loading state
            loginMessage.textContent = 'Logging in...';
            loginMessage.className = 'login-message info';
            
            // Call login API
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store token and user info
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Show success message
                    loginMessage.textContent = 'Login successful! Redirecting...';
                    loginMessage.className = 'login-message success';
                    
                    // Redirect to dashboard
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    // Show error message
                    loginMessage.textContent = data.message || 'Invalid username or password';
                    loginMessage.className = 'login-message error';
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                loginMessage.textContent = 'An error occurred. Please try again.';
                loginMessage.className = 'login-message error';
            });
        });
    }
    
    // Handle guest login button
    const guestLoginBtn = document.getElementById('guestLoginBtn');
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Call login API with guest credentials
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: 'guest', password: 'guest' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store token and user info
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Guest login failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Guest login error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
    
    // Handle logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Call logout API
            fetch('/api/auth/logout')
            .then(() => {
                // Clear local storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to login page
                window.location.href = 'login.html';
            })
            .catch(error => {
                console.error('Logout error:', error);
                
                // Force logout even if API fails
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            });
        });
    }
    
    // Update navigation based on login status
    updateNavigation();
});

// Update navigation elements based on login status
function updateNavigation() {
    const { isLoggedIn, userRole } = checkLoginStatus();
    
    // Get navigation elements that need to be updated
    const loginStatusElement = document.getElementById('loginStatus');
    const adminDashboardLink = document.getElementById('adminDashboardLink');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn === 'true') {
        // User is logged in
        const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : 'User';
        
        if (loginStatusElement) {
            loginStatusElement.textContent = `Logged in as: ${username}`;
            loginStatusElement.style.display = 'block';
        }
        
        if (adminDashboardLink && userRole === 'admin') {
            adminDashboardLink.style.display = 'block';
        }
        
        if (adminLoginBtn) {
            adminLoginBtn.style.display = 'none';
        }
        
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
    } else {
        // User is not logged in
        if (loginStatusElement) {
            loginStatusElement.style.display = 'none';
        }
        
        if (adminDashboardLink) {
            adminDashboardLink.style.display = 'none';
        }
        
        if (adminLoginBtn) {
            adminLoginBtn.style.display = 'block';
        }
        
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
}
