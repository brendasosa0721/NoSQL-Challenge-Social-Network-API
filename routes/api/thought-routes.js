//Creating the routes for the data

const router = require('express').Router();

const {
    getEveryThought,
    getThoughtById,
    createThought,
    updateThought,
    eraseThought,
    createReaction,
    eraseReaction
} = require('../../controllers/thought-controller');

// Get all api thoughts by ID
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(eraseThought)


// Post

router
.route('/:thoughtId/reactions')
.post(createReaction);

router
,route('/:thoughtId/reactions/:reactionId')
.delete(eraseReaction);

//Exporting

module.exports = router;

