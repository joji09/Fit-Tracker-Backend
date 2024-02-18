\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE fittracker;
CREATE DATABASE fittracker;
\connect fittracker

\i jobly-schema.sql