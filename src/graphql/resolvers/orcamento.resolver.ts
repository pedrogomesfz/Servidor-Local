import { OrcamentoModel } from "../../models/orcamento.models.js";
import { PrestacaoServicoModel } from "../../models/prestacao.servico.js";
import { PrestadorModel } from "../../models/prestador.models.js";
import { UserModel } from "../../models/user.models.js";
import type { OrcamentoDBType } from "../../utils/types.js";

export const orcamentoResolver = {
    Query: {
        getAllOrcamentos: async () => {
            return await OrcamentoModel.getAll()
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.get(args.id)
        }
    },

    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: OrcamentoDBType }) => {
            return await OrcamentoModel.update(args.id, args.orcamento)
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await OrcamentoModel.delete(args.id)
        }
    },

    Orcamento: {
        prestador: async (parent:{prestadorId: string})=>{
            return await PrestadorModel.get(parent.prestadorId)
        },
        
        prestacaoServico: async (parent:{idPrestacaoServico: string})=>{
            return await PrestacaoServicoModel
                .get(parent.idPrestacaoServico)
        }
    }
}