import { gql } from "graphql-tag"



export const typeDefs = gql`

    enum Role {
        CLIENTE = "cliente",
        ADMIN = "admin",
        PRESTADOR = "prestador",
        EMPRESA = "empresa"
    }

    type Utilizador {
        id: ID!,
        nome: String!,
        numero_identificacao: String!
        data_nascimento: String!
        email: String!
        telemovel: String!
        pais: String!
        localidade: String!
        password: String!
        role: Role!
        estado: String!
        enabled: Boolean!
        created_at: String
        updated_at: String
    }


    type Proposta {
        id: ID!,
        idPrestadorServico:ID!,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: ID!,
        owner: String,
        enabled: Boolean!,
        created_at: String,
        updated_at: String
    }
    
    type PrestadorServico{
        id:ID!,
        designacao:String!,
        subtorial:String!,
        horas_estimadas:Int!,
        id_prestadores:ID!,
        id_orcamento:ID!,
        id_utilizador: ID!,
        id_servico:ID!,
        id_empresa:ID!,
        tipo_prestador: TipoPrestador,
        preco_hora:Float!,
        urgente:Boolean!,
        enabled:Boolean!,
        created_at:String,
        updated_at:String
    }
    
    type Orcamento{
        id:ID!,
        estado: EstadoOrcamento,
        horas_estimadas: Int!,
        preco_hora: Float!,
        id_prestacao_servico: ID!,
        total:Float!,
        id_utilizador2:ID!,
        enabled:Boolean!,
        created_at:String,
        update_at:String
    }

    type Prestador{
        id:ID!,
        nif:Int!,
        profissao:String!,
        taxa_urgencia:Float!,
        minimo_desconto:Float!,
        percentagem_desconto:Float!,
        disponivel:Int!,
        enabled:Boolean!,
        created_at:String,
        update_at:String
    }

    type Empresa{
        id:ID!,
        designacao:String!,
        descricao:String!,
        nif:String!,
        icone:String!,
        id_utilizador:ID!,
        localizacao:String!,
        enabled:Boolean!,
        created_at:String,
        updated_at:String
    }

    type Categoria{
        id:ID!,
        icone:String!,
        created_at:String,
        designacao:String!,
        updated_at:String
    }

    type Servico{
        id:ID!,
        nome:String!,
        descricao:String!,
        categoria:String!,
        enabled:Boolean!,
        created_at:String,
        update_at:String
    }

    type Query {
        utilizadores: [Utilizador!]
        utilizador(id: ID!): Utilizador
    }

    type Mutation {
        utilizador(id: ID!): Utilizador
    }
`
