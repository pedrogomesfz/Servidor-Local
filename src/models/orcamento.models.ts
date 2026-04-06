
import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const OrcamentoModel = {
async create(orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_orcamentos 
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
            console.log({ rows })
            return rows
        } catch (erro) {
            console.log(erro)
            return null
        }
    },


    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_orcamentos")
        return rows
    },

    async getById(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_orcamentos 
                WHERE tbl_orcamentos.id = ?`, 

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (erro) {
            console.log(erro)
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_orcamentos 
                SET total = ?, 
                id_utilizador2 = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    orcamento.total,
                    orcamento.id_utilizador2,
                    orcamento.enabled,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (erro) {
            console.log(erro)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_orcamentos 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (erro) {
            console.log(erro)
            return null
        }
    },


    async OrcamentoModelValorTotal(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT p.preco_hora, p.horas_estimadas 
                FROM tbl_proposta p
                JOIN tbl_orcamentos o ON p.id_prestacao_servico = o.id
                WHERE o.id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null

            const valorTotal = (rows as any[]).reduce((total, proposta) => {
                return total + (proposta.preco_hora * proposta.horas_estimadas)
            }, 0)
            await db.execute(
                `UPDATE tbl_orcamentos 
                SET total = ?, updated_at = ?
                WHERE id = ?`,
                [valorTotal, new Date(), id]
            )
        } catch (error) {
            console.log(error)
            return null
        }
    }
}