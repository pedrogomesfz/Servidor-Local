import { response, type Request, type Response } from "express"
import type { PrestacaoServicoDBType, responseType } from "../utils/types.js"
import { PrestacaoServicoModel } from "../models/prestacao.servico.js"
import { PrestadorModel } from '../models/prestador.models.js';

export const PrestacaoServicoController = {
    async create(req: Request, res: Response) {
        const prestacaoServico: PrestacaoServicoDBType = req.body

        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const createPrestacaoServicoResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.create(prestacaoServico)

        if (!createPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar prestacao de servico",
                data: null
            })
        }
        const response: responseType<PrestacaoServicoDBType> = {
            status: "success",
            message: "Prestacao de servico criada com sucesso",
            data:createPrestacaoServicoResponse
        }
        return res.status(201).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllPrestacaoServicosResponse: PrestacaoServicoDBType[] | null = await PrestacaoServicoModel.getAll()

        if (!getAllPrestacaoServicosResponse) {
            const response: responseType<null>={
                status: "error",
                message: "Erro ao buscar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: responseType<PrestacaoServicoDBType[]>={
            status: "success",
            message: "Prestacao de servico buscada com sucesso",
            data: getAllPrestacaoServicosResponse
        }
        return res.status(200).json(response)
    },

    async get(req: Request, res: Response) : Promise<Response> {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getPrestacaoServicoByIdResponse: PrestacaoServicoDBType | null = await PrestacaoServicoModel.get(id as string)

        if (!getPrestacaoServicoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Prestacao de servico nao encontrada",
                data: getPrestacaoServicoByIdResponse
            })
        }

        return res.status(200).json(response)
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedPrestacaoServico: PrestacaoServicoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPrestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "Dados de prestacao de servico invalidos",
                data: null
            })
        }

        const updatePrestacaoServicoResponse = await PrestacaoServicoModel.update(id as string, updatedPrestacaoServico)

        if (!updatePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar prestacao de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        
        const deletePrestacaoServicoResponse : PrestacaoServicoDBType | null = await PrestacaoServicoModel.delete(id as string)

        if (!deletePrestacaoServicoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar prestacao de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Prestacao de servico apagada com sucesso",
            data: deletePrestacaoServicoResponse
        })
    },


    async getAllPrestacaoservicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as {limit: string , offset: string}

        let LIMIT = 10 
        let OFFSET = 10 

        if ( limit && parseInt(limit) < 0) LIMIT = parseInt(limit)
        if ( offset && parseInt(offset) < 0) OFFSET = parseInt(offset)
        
        const  getAllPrestacaoServicoResponse = await PrestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacaoServicoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestador de servico ",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Prestaçoes de servico buscadas com sucesso",
            data: getAllPrestacaoServicoResponse
        })
    }

    
}