// import { assServicoToDB } from "../models/servico.modedel.js"
import type { get } from "node:http"
import { UserModel } from "../models/user.models.js"
import type { ServiceDBType, UserDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { updateUser } from "../users.js"


export const UserController = {
    async CreateUser(req: Request, res: Response) {
        const newUser: UserDBType = req.body

        if (!newUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servico invalidos",
                data: null
            })
        }

        const createUserResponse = await UserModel.create(newUser)
        if (createUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao criar utilizador",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Utilizador criado com success",
            data: null
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllUserServiceResponse = await UserModel.getAll()
        if (!getAllUserServiceResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Utilizador buscando com sucesso",
            data: null
        })
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

        const getUserResponse = await UserModel.get(id as string)
        if (!getUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Servico nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Servico encontrado com sucesso",
            data: null
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedUser: UserDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedUser) {
            return res.status(400).json({
                status: "error",
                message: "Dados de servicos invalidos",
                data: null
            })
        }

        const updatedUserResponse = await UserModel.update(id as string, updatedUser)

        if (!updatedUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Error ao atualizar utilizador",
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
        
            const deleteUserResponse = await UserModel.delete(id as string)
            if(!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null
            })
        }
        
            return res.status(200).json({
            status: "success",
            message: "Utilizador apagado com success",
            data: deleteUserResponse
        })
    }
}