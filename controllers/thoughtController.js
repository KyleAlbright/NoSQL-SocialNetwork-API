const { Thought, User } = require("../models");

const thoughtController = {
  // to get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // to get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // to create a new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThought._id } },
          { new: true }
        );
      })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  //to update a thought
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
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
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "Thought not found." })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // to delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "Thought not found." });
        }

        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { reactions: req.body } },
          { new: true }
        );
      })
      .then(() => res.json({ message: "Thought deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  
};
