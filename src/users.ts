import db from "./lib/db.js";


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

//criar uma função para inserir um tilizador ma base de dados
export async function createUser(nome: string, endereco: string, contacto: string) {
    const [rows] = await db.execute(
        `INSERT INTO tbl_utilizadores (nome, endereco, contacto) VALUES (?, ?, ?)`,
        [nome, endereco, contacto]
    )
    return rows
}

new Date()