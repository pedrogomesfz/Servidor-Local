import type { RowDataPacket } from "mysql2/promise"
import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import { error } from "node:console"

export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket []>(
            `INSERT INTO tbl_orcamento 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                generateUUID(),
                orcamento.total,
                orcamento.id_utilizador2,
                orcamento.enabled,
                new Date(),
                new Date()
            ]
            )
            return rows as OrcamentoDBType
            
        } catch (erro) {

            return null
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        const [rows] = await db.execute< OrcamentoDBType [] & RowDataPacket []>(
            "SELECT * FROM tbl_orcamento"
        )
        return rows as OrcamentoDBType[]
    },

    async get(id: string):Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket []>(
                `SELECT * FROM tbl_orcamento WHERE id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as OrcamentoDBType : null
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
            const [rows]: any = await db.execute(query, values)
            return rows.affectedRows === 1
        } catch (erro) {
            
            return null
        }
    },

    async delete(id: string): Promise<OrcamentoDBType | null> {
        try {
            const rows: any = await db.execute< OrcamentoDBType & RowDataPacket []>(
                `DELETE FROM tbl_orcamento WHERE id = ?`,
                [id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0] as OrcamentoDBType
        } catch (erro) {
            console.log(error)
            
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
