/**
 * Dashboard JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cost chart
    const costChartCanvas = document.getElementById('costChart');
    if (costChartCanvas) {
        const costChart = new Chart(costChartCanvas, {
            type: 'bar',
            data: {
                labels: ['Canada', 'Germany', 'Australia'],
                datasets: [{
                    label: 'Tuition Fees (USD)',
                    data: [25000, 10000, 22000],
                    backgroundColor: 'rgba(13, 110, 253, 0.7)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 1
                }, {
                    label: 'Living Expenses (USD)',
                    data: [15000, 12000, 18000],
                    backgroundColor: 'rgba(25, 135, 84, 0.7)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 1
                }, {
                    label: 'Other Costs (USD)',
                    data: [5000, 3000, 7000],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Annual Cost Comparison (USD)'
                    }
                },
                scales: {
                    x: {
                        stacked: false,
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Handle navbar toggle for mobile view
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            // If we're using an offcanvas sidebar
            const sidebarMenu = document.getElementById('sidebar-container');
            if (sidebarMenu) {
                sidebarMenu.classList.toggle('show');
            }
        });
    }
    
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});
