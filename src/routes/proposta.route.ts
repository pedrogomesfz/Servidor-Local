import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";
import AuthMiddleware, { authrize, isOwner } from "../security/auth.middleware.js";
import { Role } from "../utils/types.js";
import { PropostaModel } from "../models/proposta.models.js";



const PropostaRoute = {
    create:"/create",
    get:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    accept:"/accept/:id"
}

const router = Router()

router.post(PropostaRoute.create, authrize([Role.ADMIN]), PropostaController.create)
router.use(AuthMiddleware)

router.get(PropostaRoute.getAll, authrize([Role.ADMIN]), PropostaController.getAll)
router.get(PropostaRoute.get, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.get)
router.put(PropostaRoute.update, authrize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), isOwner(PropostaModel, "owner"), PropostaController.update)
router.delete(PropostaRoute.delete, authrize([Role.ADMIN]), PropostaController.delete)


export { router }