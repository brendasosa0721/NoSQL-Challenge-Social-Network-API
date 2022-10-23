//Building the API connection for Users

const router = require('express').Router();

const {
    getEveryUser,
    getUserById,
    createUser,
    updateUser,
    eraseUser,
    deleteUser,
    addFriend,
    eraseFriend
} = require('../../controllers/user-controller');

router
.route('/')
.get(getEveryUser)
.post(createUser);


router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(eraseUser)


router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(eraseFriend);

//Exporting

module.exports = router;