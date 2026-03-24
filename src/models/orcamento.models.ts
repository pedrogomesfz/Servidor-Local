
import { error } from "node:console"
import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const OrcamentoModel = {
    async create(Orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_orcamentos 
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    Orcamento.total,
                    Orcamento.id_utilizador2,
                    Orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_orcamentos")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_orcamentos 
                WHERE tbl_orcamentos.id = ?`, 

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_orcamentos 
                SET total = ?, 
                id_utilizadores = ?, 
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
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
            return null
        }
    }
}