const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought
} = require('../../controllers/thought')
//api/thought
router.route('/').get(getThoughts).post(createThought);

//api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;