import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao_servico.controller.js"
import { get } from "node:http"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, authrize([Role.ADMIN]), PrestacaoServicoController.create)

router.use(AuthMiddleware)

router.get(PrestacaoServicoRoute.getAll, authrize([Role.ADMIN]), PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, authrize([Role.ADMIN]), PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, authrize([Role.ADMIN]), PrestacaoServicoController.getAllPrestacaoservicoDetalhada)

export { router }