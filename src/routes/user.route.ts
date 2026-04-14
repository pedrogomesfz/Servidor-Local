import { Router } from "express";
import { UserController } from "../controllers/users.controler.js";
import AuthMiddleware, { authrize } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";


const UseRoute = {
    create: "/create",
    getAll: "/",
    get: "/:id",
    update: "/:id",
    delete: "/:id",
    restPassword: "/rest-password",
    login: "/login",
    updatePassword: "/update-password",
    resetPassword: "/reset-password/:id"
}


const router = Router()



router.post(UseRoute.create, UserController.login)
router.post(UseRoute.create, UserController.create)

router.use(AuthMiddleware)

router.get(UseRoute.getAll,authrize([Role.ADMIN]), UserController.getAll)

router.get(UseRoute.get,authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR]), UserController.get)

router.put(UseRoute.update,authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR]), UserController.update)

router.delete(UseRoute.delete,authrize([Role.ADMIN]), UserController.delete)

router.put(UseRoute.resetPassword,authrize([Role.ADMIN]), UserController.resetPassword)

router.post(UseRoute.login,authrize([Role.ADMIN]), UserController.login)

export { router }