export interface Servico {
    nome: string;
    precoHora: number;
    minimoDesconto:number;
    percentagemDesconto?:number;
}

let catalogoServicos: Servico[] = [];


export function adicionarServico(servico: Servico) {
    if (!servico.nome || servico.precoHora <= 0) {
        return "Erro: Nome do serviço é obrigatório e preço por hora deve ser maior que zero.";

}
    for (let i = 0; i < catalogoServicos.length - 1; i++) {
        if (catalogoServicos[i]?.nome === servico.nome) {
            return `Erro: Serviço '${servico.nome}' já existe.`;
        }
    }
    catalogoServicos.push(servico);
    console.log(`Serviço '${servico.nome}' adicionado com sucesso.`); 
    return({
        status: "sucesso",
        mensagem: `Serviço '${servico.nome}' adicionado com sucesso.`,
        
    });
}

// Listar tds os serviços
export function listarServicos() : Servico[]{
    //Tudo: implementar a função listarServicos
    return catalogoServicos;
}

// Apagar um serviço
export function apagarServico(nome: string) : boolean{
    //Tudo: implementar a função apagarServico
    
    const novoCatalogoTemp: Servico[] = [];

    for (let i = 0; i < catalogoServicos.length - 1; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            if (catalogoServicos[i]) novoCatalogoTemp.push(catalogoServicos[i]!);
        }
    }//devolva um novo catalogo sem o servico que foi apagado 

    catalogoServicos = novoCatalogoTemp;    

    return true;


}

//obter um serviço pelo nome
export function obterservico(nome: string) : Servico | null{
    for (let i = 0; i < catalogoServicos.length - 1; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!;
        }
    }
    return null;
}