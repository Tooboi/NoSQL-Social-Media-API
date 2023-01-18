const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    postNewReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThought)

router.route('/:thoughtId').get(getSingleThought)

// router.route('/:thoughtId/reactions').post(postNewReaction)

module.exports = router;