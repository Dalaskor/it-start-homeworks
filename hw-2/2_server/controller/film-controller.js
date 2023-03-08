const db = require('../db');

const createFilm = async (req, res) => {
    const {name, year, genres_id} = req.body;
    // Заполнение таблицы films
    const sqlFilm = `INSERT INTO films (name, year) VALUES ($1, $2) RETURNING *`;
    // Заполнение таблицы film_genre
    const sqlFilmGenre = `INSERT INTO film_genre (id_film, id_genre) VALUES ($1, $2)`;
    // Вывод всех жанров связанных с фильмом
    const sqlFilmGenres = `SELECT genres.id, genres.name FROM genres JOIN film_genre ON film_genre.id_genre = genres.id WHERE film_genre.id_film = $1`;

    const newFilm = await db.query(sqlFilm, [name, year]);
    const film_id = newFilm.rows[0].id;

    for (const genre_id of genres_id) {
        await db.query(sqlFilmGenre, [film_id, genre_id]);
    }

    const genres = await db.query(sqlFilmGenres, [film_id]);

    const film = newFilm.rows[0];
    film.genres = genres.rows;

    res.send(film);
};

const getFilm = async (req, res) => {
    // Вывод всех фильмов
    const sql = `SELECT * FROM films`;
    // Вывод всех жанров связанных с фильмом
    const sqlFilmGenres = `SELECT genres.id, genres.name FROM genres JOIN film_genre ON film_genre.id_genre = genres.id WHERE film_genre.id_film = $1`;

    const filmsQuery = await db.query(sql);
    const films = filmsQuery.rows;

    for (const film of films) {
        const genres = await db.query(sqlFilmGenres, [film.id]);
        film.genres = genres.rows;
    }

    res.send(films);
};

const updateFilm = async (req, res) => {
    const {id, name, year, genres_id} = req.body;
    // Обновление информации о фильме по id
    const sql = `UPDATE films SET name = $1, year = $2 WHERE id = $3 RETURNING *`;
    // Обновление информации о жанрах в фильме
    const sqlFilmGenre = `INSERT INTO film_genre (id_film, id_genre) VALUES ($1, $2)`;
    // Удаление всех жанров связанных с данным фильмом
    const sqlDeleteFilmGenres = `DELETE FROM film_genre WHERE id_film = $1`;
    // Вывод всех жанров связанных с фильмом
    const sqlFilmGenres = `SELECT genres.id, genres.name FROM genres JOIN film_genre ON film_genre.id_genre = genres.id WHERE film_genre.id_film = $1`;

    await db.query(sqlDeleteFilmGenres, [id]);
    for (const genre_id of genres_id) {
        await db.query(sqlFilmGenre, [id, genre_id]);
    }

    const updatedFilm = await db.query(sql, [name, year, id]);
    const genres = await db.query(sqlFilmGenres, [id]);
    const film = updatedFilm.rows[0];
    film.genres = genres.rows;

    res.send(film);

    res.send(film.rows[0]);
};

const delteFilm = async (req, res) => {
    const {id} = req.body;
    // Удаление фильма по id
    const sqlDeleteFilmGenre = `DELETE FROM film_genre WHERE film_genre.id_film = $1`;
    // Удаление всех жанров связанных с фильмом
    const sqlDeleteFilm = `DELETE FROM films WHERE films.id = $1 RETURNING *`;

    await db.query(sqlDeleteFilmGenre, [id]);
    const film = await db.query(sqlDeleteFilm, [id]);

    res.send(film.rows[0]);
};

module.exports = {
    createFilm,
    getFilm,
    updateFilm,
    delteFilm,
};
