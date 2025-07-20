document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // DOM Elements
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressSteps = document.querySelectorAll('.progress-step');
    const sections = document.querySelectorAll('.preference-section');
    
    // Weight sliders
    const weightSliders = document.querySelectorAll('.weight-control');
    const totalWeightDisplay = document.getElementById('totalWeightDisplay');
    const weightWarning = document.getElementById('weightWarning');
    
    // Range sliders
    const rangeSliders = document.querySelectorAll('.slider');
    
    // Navigation functions
    function showStep(stepNumber) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show current section
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Update progress tracker
        progressSteps.forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum === stepNumber) {
                step.classList.add('active');
            } else if (stepNum < stepNumber) {
                step.classList.add('completed');
            }
        });
        
        // Update buttons
        prevBtn.style.display = stepNumber === 1 ? 'none' : 'block';
        
        if (stepNumber === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });
    
    // Handle range slider value displays
    rangeSliders.forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}Value`);
        
        // Set initial value
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }
        
        // Update on change
        slider.addEventListener('input', function() {
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });
    });
    
    // Handle weight sliders
    function updateTotalWeight() {
        let totalWeight = 0;
        
        weightSliders.forEach(slider => {
            const value = parseInt(slider.value);
            totalWeight += value;
            
            // Update the display for this slider
            const displayElement = document.getElementById(`${slider.id}Value`);
            if (displayElement) {
                displayElement.textContent = value;
            }
        });
        
        // Update total weight display
        totalWeightDisplay.textContent = totalWeight;
        
        // Show warning if not 100
        if (totalWeight !== 100) {
            weightWarning.classList.remove('hidden');
            submitBtn.disabled = true;
        } else {
            weightWarning.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }
    
    // Add event listeners to weight sliders
    weightSliders.forEach(slider => {
        slider.addEventListener('input', updateTotalWeight);
    });
    
    // Form submission handler
    document.getElementById('preferencesForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if weights add up to 100
        let totalWeight = 0;
        weightSliders.forEach(slider => {
            totalWeight += parseInt(slider.value);
        });
        
        if (totalWeight !== 100) {
            alert('Please make sure your weights add up to exactly 100 points.');
            return;
        }
        
        // Here you would collect all form data and process it
        alert('Form submitted successfully! Redirecting to results page...');
        
        // Redirect to results page (you can modify this as needed)
        window.location.href = 'results.html';
    });
    
    // Initialize the form
    showStep(currentStep);
    updateTotalWeight();
});
