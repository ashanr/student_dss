-- Test data for universities table

-- Clean up existing data
TRUNCATE TABLE universities CASCADE;

-- Insert universities data (100 universities)
INSERT INTO universities (
    name, country, city, global_ranking, domestic_ranking, 
    tuition_international, tuition_domestic, created_at, updated_at
) VALUES
-- Canada
('University of Toronto', 'Canada', 'Toronto', 18, 1, 45000, 6000, NOW(), NOW()),
('University of British Columbia', 'Canada', 'Vancouver', 34, 2, 42000, 5500, NOW(), NOW()),
('McGill University', 'Canada', 'Montreal', 27, 3, 40000, 5000, NOW(), NOW()),
('University of Waterloo', 'Canada', 'Waterloo', 149, 4, 38000, 6500, NOW(), NOW()),
('University of Alberta', 'Canada', 'Edmonton', 113, 5, 35000, 5800, NOW(), NOW()),

-- USA
('Harvard University', 'United States', 'Boston', 3, 2, 52000, 52000, NOW(), NOW()),
('Massachusetts Institute of Technology', 'United States', 'Boston', 1, 1, 55000, 55000, NOW(), NOW()),
('Stanford University', 'United States', 'Stanford', 2, 3, 53000, 53000, NOW(), NOW()),
('University of California, Berkeley', 'United States', 'Berkeley', 12, 4, 48000, 14000, NOW(), NOW()),
('University of California, Los Angeles', 'United States', 'Los Angeles', 40, 8, 46000, 13000, NOW(), NOW()),

-- UK
('University of Oxford', 'United Kingdom', 'Oxford', 5, 1, 40000, 12000, NOW(), NOW()),
('University of Cambridge', 'United Kingdom', 'Cambridge', 7, 2, 39000, 12500, NOW(), NOW()),
('Imperial College London', 'United Kingdom', 'London', 9, 3, 38000, 12000, NOW(), NOW()),
('University College London', 'United Kingdom', 'London', 16, 4, 37000, 12200, NOW(), NOW()),
('The University of Edinburgh', 'United Kingdom', 'Edinburgh', 20, 5, 36000, 11500, NOW(), NOW()),

-- Germany
('Technical University of Munich', 'Germany', 'Munich', 50, 1, 3000, 500, NOW(), NOW()),
('Ludwig Maximilian University of Munich', 'Germany', 'Munich', 57, 2, 0, 0, NOW(), NOW()),
('Heidelberg University', 'Germany', 'Heidelberg', 63, 3, 2500, 0, NOW(), NOW()),
('Humboldt University of Berlin', 'Germany', 'Berlin', 118, 4, 0, 0, NOW(), NOW()),
('Free University of Berlin', 'Germany', 'Berlin', 127, 5, 0, 0, NOW(), NOW()),

-- Australia
('University of Melbourne', 'Australia', 'Melbourne', 37, 1, 42000, 9000, NOW(), NOW()),
('University of Sydney', 'Australia', 'Sydney', 38, 2, 43000, 8500, NOW(), NOW()),
('Australian National University', 'Australia', 'Canberra', 30, 3, 41000, 9000, NOW(), NOW()),
('University of Queensland', 'Australia', 'Brisbane', 46, 4, 40000, 8000, NOW(), NOW()),
('Monash University', 'Australia', 'Melbourne', 55, 5, 39000, 8200, NOW(), NOW()),

-- France
('Sorbonne University', 'France', 'Paris', 83, 1, 5000, 500, NOW(), NOW()),
('Paris Sciences et Lettres University', 'France', 'Paris', 40, 2, 4800, 400, NOW(), NOW()),
('École Polytechnique', 'France', 'Paris', 68, 3, 12000, 0, NOW(), NOW()),
('University of Lyon', 'France', 'Lyon', 301, 8, 4000, 300, NOW(), NOW()),
('University of Strasbourg', 'France', 'Strasbourg', 301, 9, 3800, 300, NOW(), NOW()),

-- Netherlands
('University of Amsterdam', 'Netherlands', 'Amsterdam', 55, 1, 15000, 2200, NOW(), NOW()),
('Utrecht University', 'Netherlands', 'Utrecht', 69, 2, 14500, 2200, NOW(), NOW()),
('Delft University of Technology', 'Netherlands', 'Delft', 57, 3, 16000, 2200, NOW(), NOW()),
('Leiden University', 'Netherlands', 'Leiden', 70, 4, 14800, 2200, NOW(), NOW()),
('Erasmus University Rotterdam', 'Netherlands', 'Rotterdam', 72, 5, 14200, 2200, NOW(), NOW()),

-- Japan
('University of Tokyo', 'Japan', 'Tokyo', 24, 1, 9000, 5000, NOW(), NOW()),
('Kyoto University', 'Japan', 'Kyoto', 33, 2, 8800, 4800, NOW(), NOW()),
('Tokyo Institute of Technology', 'Japan', 'Tokyo', 56, 3, 8500, 5200, NOW(), NOW()),
('Osaka University', 'Japan', 'Osaka', 75, 4, 8200, 4500, NOW(), NOW()),
('Tohoku University', 'Japan', 'Sendai', 79, 5, 8000, 4500, NOW(), NOW()),

-- Singapore
('National University of Singapore', 'Singapore', 'Singapore', 11, 1, 29000, 8000, NOW(), NOW()),
('Nanyang Technological University', 'Singapore', 'Singapore', 13, 2, 28000, 8000, NOW(), NOW()),

-- New Zealand
('University of Auckland', 'New Zealand', 'Auckland', 85, 1, 32000, 7000, NOW(), NOW()),
('University of Otago', 'New Zealand', 'Dunedin', 184, 2, 31000, 6800, NOW(), NOW()),
('Victoria University of Wellington', 'New Zealand', 'Wellington', 236, 3, 30500, 6500, NOW(), NOW()),

-- Sweden
('Karolinska Institute', 'Sweden', 'Stockholm', 45, 1, 18000, 0, NOW(), NOW()),
('Lund University', 'Sweden', 'Lund', 87, 2, 17000, 0, NOW(), NOW()),
('KTH Royal Institute of Technology', 'Sweden', 'Stockholm', 89, 3, 19000, 0, NOW(), NOW()),
('Uppsala University', 'Sweden', 'Uppsala', 124, 4, 16500, 0, NOW(), NOW()),
('Stockholm University', 'Sweden', 'Stockholm', 148, 5, 16000, 0, NOW(), NOW()),

-- Switzerland
('ETH Zurich', 'Switzerland', 'Zurich', 8, 1, 1600, 1600, NOW(), NOW()),
('EPFL', 'Switzerland', 'Lausanne', 19, 2, 1600, 1600, NOW(), NOW()),
('University of Zurich', 'Switzerland', 'Zurich', 70, 3, 1800, 1800, NOW(), NOW()),
('University of Geneva', 'Switzerland', 'Geneva', 105, 4, 1500, 1500, NOW(), NOW()),
('University of Bern', 'Switzerland', 'Bern', 141, 5, 1500, 1500, NOW(), NOW()),

-- Spain
('University of Barcelona', 'Spain', 'Barcelona', 168, 1, 6000, 2000, NOW(), NOW()),
('Autonomous University of Madrid', 'Spain', 'Madrid', 301, 2, 5800, 1900, NOW(), NOW()),
('Complutense University of Madrid', 'Spain', 'Madrid', 206, 3, 5500, 1800, NOW(), NOW()),
('Pompeu Fabra University', 'Spain', 'Barcelona', 223, 4, 6200, 2100, NOW(), NOW()),
('University of Valencia', 'Spain', 'Valencia', 301, 5, 5000, 1700, NOW(), NOW()),

-- South Korea
('Seoul National University', 'South Korea', 'Seoul', 36, 1, 7000, 5000, NOW(), NOW()),
('Korea Advanced Institute of Science and Technology', 'South Korea', 'Daejeon', 41, 2, 8000, 5500, NOW(), NOW()),
('Yonsei University', 'South Korea', 'Seoul', 85, 3, 6500, 4800, NOW(), NOW()),
('Korea University', 'South Korea', 'Seoul', 86, 4, 6300, 4700, NOW(), NOW()),
('Sungkyunkwan University', 'South Korea', 'Seoul', 97, 5, 6800, 4900, NOW(), NOW()),

-- Italy
('University of Bologna', 'Italy', 'Bologna', 160, 1, 4000, 1500, NOW(), NOW()),
('Sapienza University of Rome', 'Italy', 'Rome', 171, 2, 3800, 1400, NOW(), NOW()),
('University of Padua', 'Italy', 'Padua', 242, 3, 3500, 1300, NOW(), NOW()),
('University of Milan', 'Italy', 'Milan', 301, 4, 3700, 1350, NOW(), NOW()),
('Politecnico di Milano', 'Italy', 'Milan', 142, 5, 4200, 1600, NOW(), NOW()),

-- Ireland
('Trinity College Dublin', 'Ireland', 'Dublin', 101, 1, 25000, 8000, NOW(), NOW()),
('University College Dublin', 'Ireland', 'Dublin', 177, 2, 24000, 7500, NOW(), NOW()),
('University College Cork', 'Ireland', 'Cork', 301, 3, 23000, 7000, NOW(), NOW()),
('Dublin City University', 'Ireland', 'Dublin', 439, 4, 22000, 6800, NOW(), NOW()),
('University of Limerick', 'Ireland', 'Limerick', 511, 5, 21000, 6500, NOW(), NOW()),

-- China
('Tsinghua University', 'China', 'Beijing', 17, 1, 4000, 3000, NOW(), NOW()),
('Peking University', 'China', 'Beijing', 18, 2, 4200, 3100, NOW(), NOW()),
('Fudan University', 'China', 'Shanghai', 31, 3, 3800, 2800, NOW(), NOW()),
('Shanghai Jiao Tong University', 'China', 'Shanghai', 47, 4, 3900, 2900, NOW(), NOW()),
('Zhejiang University', 'China', 'Hangzhou', 53, 5, 3700, 2700, NOW(), NOW()),

-- Denmark
('University of Copenhagen', 'Denmark', 'Copenhagen', 79, 1, 15000, 0, NOW(), NOW()),
('Technical University of Denmark', 'Denmark', 'Copenhagen', 103, 2, 16000, 0, NOW(), NOW()),
('Aarhus University', 'Denmark', 'Aarhus', 155, 3, 14500, 0, NOW(), NOW()),
('Aalborg University', 'Denmark', 'Aalborg', 305, 4, 14000, 0, NOW(), NOW()),
('University of Southern Denmark', 'Denmark', 'Odense', 353, 5, 13500, 0, NOW(), NOW()),

-- Finland
('University of Helsinki', 'Finland', 'Helsinki', 104, 1, 13000, 0, NOW(), NOW()),
('Aalto University', 'Finland', 'Espoo', 127, 2, 14000, 0, NOW(), NOW()),
('University of Turku', 'Finland', 'Turku', 301, 3, 12000, 0, NOW(), NOW()),
('University of Oulu', 'Finland', 'Oulu', 394, 4, 11500, 0, NOW(), NOW()),
('University of Jyväskylä', 'Finland', 'Jyväskylä', 357, 5, 11000, 0, NOW(), NOW()),

-- Malaysia
('University of Malaya', 'Malaysia', 'Kuala Lumpur', 65, 1, 8000, 2000, NOW(), NOW()),
('Universiti Putra Malaysia', 'Malaysia', 'Serdang', 132, 2, 7500, 1800, NOW(), NOW()),
('Universiti Kebangsaan Malaysia', 'Malaysia', 'Bangi', 141, 3, 7200, 1700, NOW(), NOW()),
('Universiti Sains Malaysia', 'Malaysia', 'Penang', 143, 4, 7000, 1650, NOW(), NOW()),
('Universiti Teknologi Malaysia', 'Malaysia', 'Johor Bahru', 187, 5, 6800, 1600, NOW(), NOW());

-- Create additional university details table
CREATE TABLE IF NOT EXISTS university_details (
    university_id INTEGER PRIMARY KEY REFERENCES universities(id),
    acceptance_rate DECIMAL(5,2),
    student_faculty_ratio VARCHAR(10),
    intl_student_percentage INTEGER,
    library_volumes INTEGER,
    research_funding_usd INTEGER,
    campus_size_acres INTEGER,
    year_founded INTEGER,
    endowment_usd BIGINT,
    on_campus_housing BOOLEAN,
    student_satisfaction_pct INTEGER,
    alumni_employment_rate INTEGER,
    sports_facilities INTEGER,
    notable_alumni TEXT[],
    website VARCHAR(255),
    student_clubs_count INTEGER
);

-- Insert university details (for a subset of universities)
INSERT INTO university_details 
(university_id, acceptance_rate, student_faculty_ratio, intl_student_percentage, library_volumes, research_funding_usd, 
campus_size_acres, year_founded, endowment_usd, on_campus_housing, student_satisfaction_pct, 
alumni_employment_rate, sports_facilities, notable_alumni, website, student_clubs_count)
VALUES
(1, 0.43, '20:1', 25, 14000000, 580000000, 180, 1827, 2760000000, TRUE, 85, 92, 10, 
    ARRAY['Frederick Banting', 'Margaret Atwood', 'Lester B. Pearson'], 'https://www.utoronto.ca/', 700),
(6, 0.04, '6:1', 24, 20000000, 1200000000, 210, 1636, 40900000000, TRUE, 95, 98, 12, 
    ARRAY['Barack Obama', 'Mark Zuckerberg', 'Bill Gates'], 'https://www.harvard.edu/', 450),
(7, 0.07, '3:1', 29, 5200000, 1500000000, 168, 1861, 16400000000, TRUE, 96, 96, 9, 
    ARRAY['Kofi Annan', 'Buzz Aldrin', 'Jonah Peretti'], 'https://www.mit.edu/', 500),
(11, 0.17, '11:1', 41, 12000000, 800000000, 100, 1096, 6300000000, TRUE, 92, 95, 8, 
    ARRAY['Stephen Hawking', 'Oscar Wilde', 'Indira Gandhi'], 'https://www.ox.ac.uk/', 400),
(16, 0.70, '28:1', 20, 4500000, 420000000, 1200, 1868, 400000000, TRUE, 89, 92, 10, 
    ARRAY['Rudolf Diesel', 'Wernher von Braun', 'Carl von Linde'], 'https://www.tum.de/', 120),
(21, 0.60, '18:1', 38, 3800000, 380000000, 150, 1853, 1900000000, TRUE, 88, 91, 8, 
    ARRAY['Peter Singer', 'Julia Gillard', 'Robert Menzies'], 'https://www.unimelb.edu.au/', 200),
(30, 0.45, '14:1', 15, 2500000, 240000000, 80, 1632, 650000000, TRUE, 90, 93, 6, 
    ARRAY['Andre Kuipers', 'Dolph Lundgren', 'Willem-Alexander of the Netherlands'], 'https://www.uva.nl/en', 250),
(35, 0.30, '5:1', 10, 9000000, 900000000, 360, 1877, 3200000000, TRUE, 86, 94, 7, 
    ARRAY['Akira Kurosawa', 'Kuniko Inoguchi', 'Yasuhiro Nakasone'], 'https://www.u-tokyo.ac.jp/en/', 300),
(41, 0.05, '12:1', 35, 1800000, 700000000, 360, 1905, 4700000000, TRUE, 92, 94, 9, 
    ARRAY['Tony Tan', 'Goh Chok Tong', 'Kishore Mahbubani'], 'https://www.nus.edu.sg/', 380),
(51, 0.20, '12:1', 18, 3000000, 750000000, 200, 1810, 1800000000, TRUE, 91, 93, 8, 
    ARRAY['Anders Celsius', 'Carl Linnaeus', 'Ingvar Kamprad'], 'https://www.uu.se/en', 200),
(56, 0.35, '14:1', 30, 3500000, 450000000, 80, 1450, 290000000, TRUE, 89, 91, 7, 
    ARRAY['Antoni Gaudí', 'Joan Miró', 'Montserrat Caballé'], 'https://www.ub.edu/web/portal/en/', 180),
(62, 0.33, '17:1', 28, 3000000, 400000000, 120, 1592, 900000000, TRUE, 88, 90, 9, 
    ARRAY['Oscar Wilde', 'Bram Stoker', 'Mary Robinson'], 'https://www.tcd.ie/', 170),
(72, 0.08, '15:1', 15, 6000000, 900000000, 1000, 1911, 3800000000, TRUE, 90, 95, 10, 
    ARRAY['Xi Jinping', 'Hu Jintao', 'Qian Xuesen'], 'https://www.tsinghua.edu.cn/en/', 300);
