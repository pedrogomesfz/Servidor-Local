
import { create } from "node:domain";
import db from "../lib/db.js";

import type { ServicoType, UserDBType, UserType } from "../utils/types.js";
import { genereteUUID } from "../utils/uuid.js";
import { hashPassword } from "../utils/password.js";
import { formatDateDDMMYYYY } from "../utils/date.js";



export const UserModel = {
    async create(newUsers: UserDBType) {
        try {
            const query = 'INSERT INTO tbl_users (id, nome, numero_indentificado, email, telefone, numero_utilizador,data_nascimento, localidade,password, enabled, created_at, updated_at) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newUsers.nome,
                newUsers.numero_identificado,
                newUsers.email,
                newUsers.telefone,
                newUsers.numero_utilizador,
                formatDateDDMMYYYY(newUsers.data_nascimento),
                newUsers.localidade,
                await hashPassword(newUsers.password),
                newUsers.enabled,
                new Date(),
                new Date()
            ]

        
            return await db.execute(query, values)


        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        try {
            const query = 'SELECT * FROM tbl_users'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_users WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, UserAtualizado: UserDBType) {
        try {
            const query = `UPDATE tbl_users
                        SET
                            nome=?,
                            numero_indentificado=?,
                            email=?,
                            telefone=?,
                            numero_utilizador=?,
                            data_nascimento=?,
                            localidade=?,
                            password=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?;`

            const values = [
                UserAtualizado.nome,
                UserAtualizado.numero_identificado,
                UserAtualizado.email,
                UserAtualizado.telefone,
                UserAtualizado.numero_utilizador,
                UserAtualizado.data_nascimento,
                UserAtualizado.localidade,
                UserAtualizado.password,
                UserAtualizado.enabled,
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
        const query = `DELETE FROM tbl_users WHERE id =?`

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