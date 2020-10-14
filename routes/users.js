const router  = require('express').Router();
const userController = require('../controllers/userController');

router.route('/get').get(userController.get);

router.route('/add').post(userController.add);

router.route('/ranking').get(userController.ranking);

router.route('/reset').post(userController.reset);

module.exports = router;