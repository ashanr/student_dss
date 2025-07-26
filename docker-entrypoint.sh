#!/bin/sh
set -e

wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  
  # Attempt to connect to PostgreSQL
  until nc -z postgres 5432; do
    echo "PostgreSQL is not available yet - sleeping"
    sleep 2
  done
  
  echo "PostgreSQL is up - executing command"
}

# Run the seeder if this is the first time
if [ ! -f /app/.seed_completed ]; then
  wait_for_postgres
  echo "Running database seed..."
  
  # Check if the seed script exists
  if [ -f /app/scripts/seedDatabase.js ]; then
    node /app/scripts/seedDatabase.js
    echo "Seeding completed!"
    touch /app/.seed_completed
  elif [ -f /scripts/seedDatabase.js ]; then
    node /scripts/seedDatabase.js
    echo "Seeding completed!"
    touch /app/.seed_completed
  else
    echo "Warning: Could not find seedDatabase.js script!"
    echo "Checked paths:"
    echo "  - /app/scripts/seedDatabase.js"
    echo "  - /scripts/seedDatabase.js"
    echo "Listing contents of /app:"
    ls -la /app
    echo "Listing contents of /:"
    ls -la /
  fi
fi

# Continue with the main command
exec "$@"
exec "$@"
exec "$@"
