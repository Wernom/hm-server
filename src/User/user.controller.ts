import { Response, NextFunction } from "express"
import UserService from "./user.service"
class UserController {

  async getUser(req: any, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findUser()

      return res.status(200).json({
        success: true,
        data: user,
      })

    } catch (e: any) {
      next(e.message)
    }
  }
}

export default new UserController()
