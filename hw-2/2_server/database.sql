DROP TABLE IF EXISTS genres CASCADE;
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

DROP TABLE IF EXISTS films CASCADE;
CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    year INTEGER
);

DROP TABLE IF EXISTS film_genre CASCADE;
CREATE TABLE film_genre (
    id_film INTEGER REFERENCES films(id),
    id_genre INTEGER REFERENCES genres(id)
);
