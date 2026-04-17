import type { Request, Response } from "express"
import type { CategoriaDBType, responseType, ResponseType } from "../utils/types.js"
import { CategoriaModel } from "../models/categoria.models.js"



export const CategoriaController = {
    async create(req: Request, res: Response) {
        const categoria: CategoriaDBType = req.body

        if (!categoria) {
            return res.status(400).json({
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            })
        }

        const createCategoriaResponse: CategoriaDBType | null = await CategoriaModel.create(categoria)

        if (!createCategoriaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao criar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
        return res.status(201).json({
            status: "success",
            message: "Categoria criada com sucesso",
            data: createCategoriaResponse
        })
    },
    async getAll(req: Request, res: Response) {
        const getAllCategoriasResponse: CategoriaDBType[] | null = await CategoriaModel.getAll()
        if (!getAllCategoriasResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao buscar categorias",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: responseType<CategoriaDBType[]> = {
            status: "success",
            message: "Categorias buscadas com sucesso",
            data: getAllCategoriasResponse
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
        const getCategoriaByIdResponse: CategoriaDBType | null = await CategoriaModel.get(id as string)
        if (!getCategoriaByIdResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Categoria nao encontrada",
                data: null
            }
            return res.status(404).json(response)
        }
        const response: responseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria buscada com sucesso",
            data: getCategoriaByIdResponse
        }
        return res.status(200).json(response)
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const categoria: CategoriaDBType = req.body

        if (!id) {
            const response: responseType<null> = {
                status: "error",
                message: "ID obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }
        if (!categoria) {
            const response: responseType<null> = {
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updateCategoriaResponse: CategoriaDBType | null = await CategoriaModel.update(id as string, categoria)
        if (!updateCategoriaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: responseType<CategoriaDBType> = {
            status: "success",
            message: "Categoria atualizada com sucesso",
            data: updateCategoriaResponse
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
        const deleteCategoriaResponse: CategoriaDBType | null = await CategoriaModel.delete(id as string)
        if (!deleteCategoriaResponse) {
            const response: responseType<null> = {
                status: "error",
                message: "Erro ao deletar categoria",
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