import type { Request, Response } from "express"
import type { EmpresaDBtype, responseType, ResponseType } from "../utils/types.js"
import { EmpresaModel } from "../models/empresa.models.js"



export const EmpresaController = {
    async create(req: Request, res: Response) {
        const empresa: EmpresaDBtype = req.body

        if (!empresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            })
        }

        const createEmpresaResponse: EmpresaDBtype | null = await EmpresaModel.create(empresa)

        if (!createEmpresaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
        return res.status(201).json({
            status: "success",
            message: "Empresa criada com sucesso",
            data: createEmpresaResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllEmpresasResponse: EmpresaDBtype[] | null = await EmpresaModel.getAll()
        if (!getAllEmpresasResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao buscar empresas",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: responseType<EmpresaDBtype[]> = {
            status: "success",
            message: "Empresas buscadas com sucesso",
            data: getAllEmpresasResponse
        }
        return res.status(200).json(response)
    },
    async get(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            const response: responseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const getEmpresaByIdResponse: EmpresaDBtype | null = await EmpresaModel.get(id as string)
        if (!getEmpresaByIdResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Empresa nao encontrada",
                data: null
            }
            return res.status(404).json(response)
        }
        const response: responseType<EmpresaDBtype> = {
            status: "success",
            message: "Empresa buscada com sucesso",
            data: getEmpresaByIdResponse
        }
        return res.status(200).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const empresa: EmpresaDBtype = req.body

        if (!id) {
            const response: responseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        if (!empresa) {
            const response: responseType<null> = {
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updateEmpresaResponse: EmpresaDBtype | null = await EmpresaModel.update(id as string, empresa)
        if (!updateEmpresaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: responseType<EmpresaDBtype> = {
            status: "success",
            message: "Empresa atualizada com sucesso",
            data: updateEmpresaResponse
        }
        return res.status(200).json(response)
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) {
            const response: responseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        const deleteEmpresaResponse: EmpresaDBtype | null = await EmpresaModel.delete(id as string)
        if (!deleteEmpresaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao deletar empresa",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: responseType<null> = {
            status: "success",
            message: "Categoria deletada com sucesso",
            data: null
        }
        return res.status(200).json(response)
    }
}