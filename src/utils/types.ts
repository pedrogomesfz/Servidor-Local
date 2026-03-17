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