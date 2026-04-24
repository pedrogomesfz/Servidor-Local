import { create } from "node:domain";
import { PropostaModel } from "../../models/proposta.models.js";
import type { CategoriaDBType, PropostaDBType, UserDBType, UserType } from "../../utils/types.js";
import { UserModel } from "../../models/user.models.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { PrestacaoServicoModel } from "../../models/prestacao.servico.js";

export const propostaResolver={
    Query:{
        getAllPropostas: async ()=>{
            return await PropostaModel.getAll()
        },
        getPropostaById: async (_: any, args:{id: string})=>{
            return await PropostaModel.get(args.id)
        }
    },

    Mutation:{
        createProposta: async(_:any, args:{ proposta: PropostaDBType})=>{
            return await PropostaModel.create(args.proposta);
        },
        updateProposta: async(_:any, args:{ id: string, proposta: PropostaDBType})=>{
            return await PropostaModel.update(args.id, args.proposta)
        },
        deleteProposta: async(_:any, args:{ id: string})=>{
            return await PropostaModel.delete(args.id)
        }
    },

    Proposta: {
        prestacaoServico: async (parent:{idPrestacaoServico: string})=>{
            return await PrestacaoServicoModel.get(parent.idPrestacaoServico)
        },

        prestador: async (parent:{idPrestador: string})=>{
            return await PrestadorModel.get(parent.idPrestador)
        }
    }
}