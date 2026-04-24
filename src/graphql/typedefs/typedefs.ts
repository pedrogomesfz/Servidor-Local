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
        prestacaoServico: PrestacaoServico,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: Prestador,
        owner: String,
        enabled: Boolean!,
        createdAt: String,
        updatedAt: String
    }
    
    type PrestacaoServico{
        id:ID!,
        designacao:String!,
        subtorial:String!,
        horas_estimadas:Int!,
        id_prestadores:Prestador,
        id_orcamento:Orcamento,
        id_utilizador:Utilizador,
        id_servico:Servico,
        id_empresa:Empresa,
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
        id_prestacao_servico:PrestacaoServico,
        total:Float!,
        id_utilizador2:Utilizador,
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
        id_utilizador:Utilizador,
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

        getAllServico: [Servico]
        getServicoById(id: ID!): Servico

        getAllPrestadores: [Prestador]
        getPrestadorById(id: ID!): Prestador

        getAllEmpresas: [Empresa]
        getEmpresaById(id: ID!): Empresa

        getAllPropostas: [Proposta]
        getPropostaById(id: ID!): Proposta

        getAllPrestacaoServicos: [PrestacaoServico]
        getPrestacaoServicoById(id: ID!): PrestacaoServico

        getAllOrcamentos: [Orcamento]
        getOrcamentoById(id: ID!): Orcamento

        getAllCategorias: [Categoria]
        getCategoriaById(id: ID!): Categoria
    }

    type Mutation {
        createUser(nome: String!,
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

        createServico(nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean!) : Servico

        updateServico(id: ID!,
        nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean!) : Servico

        deleteServico(id: ID!) : Servico

        createCategoria(nome: String!,
        descricao: String!,
        categoria: String!,
        enabled: Boolean!) : Categoria

        updateCategoria(id: ID!,
        icone: String!,
        designacao:String!,
        enabled: Boolean!) : Categoria

        deleteCategoria(id: ID!) : Categoria

        createPrestacaoServico(designacao:String!,
        subtorial:String!,
        horas_estimadas:Int!,
        id_prestadores:Prestador,
        id_orcamento:Orcamento,
        id_utilizador:Utilizador,
        id_servico:Servico,
        id_empresa:Empresa,
        tipo_prestador: TipoPrestador,
        preco_hora:Float!,
        urgente:Boolean!,
        enabled:Boolean!) : PrestacaoServico

        updatePrestacaoServico(id: ID!,
        designacao:String!,
        subtorial:String!,
        horas_estimadas:Int!,
        id_prestadores:Prestador,
        id_orcamento:Orcamento,
        id_utilizador:Utilizador,
        id_servico:Servico,
        id_empresa:Empresa,
        tipo_prestador: TipoPrestador,
        preco_hora:Float!,
        urgente:Boolean!,
        enabled:Boolean!) : PrestacaoServico

        deletePrestacaoServico(id: ID!) : PrestacaoServico

        createProposta(prestacaoServico: PrestacaoServico,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: Prestador,
        owner: String,
        enabled: Boolean!,
        createdAt: String,
        updatedAt: String) : Proposta

        updateProposta(id: ID!,
        prestacaoServico: PrestacaoServico,
        precoHora: Float!,
        horasEstimadas: Int!,
        estado: EstadoProposta,
        idPrestador: Prestador,
        owner: String,
        enabled: Boolean!,
        createdAt: String,
        updatedAt: String) : Proposta

        deleteProposta(id: ID!) : Proposta

        createPrestador(nif:Int!,
        profissao:String!,
        taxa_urgencia:Float!,
        minimo_desconto:Float!,
        percentagem_desconto:Float!,
        disponivel:Int!,
        enabled:Boolean!) : Prestador

        updatePrestador(id: ID!,
        nif:Int!,
        profissao:String!,
        taxa_urgencia:Float!,
        minimo_desconto:Float!,
        percentagem_desconto:Float!,
        disponivel:Int!,
        enabled:Boolean!) : Prestador

        deletePrestador(id: ID!) : Prestador

        createEmpresa(designacao:String!,
        descricao:String!,
        nif:String!,
        icone:String!,
        localizacao:String!,
        enabled:Boolean!) : Empresa

        updateEmpresa(id: ID!,
        designacao:String!,
        descricao:String!,
        nif:String!,
        icone:String!,
        localizacao:String!,
        enabled:Boolean!) : Empresa

        deleteEmpresa(id: ID!) : Empresa

        createOrcamento(estado: EstadoOrcamento,
        horas_estimadas: Int!,
        preco_hora: Float!,
        id_prestacao_servico:PrestacaoServico,
        total:Float!,
        id_utilizador2:Utilizador,
        enabled:Boolean!,
        createdAt: String,
        updatedAt: String) : Orcamento

        updateOrcamento(id: ID!,
        estado: EstadoOrcamento,
        horas_estimadas: Int!,
        preco_hora: Float!,
        id_prestacao_servico:PrestacaoServico,
        total:Float!,
        id_utilizador: Utilizador,
        enabled:Boolean!,
        createdAt: String,
        updatedAt: String) : Orcamento

        deleteOrcamento(id: ID!) : Orcamento

        

    }

`
