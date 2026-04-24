import { PrestacaoServicoModel } from "../../models/prestacao.servico.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { PropostaModel } from "../../models/proposta.models.js";
import type {  PrestacaoServicoDBType } from "../../utils/types.js";

export const prestacaoServicoResolver={
    Query:{
        getAllPrestacaoServicos: async ()=>{
            return await PrestacaoServicoModel.getAll()
        },
        getPrestacaoServicoById: async (_: any, args:{id: string})=>{
            return await PrestacaoServicoModel.get(args.id)
        }
    },

    Mutation:{
        createPrestacaoServico: async(_:any, args:{ prestacao_servico: PrestacaoServicoDBType})=>{
            return await PrestacaoServicoModel.create(args.prestacao_servico);
        },
        updatePrestacaoServico: async(_:any, args:{ id: string, prestacao_servico: PrestacaoServicoDBType})=>{
            return await PrestacaoServicoModel.update(args.id, args.prestacao_servico)
        },
        deletePrestacaoServico: async(_:any, args:{ id: string})=>{
            return await PrestacaoServicoModel.delete(args.id)
        },

    },

    PrestacaoServico: {
        prestador: async (parent:{idPrestador: string})=>{
            return await PrestadorModel.get(parent.idPrestador)
        },

        propostas: async (parent:{id: string})=>{
            return await PropostaModel.getAll()
        }
    }
}