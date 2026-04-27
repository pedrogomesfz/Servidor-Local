import { ServiceModel } from "../../models/servico.modles.js";
import type { ServiceDBType } from "../../utils/types.js";
import { CategoriaModel } from "../../models/categoria.models.js";
import { PrestacaoServicoModel } from "../../models/prestacao.servico.js";

export const servicoResolver={
    Query:{
        getAllServico: async ()=>{
            return await ServiceModel.getAll()
        },
        getServicoById: async (_: any, args:{id: string})=>{
            return await ServiceModel.get(args.id)
        }
    },

    Mutation:{
        createServico: async(_:any, args:{ nome:string, descricao:string, categoria:string, enabled:boolean})=>{
            const service: ServiceDBType={
                id: "",
                nome: args.nome,
                descricao: args.descricao,
                categoria:args.categoria,
                enabled: true,
                created_at:"",
                update_at:""
            }
            return await ServiceModel.create(service);
        },
        updateServico: async(_:any, args:{ id: string, categoria: ServiceDBType})=>{
            return await ServiceModel.update(args.id, args.categoria)
        },
        deleteServico: async(_:any, args:{ id: string})=>{
            return await ServiceModel.delete(args.id)
        }
    },

    Servico: {
        categoria: async (parent:{id: string})=>{
            return await CategoriaModel.get(parent.id)
        },

        prestacaoServicos: async (parent:{id: string})=>{
            return await PrestacaoServicoModel
                .get(parent.id)
        }
    }
}