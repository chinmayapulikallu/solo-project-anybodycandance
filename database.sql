
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "event" (
"id" SERIAL PRIMARY KEY,
"event_name" VARCHAR (100) NOT NULL,
"event_location" VARCHAR(250) NOT NULL,
"event_address_line1" VARCHAR(500),
"event_address_line2" VARCHAR(500),
"max_participants" INTEGER
);

CREATE TABLE "dancer" (
"id" SERIAL PRIMARY KEY,
"first_name" VARCHAR(80) NOT NULL,
"last_name" VARCHAR(80) NOT NULL,
"contact_number" INTEGER,
"email_id" VARCHAR(200)
);

CREATE TABLE "dance_styles" (
"id" SERIAL PRIMARY KEY,
"dance_form" VARCHAR(255)
);

CREATE TABLE "dancer_events" (
"id" SERIAL PRIMARY KEY
);