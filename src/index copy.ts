import express, { type Request, type Response } from "express";
import {
    addServicesToDB,
    adicionarServico,
    apagarServico,
    deleteService,
    getAllServices,
    getServicesById,
    listarServicos,
    obterServico,
    updateService,
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
import { getUsersById, getUsers, createUser, updateUser } from "./users.js";
import { userInfo } from "node:os";
import type { ListaServicoType, PrestadorType, ServiceDBType, ServicoType, UserDBType, UserType, } from "./utils/types.js";
import { createPrestador } from "./prestador.js";
import { createServico } from "./listas.js";

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
//rota incerir um utilizador na base de dados
app.post("/create-user", async (req: Request, res: Response) => {
    const user: UserType = req.body;

    if (!user) {
        res.status(404).json({
            status: "error",
            message: "Dados de utilizador invalido",
            data: null
        })
    }
    const createUserResponse = await createUser(
        user
    );
res.json(createUserResponse);
    
    })

//rota para inserir um servico na base de dados 2
app.post("/create-service", async (req: Request, res: Response)=>{
    const newService: ServiceDBType= req.body
    if(!newService){
        res.status(404).json({
            status: "error",
            message: "Dados de servico invalidos",
            data: null
        })
    }

    // 429 too many requests
    // 409 conflict
    // 201 no content

    console.log(newService)

    const createServiceResponse = await addServicesToDB(newService)
//caso funçãqo retorne null
    if(createServiceResponse === null){
        res.status(400).json({
            status: "error",
            message: "Erro ao criar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Servico criado com sucesso",
        data: createServiceResponse
    })
    
});
app.get("/get-service-by-id", async (req: Request, res: Response)=>{
        const {id} = req.params

        if(!id){
        return res.status(404).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }
    
    const getServiceByIdResponse = await getServicesById(id as string)
    
    if(!getServiceByIdResponse){
        return res.status(404).json({
            status: "error",
            message: "Servico nao encontrado",
            data: null
        })
    }
    
    res.status(200).json({
        status: "success",
        message: "Servico encontrado",
        data: getServiceByIdResponse
    })

})
//rota para selecionar todos os servicos na base de dados
app.get("/get-all-services", async (req: Request, res: Response)=>{
    const getAllServicesResponse = await getAllServices()

    if(!getAllServicesResponse){
        return res.status(404).json({
            status: "error",
            message: "Erro ao selecionar servicos",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Servicos encontrados",
        data: getAllServicesResponse
    })
})

app.put("/update-service-id/:id", async (req: Request, res: Response)=>{
    const {id} = req.params
    const updatedService : ServiceDBType = req.body

    if(!id){
        return res.status(404).json({
            status: "error",
            message:"dados de servico invalidos",
            data: null
        })
    }

    if (!updatedService){
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const updateServiceResponse = await updateService(id as string, updatedService)

    if(!updateServiceResponse){
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Erro ao encontrar servico",
        data: updateServiceResponse
    })
})

// rota para apagar um servico pelo id
app.delete("/delete-service-by-id", async (req: Request, res: Response)=>{

    const {id} = req.params

    if(!id){
        return res.status(404).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const deleteServiceResponse = await deleteService(id as string)

    if(!deleteServiceResponse){
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Servico apagado com sucesso",
        data: deleteServiceResponse
    })
})

app.put("/update-user-by-id/:id", async (req: Request, res: Response)=>{
    const {id} = req.params
    const updatedUsers : UserDBType = req.body

    if(!id){
        return res.status(404).json({
            status: "error",
            message:"dados de utilizador invalidos",
            data: null
        })
    }

    if (!updatedUsers){
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const updateUserResponse = await updateUser(id as string, updatedUsers)

    if(!updateUserResponse){
        return res.status(400).json({
            status: "error",
            message: "Erro ao atualizar utilizador",
            data: null
        })
    }

    res.status(200).json({
        status: "success",
        message: "Utilizador atualizado com sucesso",
        data: updateUserResponse
    })
})




app.listen(8080, () => {
    console.log("Server running on port 8080");
});



