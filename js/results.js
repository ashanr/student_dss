// Results page functionality
class ResultsManager {
    constructor() {
        this.currentView = 'cards';
        this.countries = this.loadCountryData();
        this.filters = {
            region: 'all',
            budget: 80000
        };
        this.initializeEventListeners();
        this.renderResults();
    }

    loadCountryData() {
        // Sample data - replace with actual data from your CSV
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
            // Add more countries...
        ];
    }

    initializeEventListeners() {
        // View switching
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Filter controls
        document.getElementById('regionFilter').addEventListener('change', (e) => {
            this.filters.region = e.target.value;
            this.renderResults();
        });

        document.getElementById('budgetSlider').addEventListener('input', (e) => {
            this.filters.budget = parseInt(e.target.value);
            document.getElementById('budgetDisplay').textContent = e.target.value;
            this.renderResults();
        });
    }

    switchView(viewType) {
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewType}"]`).classList.add('active');

        // Show/hide content
        document.queryS
