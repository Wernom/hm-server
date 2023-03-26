import User from "../User/user.model";
import { IUser } from "../User/user.interface";
class AuthService {
  async createUser(data: IUser) {
    try {
      const user = User.build(data);
      await user.save();
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async findUser() {
    return User.findOne({}).exec();
  }
}

export default new AuthService();
