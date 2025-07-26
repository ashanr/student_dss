document.addEventListener('DOMContentLoaded', function() {
    // Load form data and match scores from localStorage
    const formData = JSON.parse(localStorage.getItem('dssFormData') || '{}');
    const matchScores = JSON.parse(localStorage.getItem('dssMatchScores') || '{}');
    
    // Update summary section
    updateSummarySection(formData);
    
    // Initialize view and filter handlers
    initializeViewButtons();
    initializeFilterHandlers();
    
    // Load university data based on match scores
    loadUniversityData();
    
    // Display countries based on match scores
    displayCountryResults(matchScores);
});

function updateSummarySection(formData) {
    // Update the header statistics based on form data
    const timestamp = new Date(formData.timestamp || Date.now());
    
    // Format date in a readable way
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = timestamp.toLocaleDateString(undefined, dateOptions);
    
    // Add a small summary at the top
    const summaryElement = document.createElement('div');
    summaryElement.className = 'alert alert-info mb-4';
    summaryElement.innerHTML = `
        <h4 class="alert-heading">Your Results Summary</h4>
        <p>Based on your profile as a <strong>${formData.profile?.education || 'degree'}</strong> 
        student in <strong>${formData.profile?.field || 'your field'}</strong>, we've analyzed 
        potential study destinations.</p>
        <p class="mb-0">Results generated on <strong>${formattedDate}</strong></p>
    `;
    
    // Insert the summary before the filter card
    const filterCard = document.querySelector('.card.mb-4');
    if (filterCard && filterCard.parentNode) {
        filterCard.parentNode.insertBefore(summaryElement, filterCard);
    }
}

function displayCountryResults(matchScores) {
    const resultsGrid = document.getElementById('resultsGrid');
    if (!resultsGrid) return;
    
    // Clear existing content
    resultsGrid.innerHTML = '';
    
    // Sort countries by match score
    const sortedCountries = Object.entries(matchScores)
        .sort((a, b) => b[1] - a[1]);
    
    // Get country data from data.js or use mock data if not available
    const countriesData = window.countriesData || getMockCountryData();
    
    // Generate cards for each country
    sortedCountries.forEach(([countryId, score]) => {
        const countryData = countriesData[countryId] || {
            name: countryId.charAt(0).toUpperCase() + countryId.slice(1),
            region: 'Unknown',
            flag: getCountryFlag(countryId),
            cost: Math.floor(Math.random() * 50000) + 20000,
            quality: (Math.random() * 2 + 7).toFixed(1),
            visa: ['Easy', 'Moderate', 'Difficult'][Math.floor(Math.random() * 3)]
        };
        
        // Create card element
        const card = document.createElement('div');
        card.className = 'col-lg-6 col-xl-4';
        card.dataset.country = countryId;
        
        // Calculate progress bar percentages for metrics
        const costScore = 100 - (countryData.cost / 80000 * 100);
        const qualityScore = parseFloat(countryData.quality) * 10;
        const visaScore = countryData.visa === 'Easy' ? 90 : (countryData.visa === 'Moderate' ? 70 : 50);
        
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="fs-3 me-3">${countryData.flag}</div>
                            <div>
                                <h3 class="mb-0 fs-5">${countryData.name}</h3>
                                <p class="text-muted mb-0 small">${countryData.region}</p>
                            </div>
                        </div>
                        <div>
                            <span class="badge bg-success fs-6">${score}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="key-metrics mb-3">
                        <div class="metric mb-2">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="metric-label">Cost</span>
                                <span class="metric-value">$${(countryData.cost/1000).toFixed(0)}K/year</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${costScore}%" 
                                    aria-valuenow="${costScore}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="metric mb-2">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="metric-label">Quality</span>
                                <span class="metric-value">${countryData.quality}/10</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${qualityScore}%" 
                                    aria-valuenow="${qualityScore}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="metric">
                            <div class="d-flex justify-content-between mb-1">
                                <span class="metric-label">Visa Ease</span>
                                <span class="metric-value">${countryData.visa}</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${visaScore}%" 
                                    aria-valuenow="${visaScore}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="highlights mb-3">
                        ${getCountryHighlights(countryId)}
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary" onclick="addToCompare('${countryId}')">
                            <i class="fas fa-balance-scale me-1"></i> Add to Compare
                        </button>
                        <button class="btn btn-primary" onclick="viewDetails('${countryId}')">
                            <i class="fas fa-info-circle me-1"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        resultsGrid.appendChild(card);
    });
    
    // Also update the table view
    updateTableView(sortedCountries, countriesData);
}

function getCountryFlag(countryId) {
    const flagMap = {
        'canada': '🇨🇦',
        'germany': '🇩🇪',
        'australia': '🇦🇺',
        'uk': '🇬🇧',
        'netherlands': '🇳🇱',
        'sweden': '🇸🇪',
        'usa': '🇺🇸',
        'france': '🇫🇷',
        'spain': '🇪🇸',
        'italy': '🇮🇹',
        'japan': '🇯🇵',
        'singapore': '🇸🇬'
    };
    
    return flagMap[countryId] || '🏳️';
}

function getCountryHighlights(countryId) {
    const highlights = {
        'canada': [
            '<span class="badge bg-success me-1">Strong Job Market</span>',
            '<span class="badge bg-success me-1">High QoL</span>',
            '<span class="badge bg-info">Moderate Cost</span>'
        ],
        'germany': [
            '<span class="badge bg-success me-1">Low Cost</span>',
            '<span class="badge bg-success me-1">Strong Engineering</span>',
            '<span class="badge bg-info">EU Access</span>'
        ],
        'australia': [
            '<span class="badge bg-success me-1">High Pay</span>',
            '<span class="badge bg-success me-1">English-Speaking</span>',
            '<span class="badge bg-warning">High Cost</span>'
        ],
        'uk': [
            '<span class="badge bg-success me-1">Top Universities</span>',
            '<span class="badge bg-success me-1">English-Speaking</span>',
            '<span class="badge bg-warning">High Cost</span>'
        ]
    };
    
    return highlights[countryId]?.join('') || 
        '<span class="badge bg-secondary me-1">Data Pending</span>';
}

function getMockCountryData() {
    return {
        'canada': {
            name: 'Canada',
            region: 'North America',
            flag: '🇨🇦',
            cost: 45000,
            quality: 8.8,
            visa: 'Moderate'
        },
        'germany': {
            name: 'Germany',
            region: 'Europe',
            flag: '🇩🇪',
            cost: 25000,
            quality: 8.5,
            visa: 'Easy'
        },
        'australia': {
            name: 'Australia',
            region: 'Oceania',
            flag: '🇦🇺',
            cost: 50000,
            quality: 8.6,
            visa: 'Moderate'
        },
        'uk': {
            name: 'United Kingdom',
            region: 'Europe',
            flag: '🇬🇧',
            cost: 55000,
            quality: 9.0,
            visa: 'Moderate'
        },
        'netherlands': {
            name: 'Netherlands',
            region: 'Europe',
            flag: '🇳🇱',
            cost: 30000,
            quality: 8.7,
            visa: 'Easy'
        },
        'sweden': {
            name: 'Sweden',
            region: 'Europe',
            flag: '🇸🇪',
            cost: 28000,
            quality: 8.9,
            visa: 'Moderate'
        }
    };
}

function updateTableView(sortedCountries, countriesData) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Generate rows for each country
    sortedCountries.forEach(([countryId, score], index) => {
        const countryData = countriesData[countryId] || {
            name: countryId.charAt(0).toUpperCase() + countryId.slice(1),
            flag: getCountryFlag(countryId),
            cost: Math.floor(Math.random() * 30 + 60),
            quality: Math.floor(Math.random() * 20 + 70),
            safety: Math.floor(Math.random() * 15 + 75)
        };
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><span class="country-flag me-2">${countryData.flag}</span> ${countryData.name}</td>
            <td><strong class="text-success">${score}%</strong></td>
            <td>${countryData.cost}%</td>
            <td>${countryData.quality}%</td>
            <td>${countryData.safety || 85}%</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="addToCompare('${countryId}')">
                    <i class="fas fa-balance-scale"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="viewDetails('${countryId}')">
                    <i class="fas fa-info-circle"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Initialize view buttons
function initializeViewButtons() {
    // View switching functionality
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Get the view type
            const viewType = this.getAttribute('data-view');
            const currentLevel = document.querySelector('.level-btn.active').getAttribute('data-level');
            
            // Hide all views
            document.getElementById('resultsGrid').classList.add('d-none');
            document.getElementById('universityGrid').classList.add('d-none');
            document.getElementById('resultsTable').classList.add('d-none');
            document.getElementById('universityTable').classList.add('d-none');
            document.getElementById('resultsMap').classList.add('d-none');
            
            // Show selected view based on level
            if (currentLevel === 'country') {
                if (viewType === 'cards') {
                    document.getElementById('resultsGrid').classList.remove('d-none');
                } else if (viewType === 'table') {
                    document.getElementById('resultsTable').classList.remove('d-none');
                } else if (viewType === 'map') {
                    document.getElementById('resultsMap').classList.remove('d-none');
                }
            } else {
                if (viewType === 'cards') {
                    document.getElementById('universityGrid').classList.remove('d-none');
                } else if (viewType === 'table') {
                    document.getElementById('universityTable').classList.remove('d-none');
                } else if (viewType === 'map') {
                    document.getElementById('resultsMap').classList.remove('d-none');
                }
            }
        });
    });

    // Level switching functionality
    document.querySelectorAll('.level-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Code exists in the results page already
        });
    });
}

// Initialize filter handlers
function initializeFilterHandlers() {
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetDisplay = document.getElementById('budgetDisplay');
    
    if (budgetSlider && budgetDisplay) {
        budgetSlider.addEventListener('input', function() {
            budgetDisplay.textContent = this.value;
        });
    }
}
