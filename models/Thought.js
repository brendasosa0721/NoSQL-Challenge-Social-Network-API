//Dependencies
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Creating the collection for the thought(comment) sessions

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        mxaxlength:280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') //This moment js to create time and date for the comments created
    }
},

    {
        toJSON: {
            virtuals: true,
            getters:true
        },

        id:false
    }

);

const ThoughtSchema = new Schema ({
    thougthText: {
        type: String,
        required:true,
        minlength: 1,
        mxaxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: true
    },
    reactions:[ReactionSchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// /Building the thought model with ThoughtSchema
const Thought = model ('Thought', ThoughtSchema);

//Exporting

module.exports = Thought;