import type { Request, Response } from "express"
import type { OrcamentoDBType } from "../utils/types.js"
import {  OrcamentoModel } from "../models/orcamento.models.js"
import type { create } from "node:domain"

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const orcamentoDados: OrcamentoDBType = req.body

        if (!orcamentoDados) {
            return res.status(400).json({
                status: "erro",
                mensagem: "Dados de orçamento de serviço inválidos",
                dados: null
            })
        }

        const respostaCriacao = await OrcamentoModel.create(orcamentoDados)

        if (!respostaCriacao) {
            return res.status(500).json({
                status: "erro",
                mensagem: "Erro ao criar orçamento de serviço",
                dados: null
            })
        }

        return res.status(201).json({
            status: "sucesso",
            mensagem: "Orçamento de serviço criado com sucesso",
            dados: respostaCriacao
        })
    },

    async getAll(req: Request, res: Response) {
        const respostaObterTodos = await OrcamentoModel.getAll()

        if (!respostaObterTodos) {
            return res.status(500).json({
                status: "erro",
                mensagem: "Erro ao buscar orçamentos de serviço",
                dados: null
            })
        }

        return res.status(200).json({
            status: "sucesso",
            mensagem: "Orçamentos de serviço buscados com sucesso",
            dados: respostaObterTodos
        })
    },

    async getById(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const getOrcamentoByIdResponse = await OrcamentoModel.getById(id as string)

        if (!getOrcamentoByIdResponse) {
            return res.status(404).json({
                status: "error",
                message: "Orcamento de servico nao encontrada",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento encontrado com sucesso",
            data: getOrcamentoByIdResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedOrcamento: OrcamentoDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedOrcamento) {
            return res.status(400).json({
                status: "error",
                message: "Dados de orcamento de servico invalidos",
                data: null
            })
        }

        const updateOrcamentoResponse = await OrcamentoModel.update(id as string, updatedOrcamento)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar orcamento de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento de servico atualizada com sucesso",
            data: updateOrcamentoResponse
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

        const deleteOrcamentoResponse = await OrcamentoModel.delete(id as string)

        if (!deleteOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar orcamento de servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Orcamento de servico apagada com sucesso",
            data: deleteOrcamentoResponse
        })
    },


    async calcularValorTotal(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        const calcularValorTotalResponse = await OrcamentoModel.OrcamentoModelValorTotal(id as string)

        if (!calcularValorTotalResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular valor total do orcamento de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Valor total do orcamento de servico calculado com sucesso",
            data: calcularValorTotalResponse
        })
    }

}
