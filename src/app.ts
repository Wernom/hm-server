import express, { Express, Application, Request, Response } from "express"
import * as http from "http"
import cors from "cors"
import debug, { IDebugger } from "debug"
import dotenv from "dotenv"
dotenv.config({})
import { RouteConfig } from "./Common/common.route.config"
import { UserRoutes } from "./User/user.route.config"
import { AuthRoutes } from "./Auth/auth.route.config"
const app: Express = express()
const routes: Array<RouteConfig> = []

import { IUser } from "./User/user.interface"
import { Console } from "console"
import { RoomRoutes } from "./Room/room.route.config"

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000
const debugLog: IDebugger = debug("app")

routes.push(new UserRoutes(app))
routes.push(new AuthRoutes(app))
routes.push(new RoomRoutes(app))

const server: http.Server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
  // debugLog(`Server is running on ${PORT}`)

  routes.forEach((route: RouteConfig) => {
    debugLog(`Routes configured for ${route.getName()}`)
  })
})
