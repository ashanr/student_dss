// Results page functionality
class ResultsManager {
    constructor() {
        this.currentView = 'cards';
        this.countries = [];
        this.filters = {
            region: 'all',
            budget: 80000
        };
        this.initializeEventListeners();
        this.loadCountryData();
    }

    loadCountryData() {
        // Fetch countries from API
        fetch('/api/countries')
            .then(response => response.json())
            .then(data => {
                this.countries = data;
                this.renderResults();
            })
            .catch(error => {
                console.error('Error loading country data:', error);
                // Fallback to sample data if API fails
                this.countries = this.getSampleData();
                this.renderResults();
            });
    }

    getSampleData() {
        // Sample data as fallback
        return [
            {
                id: 'canada',
                name: 'Canada',
                flag: '🇨🇦',
                region: 'north-america',
                score: 92,
                cost: 45000,
                quality: 8.8,
                safety: 9.0,
                visaEase: 'Moderate',
                highlights: ['Strong Job Market', 'High QoL', 'Moderate Cost']
            },
            {
                id: 'germany',
                name: 'Germany',
                flag: '🇩🇪',
                region: 'europe',
                score: 89,
                cost: 25000,
                quality: 8.5,
                safety: 8.7,
                visaEase: 'Easy',
                highlights: ['Low Cost', 'Strong Engineering', 'EU Access']
            }
        ];
    }

    initializeEventListeners() {
        // View switching
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.closest('.view-btn').dataset.view);
            });
        });

        // Filter controls
        document.getElementById('regionFilter')?.addEventListener('change', (e) => {
            this.filters.region = e.target.value;
            this.applyFilters();
        });

        document.getElementById('budgetSlider')?.addEventListener('input', (e) => {
            this.filters.budget = parseInt(e.target.value);
            document.getElementById('budgetDisplay').textContent = e.target.value;
            this.applyFilters();
        });
    }

    applyFilters() {
        // Call API with filters
        fetch('/api/countries/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(this.filters)
        })
        .then(response => response.json())
        .then(data => {
            this.countries = data;
            this.renderResults();
        })
        .catch(error => {
            console.error('Error applying filters:', error);
            
            // Apply filters locally as fallback
            let filtered = [...this.countries];
            
            if (this.filters.region !== 'all') {
                filtered = filtered.filter(c => c.region === this.filters.region);
            }
            
            filtered = filtered.filter(c => c.cost <= this.filters.budget);
            
            this.filteredCountries = filtered;
            this.renderResults();
        });
    }

    switchView(viewType) {
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewType}"]`).classList.add('active');
        
        this.currentView = viewType;

        // Show/hide content
        document.getElementById('resultsGrid').classList.add('d-none');
        document.getElementById('resultsTable').classList.add('d-none');
        document.getElementById('resultsMap').classList.add('d-none');
        
        // Show selected view
        document.getElementById(`results${viewType.charAt(0).toUpperCase() + viewType.slice(1)}`).classList.remove('d-none');
        
        // Initialize map if map view is selected
        if (viewType === 'map') {
            this.initializeMap();
        }
    }

    initializeMap() {
        // Map initialization would go here
        // This is a placeholder - actual implementation depends on the map library you choose
        console.log('Map initialized');
    }

    renderResults() {
        this.renderCardsView();
        this.renderTableView();
    }

    renderCardsView() {
        const grid = document.getElementById('resultsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.countries.forEach(country => {
            const card = this.createCountryCard(country);
            grid.appendChild(card);
        });
    }

    createCountryCard(country) {
        const col = document.createElement('div');
        col.className = 'col-lg-6 col-xl-4';
        col.dataset.country = country.id;
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-header bg-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="fs-3 me-3">${country.flag}</div>
                            <div>
                                <h3 class="mb-0 fs-5">${country.name}</h3>
                                <p class="text-muted mb-0 small">${this.getRegionName(country.region)}</p>
                            </div>
                        </div>
                        <div>
                            <span class="badge bg-success fs-6">${country.score}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="mb-3">
                        <div class="mb-2">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Cost</span>
                                <span class="fw-bold">$${(country.cost/1000).toFixed(0)}K/year</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${this.getInverseCostPercentage(country.cost)}%" aria-valuenow="${this.getInverseCostPercentage(country.cost)}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="d-flex justify-content-between mb-1">
                                <span>Quality</span>
                                <span class="fw-bold">${country.quality}/10</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${country.quality * 10}%" aria-valuenow="${country.quality * 10}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between mb-1">
                                <span>Visa Ease</span>
                                <span class="fw-bold">${country.visaEase}</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" style="width: ${this.getVisaEasePercentage(country.visaEase)}%" aria-valuenow="${this.getVisaEasePercentage(country.visaEase)}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="highlights mb-3">
                        ${country.highlights.map(h => `<span class="badge bg-success me-1">${h}</span>`).join('')}
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary" onclick="addToCompare('${country.id}')">
                            <i class="fas fa-balance-scale me-1"></i> Add to Compare
                        </button>
                        <button class="btn btn-primary" onclick="viewDetails('${country.id}')">
                            <i class="fas fa-info-circle me-1"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }

    renderTableView() {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        this.countries.forEach((country, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="me-2">${country.flag}</span> ${country.name}</td>
                <td><strong class="text-success">${country.score}%</strong></td>
                <td>${this.getInverseCostPercentage(country.cost)}%</td>
                <td>${country.quality * 10}%</td>
                <td>${country.safety * 10}%</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="addToCompare('${country.id}')">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="viewDetails('${country.id}')">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    getRegionName(regionId) {
        const regions = {
            'north-america': 'North America',
            'europe': 'Europe',
            'asia-pacific': 'Asia Pacific',
            'middle-east': 'Middle East',
            'africa': 'Africa',
            'latin-america': 'Latin America'
        };
        
        return regions[regionId] || regionId;
    }

    getInverseCostPercentage(cost) {
        // Lower cost is better, so invert the percentage
        const maxCost = 100000;
        return Math.max(0, Math.min(100, Math.round((maxCost - cost) / maxCost * 100)));
    }

    getVisaEasePercentage(ease) {
        const easeValues = {
            'Easy': 90,
            'Moderate': 70,
            'Difficult': 40,
            'Very Difficult': 20
        };
        
        return easeValues[ease] || 50;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const resultsManager = new ResultsManager();
    
    // Define global functions
    window.addToCompare = (countryId) => {
        // Get current compare list from localStorage or create empty array
        const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
        
        // Check if country is already in the list
        if (!compareList.includes(countryId)) {
            // Add to list if not already there
            compareList.push(countryId);
            localStorage.setItem('compareList', JSON.stringify(compareList));
            alert(`Added ${countryId} to comparison list`);
        } else {
            alert(`${countryId} is already in your comparison list`);
        }
    };
    
    window.viewDetails = (countryId) => {
        window.location.href = `country-details.html?id=${countryId}`;
    };
});
