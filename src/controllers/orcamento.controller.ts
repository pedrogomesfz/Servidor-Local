import type { Request, Response } from "express"
import type { OrcamentoDBType, PropostaDBType } from "../utils/types.js"
import { EstadoProposta } from "../utils/types.js"
import {  OrcamentoModel } from "../models/orcamento.models.js"
import type { create } from "node:domain"
import { PropostaModel } from "../models/proposta.models.js"
import { PrestacaoServicoModel, PrestacaoServicoModel } from "../models/prestacao.servico.js"
import { PrestacaoServicoController } from "./prestacao_servico.controller.js"
import { PrestadorModel } from "../models/prestador.models.js"
import { json } from "node:stream/consumers"

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

    async calculeBudget(req: Request , res: Response){
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                status: " error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const PrestacaoServico = await PrestacaoServicoModel.getByIdOrcamento(id as string)

        if (!PrestacaoServico) {
            return res.status(404).json({
                status: "error",
                message: "Prestação de serviço não encontrada",
                data: null
            })
        }


        const proposals = await PropostaModel.getByPrestacaoServico(PrestacaoServico.id)

        if (!proposals){
            return res.status(404).json({
                status: "error",
                message: " Proposta nao encontrado",
                data: null
            })
        }

        //find accept proposal

        const acceptedProposal: PropostaDBType | undefined = proposals.find((proposal) => proposal.estado === EstadoProposta.ACEITE)

        if (!acceptedProposal) {
            return res.status(404).json({
                status: " error",
                message: " Ainda nenhuma proposta foi aceita",
                data: null
            })
        }

        const precoHora = acceptedProposal.preco_hora
        const horasEstimadas = acceptedProposal.horas_estimadas

        // fect prestador to get tax minimum discount and discount percentage based on attrs in utils/types
        const prestador = await PrestadorModel.get(acceptedProposal.idPrestador)

        if (!prestador) {
            return res.status(404).json({
                status: " error",
                message:"Prestador nao encontrado",
                data: null 
            })
        }

        const urgencyTax = prestador.taxaUrgencia
        const minimunDiscount = prestador.minimoDesconto
        const discountPercentage = prestador.percentagemDesconto

        let subtotal = precoHora * horasEstimadas

        if (subtotal > minimunDiscount){
            subtotal = subtotal * (1 - discountPercentage)
        }

        if (PrestacaoServicoModel.urgente) {
            subtotal = subtotal * (1 + urgencyTax)
        }

        const updateOrcamentoResponse = await OrcamentoModel.updateBudget(id as string, subtotal)

        if (!updateOrcamentoResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao calcular orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucesso",
            message: "Orcamento calculado e atualizado com sucesso",
            data: updateOrcamentoResponse
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
    },
    
    

}
