import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"
import AuthMiddleware, { authrize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllDetailed: "/all-detailed"
}


const router = Router()

router.post(ServiceRoute.create, authrize([Role.ADMIN]) ,ServiceController.CreateServico)

router.use(AuthMiddleware)

router.get(ServiceRoute.getAll,authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.getAll)
router.get(ServiceRoute.getById,authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.getAll)
router.put(ServiceRoute.update,authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.update)
router.delete(ServiceRoute.delete,authrize([Role.ADMIN]), ServiceController.delete)
router.get(ServiceRoute.getAllDetailed,authrize([Role.ADMIN]), ServiceController.getAllServicoDetalhado)

export { router }