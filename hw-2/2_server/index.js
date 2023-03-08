const Application = require('./framework/Application');
const startMsg = require('./framework/serverStartMessage');
const jsonParser = require('./framework/middlewares/parseJson');
const urlParser = require('./framework/middlewares/parseUrl');
const genreRouter = require('./router/genre-router');
const filmRouter = require('./router/film-router');


const PORT = process.env.PORT || 8000;

const app = new Application();
const serverUrl = `http://127.0.0.1:${PORT}`;

app.use(jsonParser);
app.use(urlParser(serverUrl));

app.addRouter(genreRouter);
app.addRouter(filmRouter);

app.listen(PORT, startMsg(serverUrl));
