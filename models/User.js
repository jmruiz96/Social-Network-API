const { Schema, model } = require('mongoose');
//username
//email
//thoughts
//friends
//virtual -- friend counts
const userSchema = new Schema (
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: { 
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true },
        thoughts: [
            {type: Schema.Types.ObjectId,
            ref: 'thought'}
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)

// userSchema
//   .virtual('friendcount')
//   // Getter
//   .get(function () {
//     return this.friends;
//   })
//   // Setter to set the first and last name
//   .set(function (fc) {
//     const 
//     this.set({ });
//   });
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});
const User = model('user', userSchema);

module.exports = User;