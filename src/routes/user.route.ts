import { Router } from "express";
import { UserController } from "../controllers/users.controler.js";
import AuthMiddleware from "../security/auth.middleware.js";

const UseRoute = {
    create: "/create",
    getAll: "/",
    get: "/:id",
    update: "/:id",
    delete: "/:id",
    restPassword: "/rest-password",
    login: "/login"
}


const router = Router()

router.post(UseRoute.create, UserController.create)

router.get(UseRoute.getAll, AuthMiddleware, UserController.getAll)

router.get(UseRoute.get, AuthMiddleware, UserController.get)

router.put(UseRoute.update, AuthMiddleware, UserController.update)

router.delete(UseRoute.delete, AuthMiddleware, UserController.delete)

export { router }