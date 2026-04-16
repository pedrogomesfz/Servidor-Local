import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"
import { Role } from "../utils/types.js"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestadorRoute.create, authrize([Role.ADMIN]), PrestadorController.create)

router.use(AuthMiddleware)

router.get(PrestadorRoute.getById, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestadorController.get)
router.get(PrestadorRoute.getAll, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestadorController.getAll)
router.put(PrestadorRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestadorController.update)
router.delete(PrestadorRoute.delete, authrize([Role.ADMIN]), PrestadorController.delete)

export { router }