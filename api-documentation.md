# Student DSS API Documentation

This document contains all the available endpoints for the Student Decision Support System API, along with example curl requests that can be used in Postman.

## Base URL

All endpoints are relative to: `http://localhost:3000`

## Authentication Endpoints

### Login

Authenticates a user and returns a JWT token.

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin"
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "admin",
    "password": "admin"
  }'
```

### Register

Creates a new user account.

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "fullName": "New User"
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "newuser",
    "password": "password123",
    "email": "user@example.com",
    "fullName": "New User"
  }'
```

## User Preferences Endpoints

### Get User Preferences

Retrieves the current user's preferences.

- **URL**: `/api/preferences`
- **Method**: `GET`
- **Authorization**: `Bearer TOKEN`

**cURL Example:**

```bash
curl -X GET \
  http://localhost:3000/api/preferences \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Update Academic Preferences

Updates a user's academic preferences.

- **URL**: `/api/preferences/academic`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **Authorization**: `Bearer TOKEN`

**Request Body:**

```json
{
  "fieldOfStudy": "Computer Science",
  "degreeLevel": "Masters",
  "specialization": "Artificial Intelligence",
  "researchInterests": ["Machine Learning", "Data Science"]
}
```

**cURL Example:**

```bash
curl -X PUT \
  http://localhost:3000/api/preferences/academic \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "fieldOfStudy": "Computer Science",
    "degreeLevel": "Masters",
    "specialization": "Artificial Intelligence",
    "researchInterests": ["Machine Learning", "Data Science"]
  }'
```

### Update Financial Preferences

Updates a user's financial preferences.

- **URL**: `/api/preferences/financial`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **Authorization**: `Bearer TOKEN`

**Request Body:**

```json
{
  "budget": 20000,
  "needsScholarship": true,
  "workStudyOption": true,
  "costOfLivingPreference": "medium"
}
```

**cURL Example:**

```bash
curl -X PUT \
  http://localhost:3000/api/preferences/financial \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "budget": 20000,
    "needsScholarship": true,
    "workStudyOption": true,
    "costOfLivingPreference": "medium"
  }'
```

## University Data Endpoints

### Get All Universities

Retrieves a list of all universities.

- **URL**: `/api/universities`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of results per page
  - `country` (optional): Filter by country
  - `ranking` (optional): Filter by ranking range

**cURL Example:**

```bash
curl -X GET \
  'http://localhost:3000/api/universities?page=1&limit=10&country=USA' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Get University Details

Retrieves detailed information about a specific university.

- **URL**: `/api/universities/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: University ID

**cURL Example:**

```bash
curl -X GET \
  http://localhost:3000/api/universities/123 \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Program Data Endpoints

### Get All Programs

Retrieves a list of all degree programs.

- **URL**: `/api/programs`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number for pagination
  - `limit` (optional): Number of results per page
  - `university` (optional): Filter by university ID
  - `field` (optional): Filter by field of study
  - `degree` (optional): Filter by degree level

**cURL Example:**

```bash
curl -X GET \
  'http://localhost:3000/api/programs?page=1&limit=10&field=Computer%20Science&degree=Masters' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Get Program Details

Retrieves detailed information about a specific program.

- **URL**: `/api/programs/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: Program ID

**cURL Example:**

```bash
curl -X GET \
  http://localhost:3000/api/programs/456 \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Country Data Endpoints

### Get All Countries

Retrieves information about all countries in the system.

- **URL**: `/api/countries`
- **Method**: `GET`
- **Query Parameters**:
  - `continent` (optional): Filter by continent

**cURL Example:**

```bash
curl -X GET \
  'http://localhost:3000/api/countries?continent=Europe' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Get Country Details

Retrieves detailed information about a specific country.

- **URL**: `/api/countries/:code`
- **Method**: `GET`
- **URL Parameters**:
  - `code`: Country code (ISO 3166-1 alpha-2)

**cURL Example:**

```bash
curl -X GET \
  http://localhost:3000/api/countries/US \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Recommendations Endpoints

### Get Personalized Recommendations

Retrieves personalized university and program recommendations based on user preferences.

- **URL**: `/api/recommendations`
- **Method**: `GET`
- **Authorization**: `Bearer TOKEN`

**cURL Example:**

```bash
curl -X GET \
  http://localhost:3000/api/recommendations \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Get Recommendation by Criteria

Generates recommendations based on specific criteria.

- **URL**: `/api/recommendations/custom`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Authorization**: `Bearer TOKEN`

**Request Body:**

```json
{
  "fieldOfStudy": "Business Administration",
  "degreeLevel": "Bachelors",
  "budget": 15000,
  "countries": ["Germany", "Netherlands", "Sweden"],
  "languagePreference": "English"
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:3000/api/recommendations/custom \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "fieldOfStudy": "Business Administration",
    "degreeLevel": "Bachelors",
    "budget": 15000,
    "countries": ["Germany", "Netherlands", "Sweden"],
    "languagePreference": "English"
  }'
```

## Comparison Endpoints

### Compare Programs

Compares multiple programs side by side.

- **URL**: `/api/compare/programs`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Authorization**: `Bearer TOKEN`

**Request Body:**

```json
{
  "programIds": [123, 456, 789]
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:3000/api/compare/programs \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "programIds": [123, 456, 789]
  }'
```

### Compare Universities

Compares multiple universities side by side.

- **URL**: `/api/compare/universities`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Authorization**: `Bearer TOKEN`

**Request Body:**

```json
{
  "universityIds": [10, 20, 30]
}
```

**cURL Example:**

```bash
curl -X POST \
  http://localhost:3000/api/compare/universities \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "universityIds": [10, 20, 30]
  }'
```

## Analytics Endpoints

### Get Cost Analysis

Retrieves cost analysis data for a specific program or country.

- **URL**: `/api/analytics/costs`
- **Method**: `GET`
- **Query Parameters**:
  - `programId` (optional): Program ID
  - `countryCode` (optional): Country code
- **Authorization**: `Bearer TOKEN`

**cURL Example:**

```bash
curl -X GET \
  'http://localhost:3000/api/analytics/costs?programId=123' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

### Get Employment Statistics

Retrieves employment statistics for graduates by field and country.

- **URL**: `/api/analytics/employment`
- **Method**: `GET`
- **Query Parameters**:
  - `field`: Field of study
  - `countryCode` (optional): Country code
- **Authorization**: `Bearer TOKEN`

**cURL Example:**

```bash
curl -X GET \
  'http://localhost:3000/api/analytics/employment?field=Computer%20Science&countryCode=DE' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN'
```

## Using These Examples in Postman

1. Copy the desired cURL command
2. Open Postman
3. Click on "Import" > "Raw text" 
4. Paste the cURL command and click "Import"
5. Postman will convert it into a request that you can send
6. Replace `YOUR_JWT_TOKEN` with an actual token obtained from the login endpoint

Remember to start your Docker containers before testing these endpoints:

```bash
docker-compose up -d
```
