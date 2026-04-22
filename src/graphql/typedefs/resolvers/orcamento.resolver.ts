import { create } from "node:domain";
import { OrcamentoModel } from "../../../models/orcamento.models.js";
import type { OrcamentoDBType, UserDBType, UserType } from "../../../utils/types.js";

export const orcamentoResolver={
    Query:{
        getAllUsers: async ()=>{
            return await OrcamentoModel.getAll()
        },
        getUsersById: async (_: any, args:{id: string})=>{
            return await OrcamentoModel.get(args.id)
        }
    },

    Mutation:{
        createUser: async(_:any, args:{ orcamento: OrcamentoDBType})=>{
            return await OrcamentoModel.create(args.orcamento);
        },
        updateUser: async(_:any, args:{ id: string, orcamento: OrcamentoDBType})=>{
            return await OrcamentoModel.update(args.id, args.orcamento)
        },
        deleteUser: async(_:any, args:{ id: string})=>{
            return await OrcamentoModel.delete(args.id)
        }
    }
}