// import { assServicoToDB } from "../models/servico.modedel.js"
import type { create } from "node:domain"
import { PrestadorModel } from "../models/prestador.models.js"
import type { PrestadorDBType, responseType } from "../utils/types.js"
import { response, type Request, type Response } from "express"


export const PrestadorController = {
    async create(req: Request, res: Response) {
        const newPrestador: PrestadorDBType = req.body

        if (!newPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestador invalidos",
                data: null
            })
        }

        const createPrestadorResponse: PrestadorDBType | null = await PrestadorModel.create(newPrestador)
        if (!createPrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar prestador",
                data: null
            })
        }
        const response: responseType<PrestadorDBType> = {
            status: "success",
            message: "Prestador criado com sucesso",
            data: createPrestadorResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestadorResponse = await PrestadorModel.getAll()
        if (!getAllPrestadorResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestador",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Prestador buscando com sucesso",
            data: null
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do prestador nao fornecido",
                data: null
            })
        }

        const getPrestadorResponse = await PrestadorModel.get(id as string)
        if (!getPrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Prestador nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Prestador encontrado com sucesso",
            data: null
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestador: PrestadorDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestador) {
            return res.status(400).json({
                status: "error",
                message: "Dados do prestador invalidos",
                data: null
            })
        }

        const updatedPrestadorResponse = await PrestadorModel.updatePrestador(id as string, updatedPrestador)

        if (!updatedPrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar prestador",
                data: null
            })
        }


        return res.status(400).json({
            status: "success",
            message: "prestador atualizado com sucesso",
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
        
            const deletePrestadorResponse = await PrestadorModel.deletePrestador(id as string)
            if(!deletePrestadorResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestador",
                data: null
            })
        }
        
            return res.status(200).json({
            status: "success",
            message: "Servico apagado com success",
            data: deletePrestadorResponse
        })
    }
}