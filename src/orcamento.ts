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
 //função para editar um prestador de servico
export function editarPrestadordeServico(nomeDoPrestador: string,  novosDadosDoPrestador: PrestadorType){
    //reecontrar o prestador de servico para editar a minha liasta
    // ciclo que percorre a lista e verifica o nome de prstador de servico 
    prestadoresDeServico.map((prestadorExistente: PrestadorType) =>{
        if( prestadorExistente.nome === nomeDoPrestador){
            prestadorExistente.nome === novosDadosDoPrestador.nome
            prestadorExistente.precoHora === novosDadosDoPrestador.precoHora
            prestadorExistente.profissao === novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto === novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto === novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.taxaDesconto === novosDadosDoPrestador.taxaDesconto
        }

        return {
            status: true,
            message: "Prestador de serevico editado com sucesso ",
            data: prestadorExistente
        }
    })
    // se nao existir nhm orestador cm o nome recebido, retorna uma mensagem de
            return{
                status: false,
                message: "Nao existe nhm prestador de servico com esse nome",
                data: null
            }
}
/*
prestadore: [
"Ambrosio"
"John"
"Tautau"
"Hight"
"Mister"
"XponxBob"
]


1kre edita prestador ek t nome "Ambrosio"
1kre altera Ambrosio p Tautau 
*/

// prestadorDeServico.replace()
//função para apagar um prestador de serico
export function apagarPrestadoresDeServico(nomeDePrestador: string){
    // ciclo para recorre a lista de prestador
    //for (let i = 0; i < prestadoresDeServico.length; i++) {
    //if para verificar se o nome do prestador fpr igual ao nome recebido
        //if (prestadoresDeServico[i]?.nome === nomeDePrestador) {
            //retornar uma mensagen de sucesso
            //prestadoresDeServico.splice(i, 1)
            // se nao existir nhm prestador com o nome recebido , retorna uma mensagem de emergencia
// prestadoesDeServicos.find() // se encontrar, devolver um item 
// prestadoesDeServicos.some() // se encontrar, devolver o item 
        
        
            prestadoresDeServico.filter(
            (prestador: PrestadorType) => prestador.nome !== nomeDePrestador
        )
        // validação do nome de prestador
        if (nomeDePrestador === ""){
            return {
                status: false,
                message: "Nome do prestador eh obrigatorio",
                data: null
            }
        }
        
        const prestadorExistente = prestadoresDeServico.some(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome === nomeDePrestador
    )

    if (!prestadorExistente) {
        return {
            status: false,
            message: "Nao existe nenhum prestador com esse nome",
            data: null
        }
    }



    prestadoresDeServico.filter(
        (prestadorExistente: PrestadorType) =>
            prestadorExistente.nome !== nomeDePrestador
    )
return {
            status: false,
            message: "Prestador deservico apagado com sucesso",
            data: null
        }
}


//função para obter um prestador de serviço pelo nome 



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
