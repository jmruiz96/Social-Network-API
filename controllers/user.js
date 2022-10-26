const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .populate('thoughts')
          .then((users) => res.json(users))
          .catch((err) => {
            console.log(err)
            res.status(500).json(err)});
      },
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .then((users) =>
            !users
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(users)
          )
          .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
      updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      },
     deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : Thoughts.findOneAndDelete({ username: user.username })
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'User deleted but no thought found' })
                    : res.status(200).json('User successfully deleted')
            )
            .catch((err) => res.status(500).json(err))
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true }
        )
        .then((user)=>
        !user 
         ? res 
         .status(404)
         .json({message: 'No user found with this ID.'})
         :res.json(user)
         )
         .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId} },
            { new: true }
            )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this ID'})
                : res.status(200).json({ message: 'Friend successfully deleted'})
            )
    }
}