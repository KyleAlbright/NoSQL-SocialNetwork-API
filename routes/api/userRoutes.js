const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
