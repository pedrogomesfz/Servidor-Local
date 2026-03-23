import db from "../lib/db.js";
import type { OrcamentoDBType, PrestacaoServicoDBType } from "../utils/types.js";

export const PrestacaoServicoModel = {
    async create(newPrestacaoServico: PrestacaoServicoDBType) {
        try {
            const query = 'INSERT INTO tbl_prestacao_servicos (id, descricao, subtorial, horas_estimadas, id_prestadores, id_orcamento, id_servico, preco_hora, created_at) VALUES (?,?,?,?,?,?,?,?,?)'

            const values = [
                null,
                newPrestacaoServico.descricao,
                newPrestacaoServico.subtorial,
                newPrestacaoServico.horas_estimadas,
                newPrestacaoServico.id_prestadores,
                newPrestacaoServico.id_orcamento,
                newPrestacaoServico.id_servico,
                newPrestacaoServico.preco_hora,
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
            const query = 'SELECT * FROM tbl_prestacao_servicos'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_prestacao_servicos WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, prestacaoServicoAtualizado: PrestacaoServicoDBType) {
        try {
            const query = `UPDATE tbl_prestacao_servicos
                        SET
                            descricao=?,
                            subtorial=?,
                            horas_estimadas=?,
                            id_prestadores=?,
                            id_orcamento=?,
                            id_servico=?,
                            preco_hora=?,
                            created_at=?
                        WHERE
                            id=?`;

            const values = [
                prestacaoServicoAtualizado.descricao,
                prestacaoServicoAtualizado.subtorial,
                prestacaoServicoAtualizado.horas_estimadas,
                prestacaoServicoAtualizado.id_prestadores,
                prestacaoServicoAtualizado.id_orcamento,
                prestacaoServicoAtualizado.id_servico,
                prestacaoServicoAtualizado.preco_hora,
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
            const query = `DELETE FROM tbl_prestacao_servicos WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0].affectedRows === 1
        } catch (error) {
            console.log(error)
            return null
        }
    },


}
