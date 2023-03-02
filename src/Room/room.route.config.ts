import { RouteConfig } from "../Common/common.route.config"
import { Application } from "express"
import JWT from "../Common/middlewares/JWT"
import RoomController from "./room.controller"

export class RoomRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "RoomRoutes")
  }

  configureRoutes() {
    this.app.route(`/room/all`).get([JWT.authenticateJWT, RoomController.getAllRoom])
    this.app.route(`/room`).post([JWT.authenticateJWT, RoomController.createRoom])

    return this.app
  }
}
