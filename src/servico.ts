import db from "./lib/db.js";
import { type ResponseType, type ServiceDBType, type ServicoType } from "./utils/types.js"

export let catalogoServicos: ServicoType[] = []


// adicionar um serviço novo
export function adicionarServico(novoServico: ServicoType): ResponseType {
    if (!novoServico.nome || novoServico.precoHora <= 0) {
        return ({
            status: false,
            message: "Erro: Nome obrigatório e preço deve ser maior que zero.",
            data: null,
        });
    }

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === novoServico.nome) {
            return ({
                status: false,
                message: `Erro: O serviço '${novoServico.nome}' já existe.`,
                data: null,
            });
        }
    }

    catalogoServicos.push(novoServico);

    return ({
        status: true,
        message: "Sucesso: Serviço adicionado!",
        data: novoServico,
    });
}

// listar todos os serviços
export function listarServicos(): ServicoType[] {
    // TODO: implementar fetch de servicos

    return catalogoServicos
}

// apagar um servico 
export function apagarServico(nome: string): boolean {
    // TODO: implementar delete de servico

    const novoCatalogoTemp: ServicoType[] = []

    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome) {
            novoCatalogoTemp.push(catalogoServicos[i]!)
        }
    } // devolve um novo catalogo sem o servico que foi apagado

    catalogoServicos = novoCatalogoTemp

    return true
}

// obter um servico pelo nome
export function obterServico(nome: string): ServicoType | null {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            return catalogoServicos[i]!
        }
    }
    return null
}

//criar uma função para inserir serviços na base de dados
export async function createServico(servico:ServicoType) {
    console.log(servico)
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_servicos( id, nome, descricao, categoria, enabled, created_at, update_at) VALUES (?,?,?,?,?,?,?)`,
            [servico.id,servico.nome, servico.descricao, servico.categoria, servico.enabled, servico.created_at, servico.update_at]
)
return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function addServicesToDB(newService: ServiceDBType){
    console.log({newService})

    try {
        const query = `INSERT INTO tbl_services VALUES(?,?,?,?,?,?,?)`
   
        const values =
            
            [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
                
            ]
        const rows = await db.execute(query, values)
        
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}
//criar uma função para obter serviços na base de dados por ID
export async function getServicesById(id:string) {
    try {
        const query = `SELECT * FROM tbl_services WHERE id = ?`

        const values = [id]

        const rows = await db.execute(query, values)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

    } catch (error) {
       console.log(error)
       return null 
    }    
}

export async function getAllServices(){
    try {
        const query = `SELECT * FROM tbl_services`

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []
    } catch (error) {
        console.log(error)
        return null
    }
} 

// update de dados 
export async function updateService(id: string, updateService: ServiceDBType){
    try {
        const query = `UPDATE tbl_services
                            SET
                                nome=?
                                descricao=?
                                categoria=?
                                enabled=?
                                update_at=?
                            WHERE
                                id=?
                            ;`
        const values = [
            updateService.nome,
            updateService.descricao,
            updateService.categoria,
            updateService.enabled,
            new Date(),
            id
        ]

        const [rows] = await db.execute(query, values)
        return rows 

    } catch (error) {
        console.log(error)
        return null
    }
}


export async function deleteService(id:string){
    try {
        const query = `DELETE FROM tbl_servicos WHERE id= ?`

        const valeu = [id]

        const rows = await db.execute(id ) 

        return rows

    } catch (error) {
        console.log(error)
        return null
    }
}