import express, { type Request, type Response } from "express"
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js"
import { calcularOrcamento, criarPrestadorDeServico, selecionarPrestadorPorNome, selecionarServicos } from "./orcamento.js"


const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    const addServicoResponse = adicionarServico(novoServico)

    res.json(addServicoResponse)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)

        res.json(obterServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para selecionae servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body
    const selecionarServicoResponse = selecionarServicos(nome as string)
    res.json(selecionarServicoResponse)
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body 

    const calcularOrcamentoresponse = calcularOrcamento(pedido)
    
    res.json({
        message: "Orçamento calculado com sucesso!",
        orcamentoTotal: calcularOrcamentoresponse
    })
})

//rota para selecionar prestador
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDePrestador} = req.body

    const selecionaPrestadorRespnse = selecionarPrestadorPorNome(nomeDePrestador as string)

    res.json({
        status: selecionaPrestadorRespnse,
        message: "prestador servico selecionado com sucesso"
    })
})

//rota paara criar prestadores de servico
app.post("/criar-prestador", (req: Request, res: Response) => {
    // pegar o corpo de requisitos com os dados do novo prestador
    const novoPrestador  = req.body

    const criarPrestadorresponse = criarPrestadorDeServico(novoPrestador)

    res.json(criarPrestadorresponse)
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})