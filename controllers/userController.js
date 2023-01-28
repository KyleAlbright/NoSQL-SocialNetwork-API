const { User, Thought } = require("../models");

const userController = {
  // to get all the users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // to get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // to create new users
  createNewUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },

  // to update an existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  //to delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : //  ----------this is for the [!!!BONUS!!!] ------------------------
            Thought.deleteMany({
              _id: {
                $in: user.thoughts,
              },
            })
      )
      .then(() => res.json({ message: "User Deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  // to add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      {
        __id: req.params.id,
      },
      {
        $addToSet: {
          friends: req.params.friendsId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // to remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          friends: req.params.friendsId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
