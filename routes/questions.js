const router  = require('express').Router();
const questionController = require('../controllers/questionController');

router.route('/get').get(questionController.get);

router.route('/add').post(questionController.create);

router.route('/answer').post(questionController.answer);

module.exports = router;