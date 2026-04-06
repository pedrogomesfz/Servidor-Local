import { Router } from "express"
import { OrcamentoController} from "../controllers/orcamento.controller.js"
import { OrcamentoModel } from "../models/orcamento.models.js"



const OrcamentoRoute = {
    create: "/create",
    getById: "/get-por-id/:id",
    getTodos: "/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(OrcamentoRoute.create, OrcamentoController.create)
router.get(OrcamentoRoute.getById, OrcamentoController.getById)
router.get(OrcamentoRoute.getTodos, OrcamentoController.getAll)
router.put(OrcamentoRoute.update, OrcamentoController.update)
router.delete(OrcamentoRoute.delete, OrcamentoController.delete)
router.put("/:id/calcular-valor-total", OrcamentoController.calcularValorTotal)

export { router }
