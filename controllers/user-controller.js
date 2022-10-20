// Dependecies

const { User, Thought } = require('../models');
const userController = {
    //Get Users

    getEveryUser( req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({ params }, res ) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select:'-__v'
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: ' Sorry, no user found by this ID!!!, Try again'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //Building user

    createUser({ body }, res ) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
//Update User by ID
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators:true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: ' Sorry, no user found with this ID!!!, Try again'});
            return;
        }
        res.json(dbUserData);

    })
    .catch(err => res.json(err));
},

//Erasing delete User

eraseUser({ params } , res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

//Erasing users and users thoughts

  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ userId: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'Sorry, User found with this id!!!, Try again' });
              return;
            }
            res.json(dbUserData);
          });
      })
      .catch(err => res.json(err));
  },

 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userController
