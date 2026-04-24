import { create } from "node:domain";
import { UserModel } from "../../models/user.models.js";
import { createUser, getUsersById, updateUser } from "../../users.js";
import type { UserDBType, UserType } from "../../utils/types.js";
import { EmpresaModel } from "../../models/empresa.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";

export const userResolver={
    Query:{
        getAllUsers: async ()=>{
            return await UserModel.getAll()
        },
        
        getUsersById: async (_: any, args:{id: string})=>{
            return await UserModel.get(args.id)
        }
    },

    Mutation:{
        createUser: async(_:any, args:{ user: UserDBType})=>{
            return await UserModel.create(args.user);
        },
        updateUser: async(_:any, args:{ id: string, user: UserDBType})=>{
            return await UserModel.update(args.id, args.user)
        },
        deleteUser: async(_:any, args:{ id: string})=>{
            return await UserModel.delete(args.id)
        }
    },

    User: {
        empresa: async (parent:{id: string})=>{
            return await EmpresaModel.get(parent.id)
        }
    }
}