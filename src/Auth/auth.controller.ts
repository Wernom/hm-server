import { NextFunction, Request, Response } from "express"
import AuthService from "./auth.service"
import jwt from "jsonwebtoken"
import debug, { IDebugger } from "debug"
import { Password } from "../Common/services/password"
const jwtSecret: string = process.env.JWT_SECRET || "123456"
const tokenExpirationInSeconds = 36000

const log: IDebugger = debug("auth:controller")

class AuthController {

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email
      const password = req.body.password

      const user = await AuthService.findUserByEmail(email)
      if (user) {
        const isPasswordMatch = await Password.compare(user.password, password)

        if (!isPasswordMatch) {
          throw new Error("Wrong longin")
        } else {
          log("jwt Secret", jwtSecret)
          const token = jwt.sign(req.body, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          })

          return res.status(200).json({
            success: true,
            data: user,
            token,
          })
        }
      } else {
        throw new Error("Wrong longin")
      }
    } catch (e: any) {
      next(e.message)
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const username = req.body.username
      const email = req.body.email
      const password = req.body.password

      const user = await AuthService.findUserByEmail(email)
      log("user", user)
      if (user) {
        throw new Error("User Already Exists")
      } else {
        try {
          const newUser = await AuthService.createUser({
            username,
            email,
            password,
          })

          const token = jwt.sign({ username, password }, jwtSecret, {
            expiresIn: tokenExpirationInSeconds,
          })

          return res.status(200).json({
            success: true,
            data: newUser,
            token,
          })
        } catch (e) {
          log("Controller capturing error", e)
          throw new Error("Error while signing up")
        }
      }
    } catch (e: any) {
      next(e.message)
    }
  }
}

export default new AuthController()
