// import { assServicoToDB } from "../models/servico.modedel.js"

import { ServiceModel } from "../models/servico.modles.js"
import type { responseType, ServiceDBType } from "../utils/types.js"
import { response, type Request, type Response } from "express"


export const ServiceController = {
    async CreateServico(req: Request, res: Response) {
        const newService: ServiceDBType = req.body

        if (!newService) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const createServiceResponse : ServiceDBType | null = await ServiceModel.create(newService)
        
        if (!createServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar servico",
                data: null
            })
        }
        const response: responseType<ServiceDBType> = {
            status: "success",
            message: "Servico criado com sucesso",
            data: createServiceResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllServiceResponse : ServiceDBType[] | null = await ServiceModel.getAll()
        if (!getAllServiceResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao buscar servicos",
                data: getAllServiceResponse
            }
            return res.status(500).json(response)
        }
        const response: responseType<ServiceDBType[]> = {
            status: "success",
            message: "Servicos encontrados com sucesso",
            data: getAllServiceResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do servico nao fornecido",
                data: null
            })
        }

        const getServiceResponse : ServiceDBType | null = await ServiceModel.get(id as string)
        if (!getServiceResponse) {
            return res.status(400).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null
            })
        }
        const response: responseType<ServiceDBType> = {
            status: "success",
            message: "Servico encontrado com sucesso",
            data: getServiceResponse
        }
        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedServico: ServiceDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servicos invalidos",
                data: null
            })
        }

        const updatedServicoResponse = await ServiceModel.update(id as string, updatedServico)

        if (!updatedServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar servico",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "servico atualizado com sucesso",
            data: null
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        
            if(!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        
            const deleteServicoResponse = await ServiceModel.delete(id as string)
            if(!deleteServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null
            })
        }
        
            return res.status(200).json({
            status: "success",
            message: "Servico apagado com success",
            data: deleteServicoResponse
        })
    }
}