import express, { type Request, type Response } from "express";
import {
    adicionarServico,
    apagarServico,
    listarServicos,
    obterServico,
} from "./servico.js";
import {
    apagarPrestadoresDeServico,
    calcularOrcamento,
    criarPrestadorDeServico,
    editarPrestadordeServico,
    selecionarPrestadorPorNome,
    selecionarServicos,
} from "./orcamento.js";
import type { ResolveFnOutput } from "node:module";
import {  getUsersById, getUsers } from "./users.js";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body;

    const addServicoResponse = adicionarServico(novoServico);

    res.json(addServicoResponse);
});

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos();

    res.json(listServicoResponse);
});

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string);

        res.json(apagarServicoResponse);
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio",
        });
    }
});

// rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query;

    if (nome) {
        const obterServicoResponse = obterServico(nome as string);

        res.json(obterServicoResponse);
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio",
        });
    }
});

// rota para selecionae servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body;
    const selecionarServicoResponse = selecionarServicos(nome as string);
    res.json(selecionarServicoResponse);
});

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body;

    const calcularOrcamentoresponse = calcularOrcamento(pedido);

    res.json({
        message: "Orçamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoresponse,
    });
});

//rota para selecionar prestador
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDePrestador } = req.body;

    const selecionaPrestadorRespnse = selecionarPrestadorPorNome(
        nomeDePrestador as string,
    );

    res.json({
        status: selecionaPrestadorRespnse,
        message: "prestador servico selecionado com sucesso",
    });
});

//rota para criar prestadores de servico
app.post("/criar-prestador", (req: Request, res: Response) => {
    // pegar o corpo de requisitos com os dados do novo prestador
    const { novoPrestador } = req.body;

    // chamar a função de criar prestador de serviço
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador);
    res.json(criarPrestadorResponse);
});
//rota para editar prestadores
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { novoPrestador, nomeDoPrestador } = req.body;
    const editarPrestadorResponse = editarPrestadordeServico(
        nomeDoPrestador,
        novoPrestador,
    );
    res.json(editarPrestadorResponse);
});

//rota para apagar prestadores
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.query;
    if (nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadoresDeServico(
            nomeDoPrestador as string,
        );
        res.json(apagarPrestadorResponse);
    } else {
        res.json({
            message: "O nome do prestador apagado com sucesso",
        });
    }
});
// selecionar todos os utilizadores na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers();

    res.json(getUsersResponse);
});

// selecionar todos os utilizadores por id
app.get("/get-users-by-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (id) {
        const getUsersByIdResponse = await getUsersById(id as string);

        if (!getUsersByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "Utilizador encontrado",
            data: getUsersByIdResponse,
        });
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
