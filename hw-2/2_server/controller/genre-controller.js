const db = require('../db');

const createGenre = async (req, res) => {
    const {name} = req.body;
    // Добавление нового жанра
    const sql = `INSERT INTO genres (name) VALUES ($1) RETURNING *`;

    const newGenre = await db.query(sql, [name]);

    res.send(newGenre.rows[0]);
};

const getGenre = async (req, res) => {
    // Вывод всех жанров
    const sql = `SELECT * FROM genres`
    const genres = await db.query(sql);

    res.send(genres.rows);
};

const updateGenre = async (req, res) => {
    const {id, name} = req.body;
    // Обновление информации о жанре по id
    const sql = `UPDATE genres SET name = $1 WHERE id = $2 RETURNING *`

    const genres = await db.query(sql, [name, id]);

    res.send(genres.rows[0]);
};

const deleteGenre = async (req, res) => {
    const {id} = req.body;
    // Удаление жанра по id
    const sql = `DELETE FROM genres WHERE id = $1 RETURNING *`;
    // Удаление всех связей данного жанра со всеми фильмами
    const sqlDeleteFilmGenre = `DELETE FROM film_genre WHERE film_genre.id_genre = $1`;

    await db.query(sqlDeleteFilmGenre, [id]);
    const genre = await db.query(sql, [id]);

    res.send(genre.rows[0]);
};

module.exports = {
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
}
