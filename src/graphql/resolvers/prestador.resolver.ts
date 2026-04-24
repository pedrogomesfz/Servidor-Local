import { EmpresaModel } from "../../models/empresa.models.js";
import { PrestacaoServicoModel } from "../../models/prestacao.servico.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType } from "../../utils/types.js";

export const prestadorResolver={
    Query:{
        getAllPrestadores: async ()=>{
            return await PrestadorModel.getAll()
        },
        getPrestadorById: async (_: any, args:{id: string})=>{
            return await PrestadorModel.get(args.id)
        }
    },

    Mutation:{
        createPrestador: async(_:any, args:{ prestador: PrestadorDBType})=>{
            return await PrestadorModel.create(args.prestador);
        },
        updatePrestador: async(_:any, args:{ id: string, prestador: PrestadorDBType})=>{
            return await PrestadorModel.updatePrestador(args.id, args.prestador)
        },
        deletePrestador: async(_:any, args:{ id: string})=>{
            return await PrestadorModel.deletePrestador(args.id)
        }
    },

    Prestador:{
        prestacaoServicos: async (parent:{id: string})=>{
            return await PrestacaoServicoModel
                .get(parent.id)
        },

        empresa: async (parent:{id: string})=>{
            return await EmpresaModel 
                .get(parent.id)
        }
    }
}