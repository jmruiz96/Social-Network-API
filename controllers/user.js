const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        //.populate('thoughts')
          .then((users) => res.json(users))
          .catch((err) => {
            console.log(err)
            res.status(500).json(err)});
      },
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          //.populate('thoughts')
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
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : thought.findOneAndUpdate(
                  { users: req.params.userId },
                  { $pull: { user: req.params.userId } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'user deleted, but no thought found',
                })
              : res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    };