-- Test data for cities table

-- Clean up existing data
TRUNCATE TABLE cities CASCADE;

-- Insert city data
INSERT INTO cities (name, country, cost_of_living_index, quality_of_life_index, student_friendly_score, created_at, updated_at)
VALUES
-- Canada
('Toronto', 'Canada', 85, 92, 88, NOW(), NOW()),
('Vancouver', 'Canada', 90, 95, 90, NOW(), NOW()),
('Montreal', 'Canada', 75, 90, 92, NOW(), NOW()),
('Ottawa', 'Canada', 80, 88, 85, NOW(), NOW()),
('Calgary', 'Canada', 78, 85, 82, NOW(), NOW()),

-- USA
('Boston', 'United States', 92, 88, 95, NOW(), NOW()),
('New York', 'United States', 100, 85, 90, NOW(), NOW()),
('San Francisco', 'United States', 98, 87, 88, NOW(), NOW()),
('Chicago', 'United States', 88, 84, 86, NOW(), NOW()),
('Los Angeles', 'United States', 95, 83, 85, NOW(), NOW()),

-- UK
('London', 'United Kingdom', 95, 88, 92, NOW(), NOW()),
('Edinburgh', 'United Kingdom', 85, 90, 94, NOW(), NOW()),
('Manchester', 'United Kingdom', 80, 85, 88, NOW(), NOW()),
('Oxford', 'United Kingdom', 90, 92, 95, NOW(), NOW()),
('Cambridge', 'United Kingdom', 90, 92, 95, NOW(), NOW()),

-- Germany
('Berlin', 'Germany', 75, 90, 93, NOW(), NOW()),
('Munich', 'Germany', 85, 92, 90, NOW(), NOW()),
('Hamburg', 'Germany', 80, 88, 85, NOW(), NOW()),
('Frankfurt', 'Germany', 82, 87, 84, NOW(), NOW()),
('Heidelberg', 'Germany', 78, 91, 92, NOW(), NOW()),

-- Australia
('Sydney', 'Australia', 90, 92, 90, NOW(), NOW()),
('Melbourne', 'Australia', 88, 94, 92, NOW(), NOW()),
('Brisbane', 'Australia', 82, 90, 85, NOW(), NOW()),
('Perth', 'Australia', 80, 89, 84, NOW(), NOW()),
('Adelaide', 'Australia', 75, 88, 86, NOW(), NOW()),

-- France
('Paris', 'France', 88, 85, 90, NOW(), NOW()),
('Lyon', 'France', 78, 87, 86, NOW(), NOW()),
('Toulouse', 'France', 75, 86, 85, NOW(), NOW()),
('Montpellier', 'France', 72, 88, 90, NOW(), NOW()),

-- Netherlands
('Amsterdam', 'Netherlands', 88, 93, 91, NOW(), NOW()),
('Rotterdam', 'Netherlands', 82, 90, 88, NOW(), NOW()),
('Utrecht', 'Netherlands', 85, 92, 90, NOW(), NOW()),
('Groningen', 'Netherlands', 78, 90, 92, NOW(), NOW()),

-- Japan
('Tokyo', 'Japan', 92, 88, 85, NOW(), NOW()),
('Kyoto', 'Japan', 85, 90, 88, NOW(), NOW()),
('Osaka', 'Japan', 88, 87, 84, NOW(), NOW()),
('Fukuoka', 'Japan', 80, 85, 82, NOW(), NOW()),

-- Singapore
('Singapore', 'Singapore', 93, 95, 88, NOW(), NOW()),

-- New Zealand
('Auckland', 'New Zealand', 85, 94, 88, NOW(), NOW()),
('Wellington', 'New Zealand', 82, 92, 86, NOW(), NOW()),
('Christchurch', 'New Zealand', 78, 90, 85, NOW(), NOW()),

-- Sweden
('Stockholm', 'Sweden', 88, 95, 90, NOW(), NOW()),
('Uppsala', 'Sweden', 82, 94, 92, NOW(), NOW()),
('Gothenburg', 'Sweden', 80, 93, 89, NOW(), NOW()),
('Lund', 'Sweden', 79, 92, 94, NOW(), NOW()),

-- Switzerland
('Zurich', 'Switzerland', 100, 97, 88, NOW(), NOW()),
('Geneva', 'Switzerland', 98, 95, 87, NOW(), NOW()),
('Lausanne', 'Switzerland', 95, 94, 90, NOW(), NOW()),

-- Spain
('Barcelona', 'Spain', 78, 90, 93, NOW(), NOW()),
('Madrid', 'Spain', 80, 88, 90, NOW(), NOW()),
('Valencia', 'Spain', 72, 87, 88, NOW(), NOW()),
('Seville', 'Spain', 70, 85, 87, NOW(), NOW()),

-- South Korea
('Seoul', 'South Korea', 85, 88, 86, NOW(), NOW()),
('Busan', 'South Korea', 78, 85, 83, NOW(), NOW()),
('Daejeon', 'South Korea', 75, 84, 85, NOW(), NOW()),

-- Italy
('Rome', 'Italy', 82, 85, 88, NOW(), NOW()),
('Milan', 'Italy', 85, 86, 85, NOW(), NOW()),
('Bologna', 'Italy', 78, 88, 90, NOW(), NOW()),
('Florence', 'Italy', 80, 90, 92, NOW(), NOW()),

-- Ireland
('Dublin', 'Ireland', 92, 88, 90, NOW(), NOW()),
('Cork', 'Ireland', 85, 87, 88, NOW(), NOW()),
('Galway', 'Ireland', 80, 89, 92, NOW(), NOW()),

-- China
('Beijing', 'China', 75, 75, 80, NOW(), NOW()),
('Shanghai', 'China', 80, 78, 82, NOW(), NOW()),
('Hong Kong', 'China', 95, 85, 85, NOW(), NOW()),
('Guangzhou', 'China', 70, 73, 78, NOW(), NOW());

-- Create additional city details table
CREATE TABLE IF NOT EXISTS city_details (
    city_id INTEGER PRIMARY KEY REFERENCES cities(id),
    population INTEGER,
    avg_rent_studio INTEGER,
    avg_rent_1bed INTEGER,
    avg_rent_shared INTEGER,
    public_transport_quality INTEGER,
    pub_transport_monthly_cost INTEGER,
    restaurant_meal_cost INTEGER,
    grocery_index INTEGER,
    internet_cost INTEGER,
    safety_index INTEGER,
    healthcare_accessibility INTEGER,
    intl_student_population INTEGER
);

-- Insert city details (adding for a subset of cities)
INSERT INTO city_details 
(city_id, population, avg_rent_studio, avg_rent_1bed, avg_rent_shared, public_transport_quality, pub_transport_monthly_cost, restaurant_meal_cost, grocery_index, internet_cost, safety_index, healthcare_accessibility, intl_student_population)
VALUES
(1, 2930000, 1200, 1800, 700, 9, 120, 20, 85, 60, 85, 9, 75000),  -- Toronto
(2, 675000, 1300, 1900, 750, 8, 100, 22, 90, 65, 90, 9, 50000),   -- Vancouver
(6, 694583, 1500, 2200, 800, 9, 90, 25, 80, 65, 80, 9, 60000),    -- Boston
(7, 8804190, 2000, 3000, 1200, 8, 130, 30, 90, 70, 75, 8, 120000), -- New York
(11, 8982000, 1800, 2700, 950, 9, 180, 25, 85, 40, 80, 8, 110000), -- London
(16, 3670000, 900, 1300, 450, 9, 80, 18, 75, 35, 85, 9, 50000),   -- Berlin
(17, 1488202, 1200, 1800, 600, 9, 70, 22, 80, 40, 90, 9, 45000),   -- Munich
(21, 5312163, 1500, 2100, 650, 8, 170, 25, 90, 60, 85, 8, 65000),  -- Sydney
(22, 5078193, 1300, 1900, 600, 9, 150, 22, 85, 60, 90, 9, 70000),  -- Melbourne
(26, 2148271, 1600, 2300, 800, 9, 75, 28, 95, 40, 80, 9, 80000),   -- Paris
(30, 873000, 1400, 2000, 650, 9, 100, 25, 85, 45, 85, 9, 40000),   -- Amsterdam
(34, 13960000, 1400, 2000, 600, 9, 120, 15, 90, 50, 95, 8, 55000), -- Tokyo
(39, 5685000, 1000, 1500, 500, 9, 80, 20, 90, 40, 95, 10, 25000),  -- Singapore
(43, 975904, 1200, 1800, 700, 9, 90, 22, 95, 35, 95, 10, 30000),   -- Stockholm
(47, 402762, 1800, 2500, 900, 9, 80, 30, 120, 45, 95, 10, 20000),  -- Zurich
(50, 1620000, 900, 1300, 500, 8, 50, 18, 75, 35, 85, 8, 35000),    -- Barcelona
(54, 9776000, 800, 1200, 400, 9, 60, 12, 70, 30, 80, 8, 45000),    -- Seoul
(58, 2873000, 1000, 1500, 550, 7, 60, 20, 80, 35, 75, 8, 30000),   -- Rome
(62, 544107, 1400, 2000, 700, 8, 120, 22, 85, 50, 90, 9, 35000);   -- Dublin
