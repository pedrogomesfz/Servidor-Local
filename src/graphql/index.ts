import { typeDefs } from './typedefs/typedefs.js';
import { userResolver } from './resolvers/users.resolvers.js';
import { servicoResolver } from './resolvers/servico.resolver.js';
import { propostaResolver } from './resolvers/proposta.resolver.js';
import { prestadorResolver } from './resolvers/prestador.resolver.js';
import { empresaResolver } from './resolvers/empresa.resolver.js';
import { prestacaoServicoResolver } from './resolvers/pestacao_servico.resolver.js';
import { categoriaResolver } from './resolvers/categoria.resolver.js';
import { orcamentoResolver } from './resolvers/orcamento.resolver.js';


export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...servicoResolver.Query,
        ...propostaResolver.Query,
        ...prestadorResolver.Query,
        ...empresaResolver.Query,
        ...prestacaoServicoResolver.Query,
        ...categoriaResolver.Query,
        ...orcamentoResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation,
        ...categoriaResolver.Mutation,
        ...prestacaoServicoResolver.Mutation,
        ...propostaResolver.Mutation,
        ...prestadorResolver.Mutation,
        ...empresaResolver.Mutation,
        ...orcamentoResolver.Mutation,
        ...servicoResolver.Mutation
    }

    
}

export { typeDefs }


