import { Application } from "express";
import { RouteConfig } from "../Common/common.route.config";
import AuthController from "./auth.controller";
export class AuthRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    this.app.route("/login").post(AuthController.login);

    return this.app;
  }
}
