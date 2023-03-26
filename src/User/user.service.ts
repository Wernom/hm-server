import User from "../User/user.model";

class UserService {
  async findUser() {
    return User.findOne({}).exec();
  }
}

export default new UserService();
