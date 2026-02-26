import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterservico, type Servico } from "./servico.js";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
res.send("Hello world");
});

app.post("/adicionar-servico", (req: Request, res: Response) => {
const novoServico = req.body;

const response = adicionarServico(novoServico);

console.log(novoServico);

const adiicionarServicoResponse = adicionarServico(novoServico);

res.json(response);
});


//rota para listar os serviços
app.get("/listar-servicos", (req: Request, res: Response) => {
const listServicoResponse = listarServicos();
res.json(listServicoResponse);
});

app.listen(8080, () => {
console.log("Servidor a correr na porta 8080");
});



//rota para apagar um serviço
app.delete("/apagar-servico", (req: Request, res: Response) => {
const { nome } = req.query;

if (nome) {
    const apagarServicoResponse = apagarServico(nome as string);
    res.json(apagarServicoResponse);
} else {
    res.json({
    message: "Erro: Nome do serviço é obrigatório para apagar um serviço.",
    });
}
});

//rota para obter um serviço pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
const { nome } = req.query;

if (nome) {
    const obterServicoResponse = obterservico(nome as string);
    
    res.json(obterServicoResponse);
} else {
    res.json({
        message: "Erro: Nome do serviço é obrigatório para obter um serviço.",
    });
}

})

