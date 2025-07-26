-- Create the sessions table for connect-pg-simple session storage
CREATE TABLE IF NOT EXISTS "sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("sid")
);

-- Create an index on the expire field for better performance
CREATE INDEX IF NOT EXISTS "IDX_sessions_expire" ON "sessions" ("expire");
