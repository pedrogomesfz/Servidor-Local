import { gql } from "graphql-tag"



export const typeDefs = gql`

    enum Role {
        CLIENTE,
        ADMIN,
        PRESTADOR,
        EMPRESA 
    }

    enum TipoPrestador {
        Autonomo,
        Empresa
    }
    

    enum EstadoProposta {
        PENDENTE,
        ACEITE,
        REJEITADO
    }

    enum EstadoOrcamento {
        PENDENTE,
        ACEITE,
        REJEITADO
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
        createdAt: String
        updatedAt: String
    }


    type Proposta {
        id: ID!,
        idPrestadorServico: PrestacaoServico,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: Prestador,
        owner: String,
        enabled: Boolean!,
        createdAt: String,
        updatedAt: String
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
        createdAt: String,
        updatedAt: String
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
        createdAt: String,
        updatedAt: String
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
        createdAt: String,
        updatedAt: String
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
        createdAt: String,
        updatedAt: String
    }

    type Categoria{
        id:ID!,
        icone:String!,
        createdAt: String,
        designacao:String!,
        updatedAt: String
    }

    type Servico{
        id:ID!,
        nome:String!,
        descricao:String!,
        categoria:String!,
        enabled:Boolean!,
        createdAt: String,
        updatedAt: String
    }

    type Query{
        getAllUsers: [Utilizador]
        getUsersById(id: ID!): Utilizador
        getAllServices: [Servico]
        getServiceById(id: ID!): Servico
    }

    type Mutation {
        createUser(nome: String!,
         "numero_identificacao": String!,
          data_nascimento: String!,
           email: String!,
            telemovel: String!,
             pais: String!, 
             localidade: String!, 
             password: String!,
              role: Role!, 
              estado: String!, 
              enabled: Boolean!) : Utilizador

        updateUser(id: ID!,
         nome: String!,
         numero_identificacao: String!,
         data_nascimento: String!,
         email: String!,
         telemovel: String!,
         pais: String!,
         localidade: String!,
         password: String!,
         role: Role!,
         estado: String!,
         enabled: Boolean!) : Utilizador

        deleteUser(id: ID!) : Utilizador

        createService(nome: String!,
         descricao: String!,
         categoria: String!,
         enabled: Boolean!) : Servico

        updateService(id: ID!,
         nome: String!,
         descricao: String!,
         categoria: String!,
         enabled: Boolean!) : Servico

        deleteService(id: ID!) : Servico

    

    }

`
