const { Schema, model } = require('mongoose');
const Reactions = require('./Reaction');
const { formatDate, formatTime } = require('../utils/dateFormat');
const thoughtSchema = new Schema(
    {thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            return `${formatDate(date)} ${formatTime(date)}`;
        },
    },
    username: { 
        type: String,
        required: true,
    },
    reactions: [Reactions],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});


const Thoughts = model('thought', thoughtSchema)

module.exports = Thoughts;
