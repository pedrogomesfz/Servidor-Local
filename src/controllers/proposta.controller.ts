import type { PropostaDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { PropostaController } from "../models/proposta.models.js"

export const PropostaController = {
    async CreateProposta(req: Request, res: Response) {
        const newProposta: PropostaDBType = req.body

        if (!newProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            })
        }

        const createPropostaResponse = await PropostaController.CreatePropostaController(newProposta)
        if (createPropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Prestador criado com success",
            data: null
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaResponse = await PropostaController.getAll()
        if (!getAllPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Proposta buscando com sucesso",
            data: null
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da proposta nao fornecido",
                data: null
            })
        }

        const getPropostaResponse = await PropostaModel.get(id as string)
        if (!getPropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Proposta nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Proposta encontrada com sucesso",
            data: null
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedProposta: PropostaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta invalidos",
                data: null
            })
        }

        const updatedPropostaResponse = await PropostaModel.update(id as string, updatedProposta)

        if (!updatedPropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar proposta",
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

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deletePropostaResponse = await PropostaModel.delete(id as string)
        if (!deletePropostaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar proposta",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com success",
            data: deletePropostaResponse
        })
    }
}