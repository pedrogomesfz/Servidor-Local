import { Router } from "express"
import { OrcamentoController} from "../controllers/orcamento.controller.js"
import { OrcamentoModel } from "../models/orcamento.models.js"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"



const OrcamentoRoute = {
    create: "/create",
    getById: "/get-por-id/:id",
    getTodos: "/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()

router.use(AuthMiddleware)

router.post(OrcamentoRoute.create, authrize([Role.ADMIN]), OrcamentoController.create)

router.get(OrcamentoRoute.getById, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.getById)
router.get(OrcamentoRoute.getTodos, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.getAll)
router.put(OrcamentoRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.update)
router.delete(OrcamentoRoute.delete, authrize([Role.ADMIN]), OrcamentoController.delete)
router.put("/:id/calcular-valor-total", authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.calcularValorTotal)

export { router }
