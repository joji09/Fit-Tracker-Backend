\echo 'Delete and recreate fit-tracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fittracker;
CREATE DATABASE fittracker;
\connect fittracker

\i fittracker-schema.sql
\i fittracker-seed.sql