#!/usr/bin/env python3
"""
University Course Selection Assistant

This script helps students make data-driven decisions about university courses
by analyzing multiple criteria and providing personalized recommendations.
"""

import os
import sqlite3
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from tabulate import tabulate
from colorama import init, Fore, Style
import math

# Initialize colorama for colored output
init()

class CourseSelectionAssistant:
    def __init__(self, db_path=None):
        """Initialize the assistant with database connection."""
        if db_path is None:
            # Look for the SQLite database in the data folder (adjusted for new file location)
            self.db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                                      "data", "studentDSS.db")
        else:
            self.db_path = db_path
            
        self.conn = None
        self.user_preferences = {}
        self.universities = None
        self.programs = None
        self.countries = None
        
        # Default criteria weights
        self.criteria_weights = {
            'academic_fit': 0.20,
            'tuition_cost': 0.25,
            'living_cost': 0.10,
            'university_ranking': 0.15,
            'career_prospects': 0.15,
            'location': 0.10,
            'language': 0.05
        }
        
    def connect_to_database(self):
        """Connect to the SQLite database."""
        try:
            self.conn = sqlite3.connect(self.db_path)
            print(f"{Fore.GREEN}✓ Connected to database{Style.RESET_ALL}")
            return True
        except sqlite3.Error as e:
            print(f"{Fore.RED}Error connecting to database: {e}{Style.RESET_ALL}")
            return False
    
    def load_data(self):
        """Load data from the database."""
        if not self.conn:
            if not self.connect_to_database():
                return False
        
        try:
            # Load universities data
            self.universities = pd.read_sql_query("SELECT * FROM universities", self.conn)
            
            # Load programs data
            self.programs = pd.read_sql_query("SELECT * FROM programs", self.conn)
            
            # Load countries data if available
            try:
                self.countries = pd.read_sql_query("SELECT * FROM countries", self.conn)
            except:
                print(f"{Fore.YELLOW}No countries table found, continuing without country data{Style.RESET_ALL}")
            
            print(f"{Fore.GREEN}✓ Data loaded successfully{Style.RESET_ALL}")
            print(f"  - {len(self.universities)} universities")
            print(f"  - {len(self.programs)} programs")
            
            return True
        except sqlite3.Error as e:
            print(f"{Fore.RED}Error loading data: {e}{Style.RESET_ALL}")
            return False
    
    def collect_preferences(self):
        """Collect user preferences through interactive prompts."""
        print(f"\n{Fore.CYAN}===== STUDENT COURSE SELECTION PREFERENCES ====={Style.RESET_ALL}")
        print("Please answer the following questions to help us recommend courses.\n")
        
        # Academic preferences
        print(f"{Fore.CYAN}--- Academic Preferences ---{Style.RESET_ALL}")
        field_of_study = input("What field are you interested in? (e.g., Computer Science, Business): ")
        degree_levels = ['Bachelor', 'Master', 'PhD']
        for i, level in enumerate(degree_levels, 1):
            print(f"{i}. {level}")
        degree_level_idx = int(input("Select your preferred degree level (1-3): ")) - 1
        degree_level = degree_levels[degree_level_idx] if 0 <= degree_level_idx < len(degree_levels) else degree_levels[0]
        
        # Financial constraints
        print(f"\n{Fore.CYAN}--- Financial Constraints ---{Style.RESET_ALL}")
        max_tuition = float(input("What is your maximum annual tuition budget (USD)? "))
        max_living = float(input("What is your maximum monthly living expense budget (USD)? "))
        
        # Location preferences
        print(f"\n{Fore.CYAN}--- Location Preferences ---{Style.RESET_ALL}")
        countries_input = input("Enter preferred countries (comma-separated, leave blank for any): ")
        preferred_countries = [c.strip() for c in countries_input.split(',')] if countries_input else []
        
        # Language preferences
        print(f"\n{Fore.CYAN}--- Language Preferences ---{Style.RESET_ALL}")
        language_options = ['English only', 'Any language with English programs', 'Open to learning a new language']
        for i, option in enumerate(language_options, 1):
            print(f"{i}. {option}")
        language_idx = int(input("Select your language preference (1-3): ")) - 1
        language_pref = language_options[language_idx] if 0 <= language_idx < len(language_options) else language_options[0]
        
        # Criteria importance
        print(f"\n{Fore.CYAN}--- Criteria Importance ---{Style.RESET_ALL}")
        print("Rate the importance of each criterion (1-10, 10 being most important):")
        
        # Store preferences
        self.user_preferences = {
            'field_of_study': field_of_study,
            'degree_level': degree_level,
            'max_tuition': max_tuition,
            'max_living_expenses': max_living,
            'preferred_countries': preferred_countries,
            'language_preference': language_pref
        }
        
        # Update weights
        criteria_importance = {}
        for criterion, default_weight in self.criteria_weights.items():
            criterion_display = criterion.replace('_', ' ').title()
            rating = int(input(f"{criterion_display} (1-10): "))
            criteria_importance[criterion] = rating
        
        # Normalize weights to sum to 1
        total_importance = sum(criteria_importance.values())
        for criterion in criteria_importance:
            self.criteria_weights[criterion] = criteria_importance[criterion] / total_importance
        
        return True
    
    def filter_programs(self):
        """Filter programs based on hard constraints."""
        if self.programs is None or self.universities is None:
            print(f"{Fore.RED}Data not loaded. Please load data first.{Style.RESET_ALL}")
            return None
        
        # Merge programs with university data
        merged_data = self.programs.merge(
            self.universities, 
            left_on='university_id', 
            right_on='id',
            suffixes=('_program', '_university')
        )
        
        # Apply filters based on preferences
        filtered_data = merged_data.copy()
        
        # Filter by field of study
        if 'field_of_study' in self.user_preferences and self.user_preferences['field_of_study']:
            field = self.user_preferences['field_of_study'].lower()
            filtered_data = filtered_data[
                filtered_data['field'].str.lower().str.contains(field) | 
                filtered_data['name_program'].str.lower().str.contains(field)
            ]
        
        # Filter by degree level
        if 'degree_level' in self.user_preferences and self.user_preferences['degree_level']:
            level = self.user_preferences['degree_level'].lower()
            filtered_data = filtered_data[
                filtered_data['level'].str.lower() == level
            ]
        
        # Filter by tuition cost
        if 'max_tuition' in self.user_preferences:
            filtered_data = filtered_data[
                filtered_data['tuition_per_year'] <= self.user_preferences['max_tuition']
            ]
        
        # Filter by country if preferred countries are specified
        if ('preferred_countries' in self.user_preferences and 
            self.user_preferences['preferred_countries']):
            countries = [c.lower() for c in self.user_preferences['preferred_countries']]
            filtered_data = filtered_data[
                filtered_data['country'].str.lower().isin(countries)
            ]
        
        # Filter by language preference
        if 'language_preference' in self.user_preferences:
            if self.user_preferences['language_preference'] == 'English only':
                filtered_data = filtered_data[
                    filtered_data['language'].str.lower() == 'english'
                ]
            elif self.user_preferences['language_preference'] == 'Any language with English programs':
                # This is a softer constraint - will be handled in scoring
                pass
        
        return filtered_data
    
    def apply_diversity_boosting(self, scored_programs):
        """
        Ensure diversity in recommendations by slightly boosting unique combinations 
        of countries, universities and fields.
        """
        if scored_programs is None or len(scored_programs) == 0:
            return scored_programs
            
        try:
            # Create a copy to avoid modifying the original
            diverse_programs = scored_programs.copy()
            
            # Track countries and universities already in top results
            countries_seen = set()
            universities_seen = set()
            fields_seen = set()
            
            # Apply diversity boosting
            for idx, row in diverse_programs.iterrows():
                country = row['country']
                university = row['name_university']
                field = row['field']
                
                diversity_boost = 0
                
                # Boost unique countries
                if country not in countries_seen:
                    diversity_boost += 0.03
                    countries_seen.add(country)
                
                # Boost unique universities
                if university not in universities_seen:
                    diversity_boost += 0.02
                    universities_seen.add(university)
                    
                # Boost unique fields of study
                if field not in fields_seen:
                    diversity_boost += 0.01
                    fields_seen.add(field)
                    
                # Apply the diversity boost
                diverse_programs.at[idx, 'final_score'] = row['final_score'] + diversity_boost
                diverse_programs.at[idx, 'match_percentage'] = min(100, (diverse_programs.at[idx, 'final_score'] * 100).round(1))
            
            # Re-sort after applying diversity boost
            return diverse_programs.sort_values(by='final_score', ascending=False)
            
        except Exception as e:
            print(f"{Fore.RED}Error applying diversity boosting: {e}{Style.RESET_ALL}")
            return scored_programs
    
    def generate_explanations(self, top_programs):
        """
        Generate human-readable explanations for why each program was recommended.
        """
        explanations = []
        
        for _, program in top_programs.iterrows():
            explanation_points = []
            
            # Academic fit
            if program['academic_fit_score'] > 0.8:
                explanation_points.append("Strong match with your academic interests")
            
            # Tuition within budget
            if 'tuition_cost_score' in program and program['tuition_cost_score'] > 0.7:
                explanation_points.append(f"Fits well within your budget at ${program['tuition_per_year']:,.0f}/year")
            
            # Good university ranking
            if 'university_ranking_score' in program and program['university_ranking_score'] > 0.7:
                explanation_points.append(f"Well-ranked institution (#{program['ranking_global']} globally)")
            
            # Language preference match
            if 'language_score' in program and program['language_score'] > 0.9:
                explanation_points.append("Matches your language preferences")
                
            # Location preference match
            if ('location_score' in program and program['location_score'] > 0.9 and 
                'country' in program and 'preferred_countries' in self.user_preferences and 
                program['country'] in self.user_preferences['preferred_countries']):
                explanation_points.append(f"Located in your preferred country ({program['country']})")
            
            # Generate a readable explanation
            if explanation_points:
                explanation = "Recommended because: " + "; ".join(explanation_points) + "."
            else:
                explanation = "Strong overall match with your preferences."
                
            explanations.append(explanation)
            
        return explanations
    
    def score_programs(self, filtered_programs):
        """Calculate scores for each program based on weighted criteria."""
        if filtered_programs is None or len(filtered_programs) == 0:
            print(f"{Fore.YELLOW}No programs match your criteria. Try relaxing some constraints.{Style.RESET_ALL}")
            return None
        
        # Create a copy of the data for scoring
        scored_programs = filtered_programs.copy()
        
        # Initialize score columns
        for criterion in self.criteria_weights:
            scored_programs[f'{criterion}_score'] = 0.0
        
        # Academic fit score - IMPROVED with semantic matching
        if 'field_of_study' in self.user_preferences and self.user_preferences['field_of_study']:
            field_keywords = self.extract_keywords(self.user_preferences['field_of_study'])
            scored_programs['academic_fit_score'] = scored_programs.apply(
                lambda row: self.calculate_academic_fit(row, field_keywords), axis=1
            )
        else:
            scored_programs['academic_fit_score'] = 1.0
        
        # Tuition cost score (lower is better) - IMPROVED with logarithmic scaling
        max_tuition = scored_programs['tuition_per_year'].max()
        min_tuition = scored_programs['tuition_per_year'].min()
        
        user_max_tuition = self.user_preferences.get('max_tuition', max_tuition * 1.5)
        
        if max_tuition > min_tuition:
            # Apply logarithmic scaling to better represent diminishing returns
            scored_programs['tuition_cost_score'] = scored_programs['tuition_per_year'].apply(
                lambda x: max(0, min(1, 1 - (math.log(x + 1) - math.log(min_tuition + 1)) / 
                                      (math.log(user_max_tuition + 1) - math.log(min_tuition + 1))))
            )
        else:
            scored_programs['tuition_cost_score'] = 1.0
            
        # Living cost score based on country (if available)
        if self.countries is not None and 'average_living_cost' in self.countries.columns:
            # Join with countries to get living costs
            country_costs = self.countries.set_index('name')['average_living_cost'].to_dict()
            scored_programs['living_cost'] = scored_programs['country'].map(country_costs)
            
            # Score based on living costs (lower is better)
            max_living = scored_programs['living_cost'].max()
            min_living = scored_programs['living_cost'].min()
            if max_living > min_living:
                scored_programs['living_cost_score'] = 1 - (
                    (scored_programs['living_cost'] - min_living) / (max_living - min_living)
                )
            else:
                scored_programs['living_cost_score'] = 1.0
        else:
            # Default values if country data not available
            scored_programs['living_cost_score'] = 0.5
        
        # University ranking score (lower ranking number is better) - IMPROVED with exponential weighting
        if 'ranking_global' in scored_programs.columns:
            max_rank = scored_programs['ranking_global'].max()
            min_rank = scored_programs['ranking_global'].min()
            
            if max_rank > min_rank:
                scored_programs['university_ranking_score'] = scored_programs['ranking_global'].apply(
                    lambda x: math.exp(-(x - min_rank) / (max_rank - min_rank)) if x > 0 else 0.5
                )
            else:
                scored_programs['university_ranking_score'] = 0.5
        else:
            scored_programs['university_ranking_score'] = 0.5
        
        # Language score - IMPROVED with preference weighting
        if self.user_preferences['language_preference'] == 'English only':
            scored_programs['language_score'] = (scored_programs['language'].str.lower() == 'english').astype(float)
        elif self.user_preferences['language_preference'] == 'Any language with English programs':
            scored_programs['language_score'] = np.where(
                scored_programs['language'].str.lower() == 'english', 
                1.0, 0.7)
        else:
            scored_programs['language_score'] = 1.0  # If open to any language
            
        # Location score - IMPROVED with region matching
        if self.user_preferences.get('preferred_countries'):
            preferred = [c.lower() for c in self.user_preferences['preferred_countries']]
            
            # Check for direct country match first (higher score)
            direct_match = scored_programs['country'].str.lower().isin(preferred).astype(float)
            
            # Also check for region match (lower score but still valuable)
            region_match = scored_programs.apply(
                lambda row: self.is_in_same_region(row['country'], preferred), axis=1
            )
            
            # Combine scores - direct match gets full score, region match gets partial score
            scored_programs['location_score'] = direct_match.apply(
                lambda x: 1.0 if x == 1.0 else (0.7 if region_match[x.name] else 0.4)
            )
        else:
            scored_programs['location_score'] = 0.5
        
        # Calculate final weighted score with confidence adjustment
        scored_programs['final_score'] = 0
        for criterion, weight in self.criteria_weights.items():
            scored_programs['final_score'] += scored_programs[f'{criterion}_score'] * weight
            
        # Add confidence score based on data completeness
        scored_programs['confidence_score'] = scored_programs.apply(
            lambda row: self.calculate_confidence(row), axis=1
        )
        
        # Adjust final score by confidence
        scored_programs['final_score'] = scored_programs['final_score'] * scored_programs['confidence_score']
        
        # Scale to 0-100
        scored_programs['match_percentage'] = (scored_programs['final_score'] * 100).round(1)
        
        # Sort by final score descending
        return scored_programs.sort_values(by='final_score', ascending=False)
    
    def display_recommendations(self, scored_programs, top_n=10):
        """Display top program recommendations."""
        if scored_programs is None or len(scored_programs) == 0:
            print(f"{Fore.RED}No recommendations available.{Style.RESET_ALL}")
            return
            
        # Select top N programs
        top_programs = scored_programs.head(top_n)
        
        print(f"\n{Fore.GREEN}===== TOP {min(top_n, len(top_programs))} RECOMMENDED PROGRAMS ====={Style.RESET_ALL}")
        
        # Prepare data for tabulate
        display_data = []
        for _, program in top_programs.iterrows():
            display_data.append([
                f"{Fore.CYAN}{program['name_program']}{Style.RESET_ALL}",
                program['name_university'],
                program['country'],
                program['level'],
                f"${program['tuition_per_year']:,.0f}",
                f"{program['match_percentage']}%"
            ])
        
        # Display table
        headers = ["Program", "University", "Country", "Level", "Tuition/Year", "Match"]
        print(tabulate(display_data, headers=headers, tablefmt="grid"))
        
        # Display details of top program
        self.display_program_details(top_programs.iloc[0])
        
        return top_programs
    
    def display_program_details(self, program):
        """Display detailed information about a program."""
        print(f"\n{Fore.GREEN}===== TOP RECOMMENDATION DETAILS ====={Style.RESET_ALL}")
        
        print(f"{Fore.CYAN}Program:{Style.RESET_ALL} {program['name_program']}")
        print(f"{Fore.CYAN}University:{Style.RESET_ALL} {program['name_university']}")
        print(f"{Fore.CYAN}Location:{Style.RESET_ALL} {program['city']}, {program['country']}")
        print(f"{Fore.CYAN}Degree Level:{Style.RESET_ALL} {program['level']}")
        print(f"{Fore.CYAN}Field:{Style.RESET_ALL} {program['field']}")
        print(f"{Fore.CYAN}Language:{Style.RESET_ALL} {program['language']}")
        print(f"{Fore.CYAN}Duration:{Style.RESET_ALL} {program['duration']} years")
        print(f"{Fore.CYAN}Tuition:{Style.RESET_ALL} ${program['tuition_per_year']:,.0f} per year")
        print(f"{Fore.CYAN}Application Fee:{Style.RESET_ALL} ${program['application_fee']:,.0f}")
        print(f"{Fore.CYAN}University Ranking:{Style.RESET_ALL} #{program['ranking_global']} globally")
        
        if 'admission_requirements' in program:
            print(f"{Fore.CYAN}Admission Requirements:{Style.RESET_ALL}")
            print(f"  {program['admission_requirements']}")
            
        print(f"\n{Fore.CYAN}Match Score:{Style.RESET_ALL} {program['match_percentage']}%")
        
        # Show score breakdown
        print(f"\n{Fore.CYAN}Score Breakdown:{Style.RESET_ALL}")
        for criterion, weight in self.criteria_weights.items():
            criterion_score = program[f'{criterion}_score'] * 100
            print(f"  {criterion.replace('_', ' ').title()}: {criterion_score:.1f}% (Weight: {weight*100:.1f}%)")
    
    def visualize_results(self, scored_programs, top_n=5):
        """Create visualizations of the results."""
        if scored_programs is None or len(scored_programs) == 0:
            return
            
        top_programs = scored_programs.head(top_n)
        
        try:
            # Create a figure with two subplots
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
            
            # Bar chart of top programs by match percentage
            programs = top_programs['name_program'].tolist()
            scores = top_programs['match_percentage'].tolist()
            universities = top_programs['name_university'].tolist()
            
            # Create labels combining program and university names
            labels = [f"{p}\n({u})" for p, u in zip(programs, universities)]
            
            ax1.barh(labels, scores, color='skyblue')
            ax1.set_xlabel('Match Percentage')
            ax1.set_title('Top Program Recommendations')
            ax1.grid(axis='x', linestyle='--', alpha=0.7)
            
            # Add score labels
            for i, v in enumerate(scores):
                ax1.text(v + 1, i, f"{v}%", va='center')
            
            # Radar chart of criteria scores for top program
            top_program = top_programs.iloc[0]
            criteria = list(self.criteria_weights.keys())
            criteria_display = [c.replace('_', ' ').title() for c in criteria]
            
            # Get scores for the top program
            values = [top_program[f'{c}_score'] * 100 for c in criteria]
            
            # Close the polygon
            values.append(values[0])
            criteria_display.append(criteria_display[0])
            
            # Compute angle for each criterion
            angles = np.linspace(0, 2*np.pi, len(criteria), endpoint=False).tolist()
            angles.append(angles[0])
            
            ax2.plot(angles, values, 'o-', linewidth=2, label=top_program['name_program'])
            ax2.fill(angles, values, alpha=0.25)
            ax2.set_thetagrids(np.degrees(angles[:-1]), criteria_display[:-1])
            ax2.set_ylim(0, 100)
            ax2.grid(True)
            ax2.set_title(f"Criteria Scores for Top Program")
            
            plt.tight_layout()
            plt.savefig("program_recommendations.png")
            print(f"\n{Fore.GREEN}Chart saved as program_recommendations.png{Style.RESET_ALL}")
            plt.close()
            
        except Exception as e:
            print(f"{Fore.YELLOW}Could not create visualization: {e}{Style.RESET_ALL}")
    
    def run(self):
        """Run the entire decision support process."""
        print(f"\n{Fore.CYAN}===== UNIVERSITY COURSE SELECTION ASSISTANT ====={Style.RESET_ALL}")
        print("This tool will help you find the best university courses based on your preferences.\n")
        
        if not self.load_data():
            return False
            
        self.collect_preferences()
        filtered_programs = self.filter_programs()
        
        if filtered_programs is None or len(filtered_programs) == 0:
            print(f"{Fore.YELLOW}No programs match your criteria. Please try again with different preferences.{Style.RESET_ALL}")
            return False
            
        print(f"\n{Fore.GREEN}Found {len(filtered_programs)} programs matching your criteria.{Style.RESET_ALL}")
        scored_programs = self.score_programs(filtered_programs)
        scored_programs = self.apply_diversity_boosting(scored_programs)
        top_programs = self.display_recommendations(scored_programs)
        
        if top_programs is not None and len(top_programs) > 0:
            self.visualize_results(scored_programs)
            
        print(f"\n{Fore.GREEN}Analysis complete!{Style.RESET_ALL}")
        return True


    def extract_keywords(self, text):
        """Extract keywords from text for better matching."""
        # Simple implementation - split by spaces and common separators
        if not text:
            return []
        words = text.lower().replace(',', ' ').replace(';', ' ').split()
        return [w for w in words if len(w) > 2]
        
    def calculate_academic_fit(self, row, field_keywords):
        """Calculate academic fit score based on keyword matching."""
        if not field_keywords:
            return 0.5
            
        # Get program name and field text
        program_text = f"{row['name_program']} {row['field']}".lower()
        
        # Count matching keywords
        matches = sum(1 for keyword in field_keywords if keyword in program_text)
        
        # Calculate score based on match ratio
        score = min(1.0, matches / len(field_keywords)) if field_keywords else 0.5
        return score
        
    def is_in_same_region(self, country, preferred_countries):
        """Check if a country is in the same region as any preferred country."""
        # Simple region groupings
        regions = {
            'europe': ['germany', 'france', 'italy', 'spain', 'netherlands', 
                       'belgium', 'austria', 'switzerland', 'uk', 'ireland'],
            'north_america': ['usa', 'united states', 'canada', 'mexico'],
            'asia': ['china', 'japan', 'south korea', 'singapore', 'india', 'malaysia'],
            'oceania': ['australia', 'new zealand'],
        }
        
        # Find region of the country
        country_region = None
        for region, countries in regions.items():
            if country.lower() in countries:
                country_region = region
                break
                
        # Check if any preferred country is in the same region
        if country_region:
            for preferred in preferred_countries:
                for region, countries in regions.items():
                    if preferred in countries and region == country_region:
                        return True
        
        return False
        
    def calculate_confidence(self, row):
        """Calculate confidence score based on data completeness."""
        # Check presence of important data points
        key_fields = ['name_program', 'name_university', 'tuition_per_year', 
                      'ranking_global', 'language', 'duration']
        
        # Count how many important fields have values
        valid_fields = sum(1 for field in key_fields if field in row and pd.notna(row[field]))
        
        # Calculate confidence as ratio of valid fields
        confidence = valid_fields / len(key_fields)
        
        # Scale to a reasonable range (0.7-1.0)
        return 0.7 + (confidence * 0.3)
    
if __name__ == "__main__":
    assistant = CourseSelectionAssistant()
    assistant.run()