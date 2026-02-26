
interface PedidoServiço {
    cliente: string;
    descricao: string;
    horasEstimado: number;
    urgente: boolean;
}


function calcularOrcamento(pedido: PedidoServiço, precoHora: number){
    let total: number= 0;



    total = (pedido.horasEstimado * precoHora) 

    if (pedido.urgente) {
        total += total * 0.3; // Adiciona 30% ao total se for urgente
    }

    pedido.urgente ? total += total * 0.3 : total;
    
    return total;
    
}
    