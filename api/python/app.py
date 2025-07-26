from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import json
import sqlite3
from datetime import datetime

# Add the parent directory to the path so we can import the course selection assistant
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
from scripts.course_selection_assistant import CourseSelectionAssistant

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for the Python API."""
    try:
        # Check database connection
        db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                               "data", "studentDSS.db")
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        cursor.fetchone()
        conn.close()
        
        return jsonify({
            "status": "ok",
            "timestamp": datetime.now().isoformat(),
            "service": "python-api",
            "database": "connected"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "timestamp": datetime.now().isoformat(),
            "service": "python-api",
            "error": str(e)
        }), 500

@app.route('/api/python/recommendations', methods=['POST'])
def get_recommendations():
    """Generate course recommendations based on user preferences."""
    try:
        # Get user preferences from request
        preferences = request.json
        
        # Initialize the course selection assistant
        assistant = CourseSelectionAssistant()
        
        # Connect to database
        if not assistant.connect_to_database():
            return jsonify({
                "success": False,
                "error": "Failed to connect to database"
            }), 500
            
        # Load data
        if not assistant.load_data():
            return jsonify({
                "success": False,
                "error": "Failed to load data"
            }), 500
            
        # Set user preferences
        assistant.user_preferences = preferences
        
        # Filter programs based on preferences
        filtered_programs = assistant.filter_programs()
        
        # Score and rank programs
        scored_programs = assistant.score_programs(filtered_programs)
        
        # Convert DataFrame to dict for JSON serialization
        if scored_programs is not None:
            top_programs = scored_programs.head(10)
            result = []
            for _, program in top_programs.iterrows():
                program_dict = program.to_dict()
                # Clean up any non-serializable objects
                for key, value in program_dict.items():
                    if not isinstance(value, (str, int, float, bool, list, dict, type(None))):
                        program_dict[key] = str(value)
                result.append(program_dict)
        else:
            result = []
            
        return jsonify({
            "success": True,
            "recommendations": result
        })
        
    except Exception as e:
        app.logger.error(f"Error generating recommendations: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/python/countries', methods=['GET'])
def get_countries():
    """Get all countries from the database."""
    try:
        # Connect to database
        db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                               "data", "studentDSS.db")
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row  # This enables column access by name
        cursor = conn.cursor()
        
        # Query all countries
        cursor.execute('SELECT * FROM countries')
        countries = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify(countries)
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/python/universities', methods=['GET'])
def get_universities():
    """Get all universities with optional filtering."""
    try:
        # Get query parameters
        country = request.args.get('country')
        limit = request.args.get('limit', 100)
        offset = request.args.get('offset', 0)
        
        # Connect to database
        db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                               "data", "studentDSS.db")
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Build query
        query = "SELECT * FROM universities WHERE 1=1"
        params = []
        
        if country:
            query += " AND country = ?"
            params.append(country)
            
        query += " LIMIT ? OFFSET ?"
        params.append(limit)
        params.append(offset)
        
        # Execute query
        cursor.execute(query, params)
        universities = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return jsonify({
            "success": True,
            "count": len(universities),
            "universities": universities
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
