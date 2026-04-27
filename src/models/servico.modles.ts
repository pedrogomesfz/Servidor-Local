
import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { ServiceDBType, ServicoDetalhadoType, UserType } from "../utils/types.js";

export const ServiceModel = {
    async create(newService: ServiceDBType) {
        try {
            const query = 'INSERT INTO table_servicos (id, nome, descricao, categoria, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'

            const values = [
                null,
                newService.nome,
                newService.descricao,
                newService.categoria,
                newService.enabled,
                new Date(),
                new Date()
            ]

            const rows = await db.execute(query, values)

            // select last id
            const queryLastId = `SELECT * FROM table_servicos ORDER BY id DESC LIMIT 1`
            const [lastService] = await db.execute<ServiceDBType[] & RowDataPacket[]>(queryLastId)

            return lastService[0] as ServiceDBType
            
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll(): Promise<ServiceDBType[] | null> {
        const [rows] = await db.execute<ServiceDBType[] & RowDataPacket[]>(
            "SELECT * FROM tbl_servicos"
        )
        return rows as ServiceDBType[]
    },

    async get(id: string): Promise<ServiceDBType | null> {
        try {
            const [rows] = await db.execute<ServiceDBType & RowDataPacket[]>(
                'SELECT * FROM tbl_servicos WHERE id = ?',
                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as ServiceDBType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    

    async update(id: string, servicoAtualizado: ServiceDBType) {
        try {
            const query = `UPDATE tbl_servicos
                        SET
                            nome=?,
                            descricao=?,
                            categoria=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?;`

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
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
        const rows: any = await db.execute < ServiceDBType & RowDataPacket[]>(
        `DELETE FROM tbl_servicos WHERE id =?`,
        [id]
        )
        return rows[0].affectedRows === 0 ? null : rows[0] as ServiceDBType
    } catch (error) {
        console.log(error)
        return null
    }
    },

    async getAllServicoDetalhado(limit:number, offset: number): Promise<ServicoDetalhadoType[] | null> {
        try{
            const query = `
            SELECT DISTINCT
                    s.id as id_servico,
                    s.nome as servico_nome,
                    s.descricao,
                    c.designacao as designacao_categoria,
                    c.icone as icone_categoria,
                    e.id as id_empresa,
                    e.designacao as designacao_empresa,
                    e.icone as icone_empresa,
                    s.enabled
                FROM tbl_servicos s
                INNER JOIN tbl_categoria c ON c.id = s.id_categoria
                INNER JOIN tbl_prestacao_servico ps ON s.id = ps.id_servico
                INNER JOIN tbl_empresa e ON E.id = s.id_empresa
                WHERE s.enabled = true
                LIMIT ? OFFSET ?
                `
                const values =[limit, offset]

                const [rows] = await db.execute<ServicoDetalhadoType[] & RowDataPacket[]>(query, values)
                return Array .isArray(rows) && rows.length > 0 ? rows as ServicoDetalhadoType[] : null
        }catch (erro){
            console.log(erro)
            return null
        }
    }


}