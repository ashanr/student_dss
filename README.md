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

### **User Management**
- **Student Profiles**: Secure user accounts with personalized dashboards and progress tracking
- **Preference History**: Maintains records of preference changes and decision evolution over time
- **Export Capabilities**: Generate reports and summaries for personal use or counselor consultations

## Target Users

- **Prospective Students**: High school graduates and career changers seeking higher education opportunities
- **Academic Counselors**: Educational consultants and advisors assisting students with university selection
- **Educational Institutions**: Universities and colleges looking to connect with suitable candidates

## Technology Benefits

- **Data-Driven Decisions**: Eliminates guesswork by providing evidence-based recommendations
- **Time Efficiency**: Streamlines the research process that traditionally takes months of manual investigation
- **Personalized Experience**: Tailored recommendations that align with individual goals and circumstances
- **Comprehensive Coverage**: Access to global opportunities in a single platform

This system bridges the gap between student aspirations and educational opportunities, making the complex process of international education selection more accessible and informed[1].

[1] programming.documentation

# Student Decision Support System

A Bootstrap 5-based application for helping students make decisions about studying abroad.

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

4. Access the application at http://localhost:8080

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
- Bootstrap 5 for styling
- Chart.js for data visualization
- FontAwesome for icons

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PNPM (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd student_dss
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm run dev
```

4. Open your browser and navigate to: http://localhost:3000

## Login Instructions

To access the system, use the following credentials:

- **Admin Access:**
  - Username: `admin`
  - Password: `admin`

- **Guest Access:**
  - Username: `guest`
  - Password: `guest`
  - Or simply click on the "Continue as Guest" button on the login page

**Note:** If you experience login issues, please check that the server is properly running and that the bcrypt hashing in auth.js matches the plaintext passwords.