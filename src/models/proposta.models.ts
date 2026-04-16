
import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PropostaDBType } from "../utils/types.js";

export const PropostaModel = {
    async create(newProposta: PropostaDBType): Promise<PropostaDBType | null> {
        try {
            const [rows] = await db.execute<PropostaDBType & RowDataPacket[]>(
            `INSERT INTO tbl_proposta 
            VALUES (?,?,?,?,?,?,?,?)`,

            [
                null,
                newProposta.id_prestacao_servico,
                newProposta.preco_hora,
                newProposta.horas_estimadas,
                newProposta.estado,
                newProposta.enabled,
                new Date(),
                new Date()
            ]
        )
        return rows as PropostaDBType
        }
        catch (erro) {
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

    async get (id: string): Promise<PropostaDBType | null>{
        try{
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * DISNTING
                pt.*,
                pr.id as owner
            FROM tbl_proposta pt
            INNER JOIN tbl_prestador pr ON pt.id_prestador = pr.id
            INNER JOIN tbl_utilizadores u ON pr.id_utilizador = u.id
                WHERE tbl_propostas.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0]! : null

        }catch (err){
            console.log(err)
            return null
        }
    },

    async update(id: string, propostaAtualizado: PropostaDBType) {
        try {
            const query = `UPDATE tbl_proposta
                        SET
                            id=?,
                            id_prestacao_servico=?,
                            preco_hora=?,
                            horas_estimadas=?,
                            estado=?,
                            enabled=?,
                            updated_at=?`

            const values = [
                propostaAtualizado.id,
                propostaAtualizado.id_prestacao_servico,
                propostaAtualizado.preco_hora,
                propostaAtualizado.horas_estimadas,
                propostaAtualizado.estado,
                propostaAtualizado.enabled,
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
    async PropostaAceita(id: string, estado: string) {
        try {
            const [rows] = await db.execute (
                `UPDATE tbl_proposta
                        SET
                            estado="Regeitada",
                            updated_at=?`,
                            [
                new Date()
                
            ])
            const [rowsAceitada]: any = await db.execute (
                `UPDATE tbl_proposta
                        SET
                            estado="Aceitada",
                            updated_at=?
                            tbl_proposta.id_prestacao_servico.estado =?
                        WHERE id=?`,
                            [new Date(), id])


            return rowsAceitada[0].affectedRows === 1
        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getByPrestacaoServico(idPresatacaoServico: string): Promise<PropostaDBType[] | null> {
        try {
            const [rows] = await db.execute<PropostaDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_propostas
                WHERE tbl_propostas.id_prestacao_servico = ?`,

                [idPresatacaoServico]
            )

            if (Array.isArray(rows )&& rows.length === 0) return null
            return Array.isArray(rows) ? rows : null
        }catch (err){
            console.log(err)
            return null
        }
    },


    
    async delete(id: string) {
        try {
        const query = `DELETE FROM tbl_proposta WHERE id =?`

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