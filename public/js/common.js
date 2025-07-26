document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar into the sidebar container
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        fetch('/common/sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
            });
    }
});
