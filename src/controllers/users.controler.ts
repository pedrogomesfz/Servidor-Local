// import { assServicoToDB } from "../models/servico.modedel.js"
import type { get } from "node:http"
import { UserModel } from "../models/user.models.js"
import type { ServiceDBType, UserDBType, UserType } from "../utils/types.js"
import type { Request, Response } from "express"
import { getUsersById, updateUser } from "../users.js"
import db from "../lib/db.js"
import { comparePassword } from "../utils/password.js"
import  jwt  from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const UserController = {
    async create(req: Request, res: Response) {
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

    async login(req: Request, res: Response){
        const {email, password } = req.body

        if (!email || !password ){
            return res.status(400).json({
                status: "error",
                message: "Credeniais invalidos",
                data: null
            })
        }

        const userData = await UserModel.getByEmail(email as string)
        if(!userData){
            return res.status(400).json({
                status: "error",
                message: "Não existe nenhuma conta com esse email",
                data: null
            })
        }

        const isPasswordValid = await comparePassword(password, userData.password)
        if (!isPasswordValid){
            return res.status(401).json({
                status:"error",
                message:"Credenciais invalidos",
                data: null
            })
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome
        }
        console.log("JWT_SECRET", process.env.JWT_SECRET)
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})

        return res.status(200).json({
            status: "success",
            message: "Login realizado com sucesso",
            data: {
                token,
                user: payload
            }
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
    },


    //funcao para atualizar password
    async updatePassword(req: Request, res: Response) {
        const { id } = req.params
        const { password } = req.body

        if (!id || !password) {
            return res.status(400).json({
                status: "error",
                message: "Dados de password invalidos",
                data: null
            })
        }

        const updatedUserResponse = await UserModel.updatePassword(id as string, password as string)
        if (!updatedUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Password atualizada com sucesso",
            data: null
        })
    },

    async resetPassword(req: Request, res: Response) {
        const { id } = req.params
        const { password } = req.body

        if (!id || !password) {
            return res.status(400).json({
                status: "error",
                message: "Dados de password invalidos",
                data: null
            })
        }

        const updatedUserResponse = await UserModel.resetPassword(id as string, password as string)
        if (!updatedUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar password",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Password atualizada com sucesso",
            data: null
        }),

        console.log("Password resetada com sucesso")

    },

    




    

}

export { UserModel }
