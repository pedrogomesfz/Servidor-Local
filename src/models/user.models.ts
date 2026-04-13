import { create } from "node:domain";
import db from "../lib/db.js";

import type { ServicoType, UserDBType, UserType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";
import { hashPassword } from "../utils/password.js";
import { formatDateDDMMYYYY } from "../utils/date.js";
import type { RowDataPacket } from "mysql2/promise";



export const UserModel = {
    async create(newUsers: UserDBType): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute<UserDBType & RowDataPacket []>(
            `INSERT INTO tbl_users 
            VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?)`,

            [
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
        )
        
            return rows as UserDBType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll(): Promise<UserDBType[] | null> {
        const [rows] = await db.execute<UserDBType[] & RowDataPacket[]>(
                'SELECT * FROM tbl_users'
            )
            return rows as UserDBType[]

    },

    async get(id: string): Promise<UserDBType | null> {
        try {
            const [rows] = await db.execute<UserDBType & RowDataPacket []>(
             `SELECT * FROM tbl_users WHERE id = ?`,
            [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserDBType : null
        } catch (error) {
            console.log(error)
            return null
        }

    },
        async getByEmail(email: string): Promise<UserType | null> {
                    try{
                        const [rows] = await db.execute(
                            `SELECT * FROM tbl_utilizadores
                            WHERE tbl_utilizadores.email = ?`,
                            [email]
                        )
                        if ( Array.isArray(rows) && rows.length === 0) return null
                        return Array.isArray(rows) ? rows[0] as UserType : null
                    }catch (err){
                        console.log(err)
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

    async delete(id: string) : Promise<UserDBType | null> {
        try {
        const rows : any = await db.execute< UserDBType []  & RowDataPacket[] >( 
        `DELETE FROM tbl_users WHERE id =?`,
        [id]
    )
    return rows[0].affectedRows === 0 ? null : rows[0] as UserDBType

    } catch (error) {
        console.log(error)
        return null
    }
    },

    async updatePassword(id: string, password: string) {
        try {
            const query = `UPDATE tbl_utilizadores
                        SET
                            password=?,
                            updated_at=?
                        WHERE
                            id=?;`

            const values = [
                password,
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

    async resetPassword(id: string, password: string) {
        try {
            const query = `UPDATE tbl_utilizadores
                        SET
                            password=?,
                            update_at=?
                        WHERE
                            id=?;`

            const values = [
                password,
                new Date(),
                id
            ]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1
        } catch (error) {
            console.log(error)
            return null
        }
    }
}