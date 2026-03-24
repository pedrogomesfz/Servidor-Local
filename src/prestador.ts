import { resourceLimits } from "node:worker_threads";
import db from "./lib/db.js";
import {  prestadoresDeServico } from "./orcamento.js";
import type { PrestadorType, UserType } from "./utils/types.js";

class Prestador {
    nome: string;
    precoHora: number;
    profissao: string;
    minimoParaDesconto: number;
    percentagemDesconto: number;
    taxaDesconto: number;

    constructor (nomeDoPrestador: string, precoHoraDoPrestador: number, profissaoDoPrestador: string, minimoParaDescontoDoPrestador: number, percentagemDescontoDoPrestador: number, taxaUrgenciaDoPrestador: number) 
    {
        this.nome = nomeDoPrestador;
        this.precoHora = precoHoraDoPrestador;
        this.profissao = profissaoDoPrestador;
        this.minimoParaDesconto = minimoParaDescontoDoPrestador;
        this.percentagemDesconto = percentagemDescontoDoPrestador;
        this.taxaDesconto = taxaUrgenciaDoPrestador;
    }


    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora;
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome;
    }
}  

const prestadoresSelecionados: PrestadorType[] = [];

const prestador1 = new Prestador("Pedro",
    100, 
    "Desenvolvidor de Software", 
    1000, 
    0.1,
    0.3
);


export async function createPrestador(
prestador: PrestadorType ) {
    try {
        console.log(prestador)
        const [rows] = await db.execute(
            `INSERT INTO tbl_prestadores(id, nif, profissao, taxa_urgencia, minimo_desconto, prescentagem_desconto, disponivel, enabled, created_at, update_at) VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [prestador.id, prestador.nif, prestador.profissao, prestador.taxa_urgencia,prestador.minimo_desconto, prestador.percentagem_desconto, prestador.disponivel, prestador.enabled, new Date(), new Date()]
        )
        return[rows]
    } catch (error) {
        console.log(error)
        return null
    }
    
}



/*
    nome: "Pedro",
    precoHora: 100,
    profissao: "Desenvolvidor de Software",
    minimoParaDesconto: 1000,
    percentagemDesconto: 0.1,
    taxaDesconto: 0.3
*/ 