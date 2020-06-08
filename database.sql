
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- user -------------------------------------------------------
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL,
    admin boolean
);

CREATE UNIQUE INDEX user_pkey ON "user"(id int4_ops);
CREATE UNIQUE INDEX user_username_key ON "user"(username text_ops);


-- dance_styles -------------------------------------------------------
CREATE TABLE dance_styles (
    id SERIAL PRIMARY KEY,
    dance_form character varying(255)
);

CREATE UNIQUE INDEX dance_styles_pkey ON dance_styles(id int4_ops);

-- event -------------------------------------------------------
CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    event_name character varying(100) NOT NULL,
    event_location character varying(250) NOT NULL,
    street character varying(255),
    city character varying(60),
    event_dancer_count integer,
    dance_theme integer REFERENCES dance_styles(id),
    event_description text,
    event_date timestamp with time zone,
    state character varying(12),
    zip character varying(12),
    created_date timestamp with time zone,
    event_image character varying(2000)
);

CREATE UNIQUE INDEX event_pkey ON event(id int4_ops);

-- dancer -------------------------------------------------------
CREATE TABLE dancer (
    id integer PRIMARY KEY,
    first_name character varying(80) NOT NULL,
    last_name character varying(80) NOT NULL,
    contact_number text,
    email_id character varying(200),
    dance_style integer REFERENCES dance_styles(id)
);

CREATE UNIQUE INDEX dancer_pkey ON dancer(id int4_ops);


-- dancer_events -------------------------------------------------------
CREATE TABLE dancer_events (
    id SERIAL PRIMARY KEY,
    dancer_id integer,
    event_id integer
);

CREATE UNIQUE INDEX dancer_events_pkey ON dancer_events(id int4_ops);