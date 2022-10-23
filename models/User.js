//Dependecies

const { Schema, model } = require('mongoose');
const moment = require ('moment');


//Creating the User collection
const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},

{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function () { // this function is retrieving the length of the users(friends) array field on query
    return this.friends.length;
});

// Building the User model with UserSchema

const User = model ('User', UserSchema);

//Exporting

module.exports = User;

