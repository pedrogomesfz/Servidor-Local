import { Router } from "express"
import { CategoriaController} from "../controllers/categoria.controller.js"
import { CategoriaModel } from "../models/categoria.models.js"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"



const CategoriaRoute = {
    create: "/create",
    getById: "/get-por-id/:id",
    getTodos: "/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.post(CategoriaRoute.create, authrize([Role.ADMIN]), CategoriaController.create)

router.get(CategoriaRoute.getById, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.get)
router.get(CategoriaRoute.getTodos, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.getAll)
router.put(CategoriaRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.update)
router.delete(CategoriaRoute.delete, authrize([Role.ADMIN]), CategoriaController.delete)

export { router }
