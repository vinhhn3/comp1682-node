// repositories/userRepository.js
const User = require("../models/user");

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = new UserRepository();
