// Dependencies

const { User, Thought } = require ('../models');

//API for thought

const thoughtController = {
// Get all the thoughts by find
getEveryThought ( req, res) {
Thought.find({})
.populate({
    path:'reactions',
    select: '-__v'
})
.select('-__v')
.sort({ _id: -1 })
.then (dbThoughtData => res.json(dbThoughtData))
.catch(err => {
    console.log(err);
    res.sendStatus(400);
});
},

// Get individual thought by id using findOne
getThoughtById({ params }, res ) {
    Thought.findOne({_id: params.id })
    .populate({
        path:'reactions',
        select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => {
        if (!dbThoughtData){
            res.status(404).json({ message: 'Sorry, no thought found by ID!!! Try again'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

createThought ({ body }, res ) {
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate (
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json ({ message: ' Sorry, no user found with this ID!!, Try again.'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));

},

// Update Thought by ID

updateThought ({ params, body }, res ) {
    Thought.findOneAndUpdate ({ _id: params.id }, body, { new: true, runValidators: true})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json ({ message: 'Sorry, no thoughts found with this ID!!!, Try again'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},

//Erase thought by ID

eraseThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughData => {
    if (!dbThoughData) {
        res.status(404).json({ message: 'Sorry, no thoughts doung by this ID!!!, Try again'});
        return;
    }
    return User.findOneAndUpdate(
        { _id: parmas.userId },
        { $push: { thoughts: params.Id } },
        {new: true }
    )
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

createReaction({ params, boby }, res ){
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        {$push: {reactions: body } },
        {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughData => {
            if(!dbThoughData) {
                res.status(404).json({ message: 'No thoughts with this ID!!!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
},

eraseReaction({ params }, res) {
    Thought.findOneAndUpdate(
        {_id:params.thoughtID },
        {$pull: { reactions: {reactionId: params.reactionId } } },
        { new: true }
    )

    .then(dbThoughData => {
        if (!dbThoughData) {
            res.status(404).json({ message: 'Sorry'});
            return;
        }
        res.json(dbThoughData);
    })
    .catch(err => res.json(err));
}
};


//Exporting

module.exports = thoughtController
