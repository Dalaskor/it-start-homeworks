const Router = require('../framework/Router');
const controller = require('../controller/genre-controller');


const router = new Router();

router.post('/genres', controller.createGenre);
router.get('/genres', controller.getGenre);
router.put('/genres', controller.updateGenre);
router.delete('/genres', controller.deleteGenre);

module.exports = router;
