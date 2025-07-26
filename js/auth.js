// Authentication logic for Student DSS

// Check if user is already logged in
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    // For backwards compatibility
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true' && !token) {
        // Create mock token for old sessions
        const username = localStorage.getItem('username');
        const userRole = localStorage.getItem('userRole');
        if (username) {
            localStorage.setItem('token', 'legacy-token');
            localStorage.setItem('user', JSON.stringify({username, role: userRole || 'guest'}));
            return { isLoggedIn: 'true', userRole: userRole || 'guest', username };
        }
    }
    
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
            
            // FOR DEMO PURPOSES: Direct login for admin/admin
            if (username === 'admin' && password === 'admin') {
                console.log('Admin login successful');
                
                // Store login info
                const userData = {
                    id: 1,
                    username: 'admin',
                    role: 'admin'
                };
                
                localStorage.setItem('token', 'demo-admin-token');
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Also set the individual fields for backward compatibility
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('username', userData.username);
                
                // Show success message
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.className = 'login-message success';
                
                // Redirect to dashboard
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
                return;
            }
            
            // FOR DEMO PURPOSES: Direct login for guest/guest
            if (username === 'guest' && password === 'guest') {
                console.log('Guest login successful');
                
                // Store login info
                const userData = {
                    id: 2,
                    username: 'guest',
                    role: 'guest'
                };
                
                localStorage.setItem('token', 'demo-guest-token');
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Also set the individual fields for backward compatibility
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('username', userData.username);
                
                // Show success message
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.className = 'login-message success';
                
                // Redirect to dashboard
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
                return;
            }
            
            // Call login API (try to, may fail in development)
            try {
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
                        
                        // Also set the individual fields for backward compatibility
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userRole', data.user.role);
                        localStorage.setItem('username', data.user.username);
                        
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
                        console.log('Login failed:', data);
                    }
                })
                .catch(error => {
                    console.error('Login API error:', error);
                    loginMessage.textContent = 'Invalid username or password. Try admin/admin or guest/guest.';
                    loginMessage.className = 'login-message error';
                });
            } catch (err) {
                console.error('Login attempt error:', err);
                loginMessage.textContent = 'Invalid username or password. Try admin/admin or guest/guest.';
                loginMessage.className = 'login-message error';
            }
        });
    }
    
    // Handle guest login button
    const guestLoginBtn = document.getElementById('guestLoginBtn');
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // FOR DEMO PURPOSES: Direct login for guest
            console.log('Guest login (via button) successful');
            
            // Store login info
            const userData = {
                id: 2,
                username: 'guest',
                role: 'guest'
            };
            
            localStorage.setItem('token', 'demo-guest-token');
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Also set the individual fields for backward compatibility
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', userData.role);
            localStorage.setItem('username', userData.username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Handle logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performLogout();
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

// Logout function that can be called from anywhere
function performLogout() {
    console.log("performLogout function called");
    // Call the server API to logout (if available)
    try {
        fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .catch(error => console.warn('Logout API error:', error))
        .finally(() => {
            // Always clear local storage and redirect regardless of API response
            clearLoginDataAndRedirect();
        });
    } catch (e) {
        console.warn('Error during logout API call:', e);
        // Continue with local logout even if API call fails
        clearLoginDataAndRedirect();
    }
}

// Make performLogout available in the global scope
window.performLogout = performLogout;

// Clear local data and redirect
function clearLoginDataAndRedirect() {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    
    // Redirect to login page
    window.location.href = 'login.html';
}
