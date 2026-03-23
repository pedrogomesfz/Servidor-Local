import db from "./lib/db.js"
import type { ServicoType } from "./utils/types.js"

// função para cria de servico
export async function createServico(
    servico: ServicoType ) {
    try {
        const [rows] = await db.execute(
            `INSERT INTO tbl_servicos(id, nome, descricao, preco, created_at, update_at) VALUES(?,?,?,?,?,?)`,
            [servico.id, servico.nome, servico.descricao, servico.precoHora, new Date(), new Date()]
        )
        return[rows]
    } catch (error) {
        console.log(error)
        return null
    }
}