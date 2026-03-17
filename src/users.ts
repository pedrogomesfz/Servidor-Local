import { create } from "node:domain";
import db from "./lib/db.js";

import type { ServicoType, UserType } from "./utils/types.js";


export async function getUsers() {
    const rows = await db.execute("SELECT * FROM tbl_utilizadores");
    return rows;
}

export async function getUsersById(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tbl_utilizadores
        WHERE tbl_utilizadores.id = ? `,
        [id]
    )

    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : rows
}

//criar uma função para inserir um utilizador na base de dados
export async function createUser(
user: UserType ) {
    try {
        
    console.log(user)
    const [rows] = await db.execute(
        `INSERT INTO tbl_utilizadores (id,nome, numero_identificado, data_nascimento, email, telefone,
        pais, localidade, password , enabled, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)`,
        [user.id, user.nome, user.numero_identificado, user.data_nascimento, user.email, user.telefone, user.pais, user.localidade, user.password, user.enabled,new Date(),new Date()]
    );
    return rows;
    }
    catch (error) {
        console.log(error)
        return null
    }

}


