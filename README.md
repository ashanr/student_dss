# Student DSS

# Student Decision Support System (DSS)

## Overview

The Student Decision Support System is a comprehensive web-based application designed to assist students in making informed decisions about their higher education journey. This intelligent system helps students identify and select the most suitable degree programs from various countries based on their individual preferences, background, and career aspirations.

## Key Functionality

### **Preference Analysis Engine**
- **Personal Profile Assessment**: Collects and analyzes student preferences including academic interests, career goals, budget constraints, and lifestyle preferences
- **Multi-criteria Decision Making**: Processes complex preference data using decision support algorithms to generate personalized recommendations
- **Weighted Scoring System**: Assigns importance scores to different criteria based on individual student priorities

### **Country & Institution Database**
- **Global University Coverage**: Comprehensive database of universities and degree programs across multiple countries
- **Real-time Information**: Up-to-date information on admission requirements, tuition fees, scholarships, and program details
- **Country-specific Insights**: Cultural, economic, and educational system information for informed decision-making

### **Intelligent Matching System**
- **Smart Recommendations**: Generates ranked lists of suitable degree programs and institutions based on preference analysis
- **Compatibility Scoring**: Provides percentage match scores between student profiles and available programs
- **Alternative Suggestions**: Offers backup options and alternative pathways to achieve educational goals

### **Decision Support Tools**
- **Comparative Analysis**: Side-by-side comparison of different degree programs, universities, and countries
- **Cost-Benefit Analysis**: Financial planning tools including tuition costs, living expenses, and potential return on investment
- **Timeline Planning**: Academic pathway visualization and milestone tracking


## Running with Docker

### Prerequisites
- Docker installed on your system
- Docker Compose installed on your system

### Building and Running

1. Clone this repository
2. Navigate to the repository directory
3. Run the following command:

```bash
docker-compose up -d
```

4. Access the application at http://localhost:80

### Accessing the Application

The application is divided into two main components:

1. **Frontend (Web Interface)**: Available at http://localhost:80
   - The main user interface where students can interact with the system
   - Served through NGINX as a static website
   - Features responsive design for desktop and mobile devices

2. **Backend (API Service)**: Available at http://localhost:3000
   - REST API endpoints for data operations
   - Handles all business logic and data processing
   - Documentation available at http://localhost:3000/api-docs

### Using the Application

1. **Landing Page**: Visit http://localhost:80 to access the landing page
2. **Login**: Use one of the following credentials:
   - Username: `admin` / Password: `admin` (Administrator access)
   - Username: `guest` / Password: `guest` (Student access)
   - Or click "Continue as Guest" button on the login page
3. **Dashboard**: After login, you'll see your personalized dashboard with:
   - Application progress
   - Top recommended countries
   - Upcoming deadlines
   - Cost overview
   
4. **Preferences**: Set your study preferences under the Preferences section
   - Academic preferences
   - Financial constraints
   - Location preferences
   - Lifestyle priorities
   - Criteria weighting

5. **Results**: View matched universities and programs based on your preferences
6. **Compare**: Compare different options side-by-side
7. **Analytics**: Access detailed analytics on your options

### Stopping the Application

```bash
docker-compose down
```

### Rebuilding After Changes

```bash
docker-compose up -d --build
```

## Development

This application is built using:
- Express.js for the backend API
- SQLite for data storage
- Bootstrap 5 for styling
- Chart.js for data visualization
- FontAwesome for icons

## Technical Implementation

### Database

The application uses SQLite for data storage with the following main tables:
- `universities`: Information about universities worldwide
- `programs`: Degree programs offered by universities
- `countries`: Country information including costs, quality of life, etc.
- `cities`: Information about cities where universities are located
- `employment`: Employment data for different fields and countries

### Architecture

The application follows a three-tier architecture:
1. **Frontend**: HTML, CSS, JavaScript with Bootstrap (served via NGINX)
2. **API Layer**: Express.js REST API
3. **Database**: SQLite (file-based database stored in /app/data/studentDSS.db)

## Troubleshooting

### Database Connection Issues
- Ensure the SQLite database file exists at the expected path
- Check for proper file permissions on the database file
- Verify the SQLITE_PATH environment variable is set correctly

### Login Issues
- Default credentials are `admin`/`admin` or `guest`/`guest`
- If login fails, check that the API service is running
- Check browser console for any JavaScript errors

### Docker Issues
- If containers fail to start, check Docker logs:
  ```bash
  docker logs student-dss
  docker logs student-dss-api
  ```
- Ensure ports 80 and 3000 are available on your system