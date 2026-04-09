
import { id } from "date-fns/locale";
import db from "../lib/db.js";
import type { PrestadorDBType } from "../utils/types.js";

export const PrestadorModel = {
    async create(newPrestador: PrestadorDBType) {
        try {
            const query = 'INSERT INTO tbl_prestadores (id, nif, profissao, taxa_urgencia, minimo_desconto, prescentagem_desconto, disponivel, enabled, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)'

            const values = [
                null,
                newPrestador.nif,
                newPrestador.profissao,
                newPrestador.taxa_urgencia,
                newPrestador.minimo_desconto,
                newPrestador.percentagem_desconto,
                newPrestador.disponivel,
                newPrestador.enabled,
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
        const query = 'SELECT * FROM tbl_prestadores'

        const rows = await db.execute(query)

        return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

    } catch (error) {
        console.log(error)
        return null
    }
},

async get(id: string): Promise<PrestadorDBType | null> {
    try {
        const [rows] = await db.execute(
        `SELECT * FROM tbl_prestadores 
        WHERE tbl_prestadores.id = ?`,

        [id]
        )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows)  ? rows[0] as PrestadorDBType : null

    } catch (error) {
        console.log(error)
        return null
    }
},

async updatePrestador(id: string, prestadorAtualizado: PrestadorDBType) {
    try {
        const query = `UPDATE tbl_prestadores
                    SET
                        nif=?,
                        profissao=?,
                        taxa_urgencia=?,
                        minimo_desconto=?,
                        prescentagem_desconto=?,
                        disponivel=?,
                        enabled=?,
                        updated_at=?
                    WHERE
                        id=?`;

        const values = [
            prestadorAtualizado.nif,
            prestadorAtualizado.profissao,
            prestadorAtualizado.taxa_urgencia,
            prestadorAtualizado.minimo_desconto,
            prestadorAtualizado.percentagem_desconto,
            prestadorAtualizado.disponivel,
            prestadorAtualizado.enabled,
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

async  deletePrestador(id: string) {
    try {
        const query = `DELETE FROM tbl_prestadores WHERE id =?`

        const value = [id]

        const rows :
        any = await db.execute(query, value)

            return rows[0].affectedRows === 1
    } catch (error) {
        console.log(error)
        return null
    }
}

}