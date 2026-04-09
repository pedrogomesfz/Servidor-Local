import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType) {
        try {
            const query = `INSERT INTO tbl_orcamento (id, total, id_utilizadores2, enable_, created_at, update) VALUES (?, ?, ?, ?, ?, ?)`
            const values = [
                generateUUID(),
                orcamento.total,
                orcamento.id_utilizador2,
                orcamento.enabled,
                new Date(),
                new Date()
            ]
            const [result]: any = await db.execute(query, values)
            return result.affectedRows === 1
        } catch (erro) {
        
            return null
        }
    },

    async getAll() {
        try {
            const [rows]: any = await db.execute("SELECT * FROM tbl_orcamento")
            return rows
        } catch (error) {
            
            return null
        }
    },

    async getById(id: string) {
        try {
            const [rows]: any = await db.execute(
                `SELECT * FROM tbl_orcamento WHERE id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (erro) {
            
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const query = `UPDATE tbl_orcamento 
                SET total = ?, 
                id_utilizadores2 = ?, 
                enable_ = ?, 
                update = ?
                WHERE id = ?`
            const values = [
                orcamento.total,
                orcamento.id_utilizador2,
                orcamento.enabled,
                new Date(),
                id
            ]
            const [result]: any = await db.execute(query, values)
            return result.affectedRows === 1
        } catch (erro) {
            
            return null
        }
    },

    async delete(id: string) {
        try {
            const [result]: any = await db.execute(
                `DELETE FROM tbl_orcamento WHERE id = ?`,
                [id]
            )
            return result.affectedRows === 1
        } catch (erro) {
            
            return null
        }
    },

    async OrcamentoModelValorTotal(id: string) {
        try {
            const [rows]: any = await db.execute(
                `SELECT p.preco_hora, p.horas_estimadas 
                FROM tbl_proposta p
                JOIN Tbl_prestacao_servico ps ON p.id_prestacao_servico = ps.id
                WHERE ps.id_orcamento = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null

            const valorTotal = (rows as any[]).reduce((total, proposta) => {
                return total + (proposta.preco_hora * proposta.horas_estimadas)
            }, 0)
            
            const [result]: any = await db.execute(
                `UPDATE tbl_orcamento 
                SET total = ?, update = ?
                WHERE id = ?`,
                [valorTotal, new Date(), id]
            )
            return result.affectedRows === 1
        } catch (error) {
            
            return null
        }
    },



    async updateBuget(id: string, total: number){
        try{
            const rows : any = await db.execute(
                `UPDATE tbl_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )
        }
        catch (err){
        console.log(err)
        return null
    }
}
}
