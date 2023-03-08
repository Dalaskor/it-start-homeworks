const Router = require('../framework/Router');
const controller = require('../controller/film-controller');


const router = new Router();

router.post('/films', controller.createFilm);
router.get('/films', controller.getFilm);
router.put('/films', controller.updateFilm);
router.delete('/films', controller.delteFilm);

module.exports = router;
