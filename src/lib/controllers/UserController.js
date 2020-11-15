const User = require("../model/User");

class UserController {

  static getUsers(req, res) {
    return User.find({})
      .then((users) => {
        return res.json({ users });
      })
      .catch((err) => {
        res.status(500).send({ err });
      })
  }

  static createUser(req, res) {
    const { id, username } = req.body;
    if (!id || typeof id !== 'string') {
      return res.status(422).send({ message: 'id must be provided in a string format!' });
    }
    if (!username || typeof username !== 'string') {
      return res.status(422).send({ message: 'username must be provided in a string format!' });
    }
    const user = req.body;
    return new User(user).save()
      .then((user) => {
        return res.json({ user });
      })
      .catch((err) => {
        return res.status(500).send({ err });
      })
  }

  static updateUser(req, res) {
    const { userId } = req.params;
    const { username } = req.body;
    if (!userId) {
      return res.status(422).send({ message: 'userId must be provided!' });
    }
    if (username && typeof username !== 'string') {
      return res.status(422).send({ message: 'username must be provided in a string format!' });
    }
    delete req.body.id;
    return User.findOneAndUpdate({ id: userId }, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found!' });
        }
        return res.json({ user });
      })
      .catch((err) => {
        return res.status(500).send({ err });
      })
  }

  static deleteUser(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(422).send({ message: 'userId must be provided!' });
    }
    return User.findOneAndDelete({ id: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User not found!' });
        }
        return res.json({ user, message: 'User deleted successfully' });
      })
      .catch((err) => {
        return res.status(500).send({ err });
      })
  }
}

module.exports = UserController;
