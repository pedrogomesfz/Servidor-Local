export interface PedidoSevicoType {
    cliente: string;
    descricao: string;
    horasEstimadas: number;
    urgente: boolean
}

export interface AlunosType {
    nome: string;   
    endereco: string;
    contacto: string;
}

export interface ServicoType {
    nome: string,
    precoHora: number,
    categoria: string,
    minimoDescontado: number,
    percentagemDeconto: number
}

export interface ResponseType {
    status: boolean,
    message: string,
    data: ServicoType | null,
}

export interface PrestadorType {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaDesconto: number;
}

export interface UserType {
    id: string,
	nome:   string,
	numero_identificado: string,
	data_nascimento: string,
	email: string,
    telefone: string,
	pais: string,
	localidade: string,
    password: string;
    enabled: boolean;
    created_at: string;
    updated_at: string
}

export interface ServicoType {
    id:string ,
    nome:string ,
    descricao:string,
    categoria:string,
    enabled:boolean,
    created_at:string ,
    update_at:string
}

export interface PrestadorType {
    id:string ,
    nif:number ,
    profissao:string,
    taxa_urgencia:number,
    minimo_desconto:number,
    percentagem_desconto:number,
    disponivel:number,
    enabled:boolean,
    created_at:string ,
    update_at:string
}

export interface ListaServicoType {
    id:string ,
    nome:string ,
    descricao:string,
    categoria:string,
    enabled:boolean,
    created_at:string ,
    update_at:string
}

export interface ServiceDBType {
    prescentagem_desconto: any;
    minimo_desconto: any;
    taxa_urgencia: any;
    profissao: any;
    nif: any;
    disponivel: any;
    id:string,
    nome:string,
    descricao:string,
    categoria:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface PrestadorDBType {
    id:string,
    nif:number,
    profissao:string,
    taxa_urgencia:number,
    minimo_desconto:number,
    percentagem_desconto:number,
    disponivel:number,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface UserDBType {
    id:string,
    nome:string,
    numero_identificado:string,
    email:string,
    telefone:string,
    numero_utilizador:string,
    data_nascimento:string,
    localidade:string,
    password:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface OrcamentoDBType {
    estado: any;
    horas_estimadas: any;
    preco_hora: any;
    id_prestacao_servico: any;
    id:string,
    total:number,
    id_utilizador2:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface PropostaDBType {
    id:string,
    id_prestacao_servico:string,
    preco_hora:number,
    horas_estimadas:number,
    estado:string,
    enabled:boolean,
    created_at:string,
    update_at:string
}

export interface PrestacaoServicoDBType {
    id:string,
    designacao:string,
    subtorial:string,
    horas_estimadas:number,
    id_prestadores:string,
    id_orcamento:string,
    id_servico:string,
    preco_hora:number,
    created_at:string

}