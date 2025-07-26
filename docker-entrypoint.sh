#!/bin/sh
set -e

# Continue with the main command
exec "$@"
  echo "Waiting for PostgreSQL to be ready..."
  
  # Attempt to connect to PostgreSQL
  until nc -z postgres 5432; do
    echo "PostgreSQL is not available yet - sleeping"
    sleep 2
  done
  
  echo "PostgreSQL is up - executing seeder"


# Run the seeder if this is the first time
if [ ! -f /app/.seed_completed ]; then
  wait_for_postgres
  echo "Running database seed..."
  node scripts/seedDatabase.js
  touch /app/.seed_completed
  echo "Seeding completed!"
fi

# Continue with the main command
exec "$@"
exec "$@"
