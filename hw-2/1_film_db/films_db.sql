--CREATE DATABASE films;
-- \c films

DROP TABLE IF EXISTS genres CASCADE;
CREATE TABLE genres(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

DROP TABLE IF EXISTS ageRating CASCADE;
CREATE TABLE ageRating (
    id SERIAL PRIMARY KEY,
    raiting INT
);

DROP TABLE IF EXISTS mpaaRating CASCADE;
CREATE TABLE mpaaRating(
    id SERIAL PRIMARY KEY,
    rating VARCHAR(10)
);

DROP TABLE IF EXISTS countries CASCADE;
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

DROP TABLE IF EXISTS persons CASCADE;
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    role_id INT REFERENCES roles(id)
);

DROP TABLE IF EXISTS films CASCADE;
CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    year INT,
    tagline VARCHAR(150),
    budget INT,
    marketing INT,
    us_feels INT,
    world_feels INT,
    time INT,
    description TEXT,
    rating FLOAT,
    country_id INT REFERENCES countries(id),
    director_id INT REFERENCES persons(id),
    screenwriter_id INT REFERENCES persons(id),
    producer_id INT REFERENCES persons(id),
    operator_id INT REFERENCES persons(id),
    composer_id INT REFERENCES persons(id),
    artist_id INT REFERENCES persons(id),
    editor_id INT REFERENCES persons(id),
    age_rating_id INT REFERENCES agerating(id),
    mpaa_rating_id INT REFERENCES mpaarating(id)
);

DROP TABLE IF EXISTS film_genre CASCADE;
CREATE TABLE film_genre (
    film_id INT REFERENCES films(id),
    genre_id INT REFERENCES genres(id)
);

DROP TABLE IF EXISTS film_person CASCADE;
CREATE TABLE film_person (
    film_id INT REFERENCES films(id),
    person_id INT REFERENCES persons(id)
);

DROP TABLE IF EXISTS trailers CASCADE;
CREATE TABLE trailers (
    id SERIAL PRIMARY KEY,
    url VARCHAR(100),
    name VARCHAR(60),
    date_upload DATE,
    film_id INT REFERENCES films(id)
);

DROP TABLE IF EXISTS spectators CASCADE;
CREATE TABLE spectators (
    id SERIAL PRIMARY KEY,
    count_spectators INT,
    country_id INT REFERENCES countries(id),
    film_id INT REFERENCES films(id)
);
