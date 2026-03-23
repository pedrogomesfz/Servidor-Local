import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"



const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(ServiceRoute.create, ServiceController.CreateServico)
router.get(ServiceRoute.getById, ServiceController.getAll)
router.get(ServiceRoute.getAll, ServiceController.getAll)
router.put(ServiceRoute.update, ServiceController.update)
router.delete(ServiceRoute.delete, ServiceController.delete)


export { router }