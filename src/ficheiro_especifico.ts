interface AlunosType {
    nome: string;   
    endereco: string;
    contacto: string;
}

const alunos: Array<AlunosType> = [
    {
        nome: "Thiago", 
        endereco: "Rua A",
        contacto: "912345678"
    },
    {
        nome: "Maria Santos", 
        endereco: "Avenida Central, 456",
        contacto: "987654321"
    }
];


let horasTrabalho: number = 10;
let precoHora: number = 15;
let taxaUrgencia: number = 10;
let desconto: number = 5;
let total: number = 10;

let variavel: string = "variável";
desconto === taxaUrgencia && desconto > taxaUrgencia ?
    taxaUrgencia += desconto : taxaUrgencia -= desconto;

total = (horasTrabalho * precoHora) + taxaUrgencia - desconto; 

function calcularTotal () {
    total = (horasTrabalho * precoHora) + taxaUrgencia - desconto;
}

calcularTotal();