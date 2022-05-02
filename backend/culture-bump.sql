\echo
\prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE culture_bump
\connect culture_bump

\i culture-bump-schema.sql
\i culture-bump-seed.sql

-- \echo 
-- \prompt

-- DROP DATABASE culture_bump_test
-- CREATE DATABASE culture_bump_test
-- \connect culture_bump_test

-- \i culture-bump-schema.sql