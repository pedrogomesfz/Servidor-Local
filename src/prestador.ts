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

console.log
const prestador1 = new Prestador("Pedro",
    100, 
    "Desenvolvidor de Software", 
    1000, 
    0.1,
    0.3
);


/*
    nome: "Pedro",
    precoHora: 100,
    profissao: "Desenvolvidor de Software",
    minimoParaDesconto: 1000,
    percentagemDesconto: 0.1,
    taxaDesconto: 0.3
*/ 