
import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";

export const OrcamentoModel = {
    async create(newOrcamento: OrcamentoDBType) {
        try {
            const query = 'INSERT INTO tbl_orcamento (id, total, id_utilizador2, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newOrcamento.total,
                newOrcamento.id_utilizador2,
                newOrcamento.enabled,
                new Date(),
                new Date()
            ]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1


        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        try {
            const query = 'SELECT * FROM tbl_orcamento'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_orcamento WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, orcamentoAtualizado: OrcamentoDBType) {
        try {
            const query = `UPDATE tbl_orcamento
                        SET
                            id=?,
                            dtotal=?,
                            is_utilizador2=?,
                            enabled=?,
                            updated_at=?`

            const values = [
                orcamentoAtualizado.id,
                orcamentoAtualizado.total,
                orcamentoAtualizado.id_utilizador2,
                orcamentoAtualizado.enabled,
                new Date(),
                id
            ]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
        const query = `DELETE FROM tbl_orcamento WHERE id =?`

        const value = [id]

        const rows :
        any = await db.execute(query, value)

            return rows[0].affectedRows === 1
    } catch (error) {
        console.log(error)
        return null
    }
    },

    
}