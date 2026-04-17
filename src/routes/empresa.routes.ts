import { Router } from "express"
import { EmpresaController} from "../controllers/empresa.controller.js"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { CategoriaController } from "../controllers/categoria.controller.js"



const EmpresaRoute = {
    create: "/create",
    getById: "/get-por-id/:id",
    getTodos: "/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.post(EmpresaRoute.create, authrize([Role.ADMIN]), EmpresaController.create)

router.get(EmpresaRoute.getById, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.get)
router.get(EmpresaRoute.getTodos, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.getAll)
router.put(EmpresaRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.update)
router.delete(EmpresaRoute.delete, authrize([Role.ADMIN]), EmpresaController.delete)

export { router }