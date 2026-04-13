import type { PropostaDBType, responseType } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.models.js"
import { response, type Request, type Response } from "express"

export const PropostaController = {
    async create(req: Request, res: Response) {
        const newProposta: PropostaDBType = req.body

        if (!newProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados de proposta invalidos",
                data: null
            })
        }

        const createPropostaResponse : PropostaDBType | null = await PropostaModel.create(newProposta)

        if (createPropostaResponse) {
            const response : responseType<null>={
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            }
            return res.status(500).json(response)
        }
        const response : responseType<PropostaDBType> = {
            status: "success",
            message: "proposta criada com sucesso",
            data: createPropostaResponse
        }
        return res.status(200).json(response)
    },

    async getAll(req: Request, res: Response) {
        const getAllPropostaControllerResponse = await PropostaModel.getAll()
        if (!getAllPropostaControllerResponse) {
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

        const getPropostaControllerResponse = await PropostaModel.get(id as string)
        if (!getPropostaControllerResponse) {
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

        const updatedPropostaController: PropostaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedPropostaController) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta invalidos",
                data: null
            })
        }

        const updatedPropostaControllerResponse = await PropostaModel.update(id as string, updatedPropostaController)

        if (!updatedPropostaControllerResponse) {
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

        const deletePropostaControllerResponse = await PropostaModel.delete(id as string)
        if (!deletePropostaControllerResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar proposta",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Proposta apagada com success",
            data: deletePropostaControllerResponse
        })
    },

    async AceitarProposta(req: Request, res: Response) {
        const { id } = req.params

        const RespostaController =  req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!RespostaController) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta invalidos",
                data: null
            })
        }

        const RespostaControllerResponse = await PropostaModel.PropostaAceita(id as string, RespostaController)

        if (!RespostaControllerResponse) {
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
}
