#!/bin/sh
set -e

# Run the seeder if this is the first time
if [ ! -f /app/.seed_completed ]; then
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
