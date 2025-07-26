// Load sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px; min-height: 100vh;">
                <a href="dashboard.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-4">Student DSS</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="dashboard.html" class="nav-link text-white" aria-current="page">
                            <i class="fas fa-home me-2"></i>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="preferences.html" class="nav-link text-white">
                            <i class="fas fa-sliders-h me-2"></i>
                            Preferences
                        </a>
                    </li>
                    <li>
                        <a href="results.html" class="nav-link text-white">
                            <i class="fas fa-chart-bar me-2"></i>
                            Results
                        </a>
                    </li>
                    <li>
                        <a href="comparison.html" class="nav-link text-white">
                            <i class="fas fa-balance-scale me-2"></i>
                            Compare
                        </a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://via.placeholder.com/32" alt="User" width="32" height="32" class="rounded-circle me-2">
                        <div>
                            <strong id="sidebarUsername">Admin</strong>
                            <div class="text-white-50 small" id="sidebarUserRole">Administrator</div>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" id="sidebarLogout">Sign out</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
});
