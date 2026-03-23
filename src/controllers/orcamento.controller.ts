import type { OrcamentoDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { OrcamentoModel } from "../models/orcamento.models.js"

export const OrcamentoController = {
     async CreatePrestador(req: Request, res: Response) {
            const newPrestador: OrcamentoDBType = req.body
    
            if (!newPrestador) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados de prestador invalidos",
                    data: null
                })
            }
    
            const createPrestadorResponse = await OrcamentoModel.create(newPrestador)
            if (createPrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao criar prestador",
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
            const getAllPrestadorResponse = await OrcamentoModel.getAll()
            if (!getAllPrestadorResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar orcamento",
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
    
            const getPrestadorResponse = await OrcamentoModel.get(id as string)
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
    
            const updatedPrestador: OrcamentoDBType = req.body
    
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
                    message: "Dados do orcamento invalidos",
                    data: null
                })
            }
    
            const updatedPrestadorResponse = await OrcamentoModel.update(id as string, updatedPrestador)
    
            if (!updatedPrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Error ao atualizar orcamento",
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
            
                const deletePrestadorResponse = await OrcamentoModel.delete(id as string)
                if(!deletePrestadorResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao apagar orcamento",
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