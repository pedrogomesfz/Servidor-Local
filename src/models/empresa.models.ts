import type { RowDataPacket } from "mysql2"
import type { EmpresaDBtype } from "../utils/types.js"
import db from "../lib/db.js"
import { generateUUID } from "../utils/uuid.js"





export const EmpresaModel = {
    async create(empresa: EmpresaDBtype): Promise<EmpresaDBtype | null> {
        try {
            const [rows] = await db.execute<EmpresaDBtype & RowDataPacket[]>(
                `INSERT INTO tbl_empresa 
                VALUES (?, ?, ?, ?, ?,?,?,?,?,?)`,

                [
                    generateUUID(),
                    empresa.designacao,
                    empresa.descricao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.localizacao,
                    empresa.enabled,
                    new Date(),
                    new Date()
                ]
            )

            return rows as EmpresaDBtype
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll(): Promise<EmpresaDBtype[] | null> {
        const [rows] = await db.execute<EmpresaDBtype[] & RowDataPacket[]>
            ("SELECT * FROM tbl_empresa")

        return rows as EmpresaDBtype[]
    },

    async get(id: string): Promise<EmpresaDBtype | null> {
        try {   
            const [rows] = await db.execute<EmpresaDBtype & RowDataPacket[]>(   
                `SELECT * FROM tbl_empresa 
                WHERE tbl_empresa.id = ?`,

                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as EmpresaDBtype : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, empresa: EmpresaDBtype): Promise<EmpresaDBtype | null> {
        try {
            const [rows] = await db.execute<EmpresaDBtype & RowDataPacket[]>(
                `UPDATE tbl_empresa 
                SET 
                designacao = ?, 
                descricao = ?, 
                nif = ?, 
                icone = ?, 
                id_utilizador = ?, 
                localizacao = ?, 
                enabled = ?, 
                updated_at = ?
                WHERE id = ?`,
                [
                    empresa.designacao,
                    empresa.descricao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.localizacao,
                    empresa.enabled,
                    new Date(),
                    id
                ]
                )
                return rows as EmpresaDBtype
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string): Promise<EmpresaDBtype | null> {
        try {
            const [rows] = await db.execute<EmpresaDBtype & RowDataPacket[]>(
                `DELETE FROM tbl_empresa 
                WHERE id = ?`,

                [id]
            )

            return rows as EmpresaDBtype
        } catch (err) {
            console.log(err)
            return null
        }
    },
    async disable(id: string): Promise<EmpresaDBtype | null> {
        try {
            const [rows] = await db.execute<EmpresaDBtype & RowDataPacket[]>(
                `UPDATE tbl_empresa 
                SET enabled = ?, updated_at = ?
                WHERE id = ?`,
                [
                    false,
                    new Date(),
                    id
                ]
            )
                return rows as EmpresaDBtype
        } catch (err) {
            console.log(err)
            return null
        }
}   
}