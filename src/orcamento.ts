import { catalogoServicos } from "./servico.js"
import { type PedidoSevicoType, type PrestadorType, type ServicoType } from "./utils/types.js"

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicoSelecionados: ServicoType[] = []
export const prestadoresDeServico: PrestadorType[] = []
const prestadoresDeServicoSelecionados: PrestadorType[] = []

//funcao para selecionar servicos e horas estimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicoSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}

// funcao para selecionar prestadores de servico
export function criarPrestadorDeServico(novoPrestador: PrestadorType) {
    // verificar se o prestador ja está no array
    prestadoresDeServico.map((prestador: PrestadorType) => {
        if (prestador.nome === novoPrestador.nome){
            // se o prestador ja existe, retornar uma mensagem de erro
            return {
                status: false, 
                message: "ja existe um prestador com esse nome",
                data: null
                }
        }
    })
    

    // se o prestador nao existe, adicionamos um novo prestador
    prestadoresDeServico.push(novoPrestador)
    return {
        status: true, 
        message: "prestador criado com sucesso",
        data: novoPrestador
    }
}
// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoSevicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicoSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

}

    //função para selecionar prestadores de servico
    export function selecionarPrestadorPorNome(nomeDoPrestador: string) {

        //ciclo para encontrar o prestador pelo nome
        for (let i = 0; i < prestadoresDeServico.length; i++) {
            // if que verifica se o item [i] do  array eh igual ao nome recebido
            if (prestadoresDeServico[i]?.nome === nomeDoPrestador) {
                // se for igual, adiciona do item [i] ao array prestadores 
                prestadoresDeServicoSelecionados.push(prestadoresDeServico[i]!)
                // e retorna verdadeiro
                return true
            }
        }
        //retorna falso
        return false
    
}


    
    // () => {} --- arrow function
    // function () {} --- function normal

    /*
    urgent:true
    taxaurgencia: 0.3
    totalBruto: 100
    totalTaxa: 100 * 0.3 = 30
    totalFinal: 100 + 30 = 130

    totalBruto: 100
    totalbruto apos urgencia: 150
    minimo desconto : 100
    percentagem: 10%
    desconto sobre total final: 150* 0.1 = 15
    desconto sobre total bruto: 100* 0.1 = 10
    */
