-- Test data for countries table

-- Clean up existing data
TRUNCATE TABLE countries CASCADE;

-- Insert country data
INSERT INTO countries (id, name, flag, region, score, cost, quality, safety, visa_ease, highlights, language, currency_code, created_at, updated_at)
VALUES 
('canada', 'Canada', '🇨🇦', 'north-america', 92, 45000, 8.8, 9.0, 'Moderate', ARRAY['Strong Job Market', 'High QoL', 'Moderate Cost'], 'English', 'CAD', NOW(), NOW()),
('usa', 'United States', '🇺🇸', 'north-america', 90, 55000, 9.2, 7.8, 'Challenging', ARRAY['Top Universities', 'Research Opportunities', 'Career Growth'], 'English', 'USD', NOW(), NOW()),
('uk', 'United Kingdom', '🇬🇧', 'europe', 88, 48000, 9.0, 8.5, 'Moderate', ARRAY['Historic Universities', 'English Speaking', 'Cultural Experience'], 'English', 'GBP', NOW(), NOW()),
('germany', 'Germany', '🇩🇪', 'europe', 89, 25000, 8.5, 8.7, 'Easy', ARRAY['Low Cost', 'Strong Engineering', 'EU Access'], 'German', 'EUR', NOW(), NOW()),
('australia', 'Australia', '🇦🇺', 'asia-pacific', 87, 40000, 8.6, 8.9, 'Moderate', ARRAY['Quality Education', 'High QoL', 'English Speaking'], 'English', 'AUD', NOW(), NOW()),
('france', 'France', '🇫🇷', 'europe', 84, 28000, 8.4, 8.0, 'Moderate', ARRAY['Cultural Heritage', 'Affordable', 'Cuisine'], 'French', 'EUR', NOW(), NOW()),
('netherlands', 'Netherlands', '🇳🇱', 'europe', 86, 32000, 8.7, 8.8, 'Easy', ARRAY['English Programs', 'Bike-Friendly', 'Innovation'], 'Dutch', 'EUR', NOW(), NOW()),
('japan', 'Japan', '🇯🇵', 'asia', 83, 35000, 8.5, 9.2, 'Challenging', ARRAY['Advanced Technology', 'Cultural Richness', 'Safety'], 'Japanese', 'JPY', NOW(), NOW()),
('singapore', 'Singapore', '🇸🇬', 'asia', 85, 42000, 8.9, 9.5, 'Moderate', ARRAY['Education Hub', 'Clean City', 'Business Hub'], 'English', 'SGD', NOW(), NOW()),
('new_zealand', 'New Zealand', '🇳🇿', 'asia-pacific', 84, 38000, 8.3, 9.3, 'Easy', ARRAY['Work-Life Balance', 'Natural Beauty', 'English Speaking'], 'English', 'NZD', NOW(), NOW()),
('sweden', 'Sweden', '🇸🇪', 'europe', 82, 30000, 8.7, 9.0, 'Easy', ARRAY['Free Education (EU)', 'Innovation', 'Quality of Life'], 'Swedish', 'SEK', NOW(), NOW()),
('switzerland', 'Switzerland', '🇨🇭', 'europe', 85, 50000, 9.1, 9.3, 'Moderate', ARRAY['Academic Excellence', 'Multilingual', 'High Salaries'], 'German/French/Italian', 'CHF', NOW(), NOW()),
('spain', 'Spain', '🇪🇸', 'europe', 80, 26000, 8.2, 8.5, 'Easy', ARRAY['Affordable', 'Cultural Experience', 'Mediterranean Lifestyle'], 'Spanish', 'EUR', NOW(), NOW()),
('south_korea', 'South Korea', '🇰🇷', 'asia', 81, 32000, 8.4, 8.7, 'Moderate', ARRAY['Tech Innovation', 'K-Culture', 'Scholarships'], 'Korean', 'KRW', NOW(), NOW()),
('italy', 'Italy', '🇮🇹', 'europe', 79, 28000, 8.0, 8.2, 'Moderate', ARRAY['Art & Design', 'Cultural Heritage', 'Food'], 'Italian', 'EUR', NOW(), NOW()),
('ireland', 'Ireland', '🇮🇪', 'europe', 83, 40000, 8.5, 8.8, 'Easy', ARRAY['English Speaking', 'Tech Hub', 'Post-Study Work'], 'English', 'EUR', NOW(), NOW()),
('china', 'China', '🇨🇳', 'asia', 78, 20000, 8.0, 7.8, 'Challenging', ARRAY['Scholarships', 'Economic Power', 'Cultural Experience'], 'Mandarin', 'CNY', NOW(), NOW()),
('denmark', 'Denmark', '🇩🇰', 'europe', 84, 34000, 8.8, 9.2, 'Easy', ARRAY['Free Education (EU)', 'Quality of Life', 'Work-Life Balance'], 'Danish', 'DKK', NOW(), NOW()),
('finland', 'Finland', '🇫🇮', 'europe', 83, 28000, 8.9, 9.4, 'Easy', ARRAY['Free Education (EU)', 'Innovation', 'Happiness Index'], 'Finnish', 'EUR', NOW(), NOW()),
('malaysia', 'Malaysia', '🇲🇾', 'asia', 75, 18000, 7.8, 7.9, 'Easy', ARRAY['Affordable', 'English Medium', 'Cultural Diversity'], 'Malay/English', 'MYR', NOW(), NOW());

-- Additional country details (create this table if it doesn't exist)
CREATE TABLE IF NOT EXISTS country_details (
    country_id VARCHAR(100) PRIMARY KEY REFERENCES countries(id),
    avg_tuition_undergrad INTEGER,
    avg_tuition_postgrad INTEGER,
    avg_living_cost INTEGER,
    work_rights VARCHAR(255),
    post_study_work BOOLEAN,
    visa_success_rate DECIMAL(4,2),
    scholarships_availability TEXT,
    healthcare_quality INTEGER,
    internet_speed INTEGER,
    avg_temperature DECIMAL(4,1)
);

-- Insert country details
INSERT INTO country_details 
(country_id, avg_tuition_undergrad, avg_tuition_postgrad, avg_living_cost, work_rights, post_study_work, visa_success_rate, scholarships_availability, healthcare_quality, internet_speed, avg_temperature)
VALUES
('canada', 25000, 30000, 15000, 'Up to 20 hours/week', TRUE, 0.85, 'High - Government and university scholarships available', 9, 180, 6.5),
('usa', 35000, 40000, 18000, 'Up to 20 hours/week on campus', TRUE, 0.72, 'Medium - Mostly merit-based scholarships', 8, 200, 12.0),
('uk', 28000, 32000, 15000, 'Up to 20 hours/week', TRUE, 0.82, 'Medium - Chevening and university scholarships', 9, 210, 9.0),
('germany', 5000, 8000, 12000, 'Up to 120 full days or 240 half days per year', TRUE, 0.88, 'High - DAAD scholarships widely available', 9, 160, 9.5),
('australia', 25000, 28000, 17000, 'Up to 40 hours per fortnight', TRUE, 0.80, 'Medium - Australia Awards available', 9, 150, 21.5),
('france', 6000, 10000, 12000, 'Up to 964 hours per year', TRUE, 0.75, 'Medium - Eiffel Excellence Scholarship Program', 9, 180, 12.5),
('netherlands', 12000, 15000, 12000, 'Up to 16 hours per week', TRUE, 0.85, 'Medium - Orange Tulip Scholarship', 9, 190, 10.0),
('japan', 15000, 18000, 12000, 'Up to 28 hours per week', TRUE, 0.70, 'High - MEXT Scholarship program', 9, 200, 14.5),
('singapore', 25000, 30000, 15000, 'Up to 16 hours per week', TRUE, 0.80, 'Medium - Various university scholarships', 10, 230, 27.5),
('new_zealand', 22000, 25000, 15000, 'Up to 20 hours per week', TRUE, 0.85, 'Medium - Various university scholarships', 9, 160, 15.0),
('sweden', 15000, 18000, 12000, 'No limit for EU, others varying', TRUE, 0.90, 'Medium - Swedish Institute Scholarships', 10, 200, 6.0),
('switzerland', 28000, 32000, 18000, 'Up to 15 hours per week', TRUE, 0.80, 'Medium - Swiss Government Excellence Scholarships', 10, 210, 8.5),
('spain', 8000, 12000, 10000, 'Up to 20 hours per week', TRUE, 0.78, 'Low - Limited scholarship opportunities', 8, 170, 15.0),
('south_korea', 12000, 15000, 10000, 'Up to 20 hours per week', TRUE, 0.75, 'High - Global Korea Scholarship', 8, 220, 12.5),
('italy', 8000, 12000, 10000, 'Up to 20 hours per week', FALSE, 0.72, 'Low - Limited scholarship opportunities', 8, 150, 14.5),
('ireland', 22000, 25000, 12000, 'Up to 20 hours per week', TRUE, 0.85, 'Medium - Government of Ireland Scholarship', 8, 190, 9.5),
('china', 8000, 10000, 8000, 'Up to 20 hours per week', FALSE, 0.65, 'High - Chinese Government Scholarship', 7, 180, 15.0),
('denmark', 15000, 18000, 15000, 'Up to 20 hours per week', TRUE, 0.90, 'Medium - Danish Government Scholarships', 9, 210, 8.0),
('finland', 12000, 15000, 12000, 'Up to 25 hours per week', TRUE, 0.88, 'Medium - Finnish Government Scholarship Pool', 9, 180, 5.5),
('malaysia', 6000, 8000, 8000, 'Up to 20 hours per week', TRUE, 0.80, 'Medium - Malaysia International Scholarship', 7, 150, 28.0);
