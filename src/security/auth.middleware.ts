import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { json } from "node:stream/consumers"

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({ message: " Utilizador nao autorizado "})
    }

    const token = authHeader.split(" ")[1]
    // Baer token aqui

    try{
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string)
        next()
    }catch(error){
        return res.status(401).json({ message: "Token invalido" })
    }
}




req: {
    headrs: {
        authorizathion: " brearer token aqui"
        }


        const nome = "thiago gomes"
        nome.split(" ")
}

