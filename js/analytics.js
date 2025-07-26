// analytics.js: Handles charts and predictions for student migration DSS

document.addEventListener('DOMContentLoaded', function() {
    // Authentication check
    if (typeof checkLoginStatus === 'function') {
        const { isLoggedIn } = checkLoginStatus();
        
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html?redirect=analytics.html';
            return;
        }
    }

    // Initialize sensitivity analysis chart
    initSensitivityChart();
    
    // Initialize popularity chart
    initPopularityChart();
    
    // Initialize cost trends chart
    initCostTrendsChart();
    
    // Handle slider interactions
    setupSliderListeners();
});

// Initialize the sensitivity analysis chart
function initSensitivityChart() {
    const ctx = document.getElementById('sensitivityChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
            datasets: [
                {
                    label: 'Canada',
                    data: [70, 72, 75, 78, 82, 85, 88, 90, 92, 93, 95],
                    borderColor: 'rgb(102, 126, 234)',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Germany',
                    data: [85, 84, 83, 82, 81, 80, 79, 78, 76, 74, 70],
                    borderColor: 'rgb(118, 75, 162)',
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Australia',
                    data: [65, 67, 70, 72, 75, 77, 79, 81, 83, 85, 87],
                    borderColor: 'rgb(45, 152, 218)',
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'How Cost Weight Affects Country Rankings'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Overall Score'
                    },
                    min: 60,
                    max: 100
                },
                x: {
                    title: {
                        display: true,
                        text: 'Cost Weight'
                    }
                }
            }
        }
    });
}

// Initialize popularity chart
function initPopularityChart() {
    const ctx = document.getElementById('popularityChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'],
            datasets: [{
                label: '2023 International Students',
                data: [914000, 605000, 530000, 435000, 330000, 112000],
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
                label: '2022 International Students',
                data: [891000, 580000, 496000, 410000, 320000, 98000],
                backgroundColor: 'rgba(54, 162, 235, 0.3)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'International Student Enrollment by Country'
                }
            }
        }
    });
}

// Initialize cost trends chart
function initCostTrendsChart() {
    const ctx = document.getElementById('costTrendsChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024 (proj)'],
            datasets: [
                {
                    label: 'USA',
                    data: [40000, 42000, 44000, 47000, 50000, 53000],
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                },
                {
                    label: 'UK',
                    data: [35000, 36000, 38000, 39000, 41000, 43000],
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                },
                {
                    label: 'Germany',
                    data: [12000, 12500, 13000, 13500, 14000, 15000],
                    borderColor: 'rgb(255, 205, 86)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Annual Cost of Study (USD)'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Cost in USD'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Set up slider interactions
function setupSliderListeners() {
    // Cost slider
    const costSlider = document.getElementById('costSlider');
    const costWeight = document.getElementById('costWeight');
    
    if (costSlider && costWeight) {
        costSlider.addEventListener('input', function() {
            costWeight.textContent = this.value + '%';
            updateWeights();
        });
    }
    
    // Quality slider
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityWeight = document.getElementById('qualityWeight');
    
    if (qualitySlider && qualityWeight) {
        qualitySlider.addEventListener('input', function() {
            qualityWeight.textContent = this.value + '%';
            updateWeights();
        });
    }
    
    // Safety slider
    const safetySlider = document.getElementById('safetySlider');
    const safetyWeight = document.getElementById('safetyWeight');
    
    if (safetySlider && safetyWeight) {
        safetySlider.addEventListener('input', function() {
            safetyWeight.textContent = this.value + '%';
            updateWeights();
        });
    }
}

// Update weights and check total
function updateWeights() {
    const costValue = parseInt(document.getElementById('costSlider').value);
    const qualityValue = parseInt(document.getElementById('qualitySlider').value);
    const safetyValue = parseInt(document.getElementById('safetySlider').value);
    
    const total = costValue + qualityValue + safetyValue;
    
    // For this demo, we won't enforce the total to be 100%
    // but we could add validation here
}
