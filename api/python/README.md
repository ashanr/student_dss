# Student DSS Python API Documentation

This document provides detailed information about the Python-based API endpoints for the Student Decision Support System.

## Base URL

All endpoints are relative to: `http://localhost:5000`

## Endpoints

### Health Check

Verify if the API service is running and can connect to the database.

- **URL**: `/health`
- **Method**: `GET`

**cURL Example:**

```bash
curl -X GET http://localhost:5000/health
```

**Response Example:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-28T15:30:45.123456",
  "service": "python-api",
  "database": "connected"
}
```

### Get Recommendations

Generates course recommendations based on user preferences using the advanced recommendation engine.

- **URL**: `/api/python/recommendations`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body:**

```json
{
  "field_of_study": "Computer Science",
  "degree_level": "Master",
  "max_tuition": 30000,
  "max_living_expenses": 1500,
  "preferred_countries": ["Germany", "Canada", "Netherlands"],
  "language_preference": "Any language with English programs"
}
```

**Required Fields:**
- `field_of_study`: Field or discipline the student is interested in
- `degree_level`: Academic level (Bachelor, Master, PhD)

**Optional Fields:**
- `max_tuition`: Maximum annual tuition in USD
- `max_living_expenses`: Maximum monthly living expenses in USD
- `preferred_countries`: List of preferred countries
- `language_preference`: One of: "English only", "Any language with English programs", "Open to learning a new language"

**cURL Example:**

```bash
curl -X POST \
  http://localhost:5000/api/python/recommendations \
  -H 'Content-Type: application/json' \
  -d '{
    "field_of_study": "Computer Science",
    "degree_level": "Master",
    "max_tuition": 30000,
    "preferred_countries": ["Germany", "Canada"],
    "language_preference": "Any language with English programs"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "recommendations": [
    {
      "id": 245,
      "name_program": "Master of Computer Science",
      "name_university": "Technical University of Munich",
      "country": "Germany",
      "city": "Munich",
      "tuition_per_year": 1500,
      "language": "English",
      "duration": 2,
      "field": "Computer Science",
      "level": "Master",
      "ranking_global": 50,
      "match_percentage": 95.2,
      "explanation": "Recommended because: Strong match with your academic interests; Fits well within your budget at $1,500/year; Well-ranked institution (#50 globally); Located in your preferred country (Germany)."
    },
    {
      "id": 189,
      "name_program": "MSc Computer Science",
      "name_university": "University of Toronto",
      "country": "Canada",
      "city": "Toronto",
      "tuition_per_year": 25000,
      "language": "English",
      "duration": 2,
      "field": "Computer Science",
      "level": "Master",
      "ranking_global": 25,
      "match_percentage": 92.8,
      "explanation": "Recommended because: Strong match with your academic interests; Well-ranked institution (#25 globally); Matches your language preferences; Located in your preferred country (Canada)."
    }
    // Additional recommendations...
  ]
}
```

### Get Countries

Retrieves a list of all countries in the database.

- **URL**: `/api/python/countries`
- **Method**: `GET`

**cURL Example:**

```bash
curl -X GET http://localhost:5000/api/python/countries
```

**Response Example:**

```json
[
  {
    "id": 1,
    "name": "United States",
    "code": "US",
    "region": "North America",
    "average_living_cost": 1800,
    "average_tuition_cost": 35000,
    "language": "English",
    "safety_index": 70,
    "quality_of_life_index": 80
  },
  {
    "id": 2,
    "name": "Germany",
    "code": "DE",
    "region": "Europe",
    "average_living_cost": 1000,
    "average_tuition_cost": 1500,
    "language": "German",
    "safety_index": 80,
    "quality_of_life_index": 85
  }
  // Additional countries...
]
```

### Get Universities

Retrieves a list of universities with optional filtering.

- **URL**: `/api/python/universities`
- **Method**: `GET`
- **Query Parameters**:
  - `country` (optional): Filter by country name
  - `limit` (optional): Maximum number of results (default: 100)
  - `offset` (optional): Result offset for pagination (default: 0)

**cURL Example:**

```bash
curl -X GET 'http://localhost:5000/api/python/universities?country=Germany&limit=5'
```

**Response Example:**

```json
{
  "success": true,
  "count": 5,
  "universities": [
    {
      "id": 45,
      "name": "Technical University of Munich",
      "country": "Germany",
      "city": "Munich",
      "ranking_global": 50,
      "ranking_national": 2,
      "student_count": 40000,
      "established_year": 1868,
      "website": "https://www.tum.de/en/"
    },
    {
      "id": 46,
      "name": "Ludwig Maximilian University of Munich",
      "country": "Germany",
      "city": "Munich",
      "ranking_global": 32,
      "ranking_national": 1,
      "student_count": 50000,
      "established_year": 1472,
      "website": "https://www.lmu.de/en/"
    }
    // Additional universities...
  ]
}
```

## Using with Postman

1. Import the curl commands directly into Postman using the "Import" > "Raw text" feature
2. Make sure the Python API service is running
3. Send requests to test the endpoints

## Running the Python API

Start the API server with:

```bash
# Using Docker
docker-compose -f docker-compose.python.yml up

# Or directly with Python
cd api/python
python app.py
```

## Dependencies

The Python API requires:
- Python 3.9+
- Flask
- pandas
- numpy
- matplotlib (for visualization features)
- SQLite3 database
