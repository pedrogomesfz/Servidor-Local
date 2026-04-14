import { de } from "date-fns/locale"
import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { json } from "node:stream/consumers"


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string
            }
        }
        
    }
}






export default function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({ message: " Utilizador nao autorizado "})
    }

    const token = authHeader.split(" ")[1]
    // Baer token aqui

    try{
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as { id: string, email: string, role: string }
        req.user = {
            id: decodedToken?.id as string,
            email: decodedToken.email as string,
            role: decodedToken.role as string
        }
        next()
    }catch(error){
        return res.status(401).json({ message: "Token invalido" })
    }
}
export function authrize(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Utilizador nao autorizado" })
        }
        if (!roles.includes(req.user.role)){
            return res.status(403).json({message: "Permissao insuficiente"})
        }
        next()
    }
}



// req: {
//     headrs: {
//         authorizathion: " brearer token aqui"
//         }


//         const nome = "thiago gomes"
//         nome.split(" ")
// }

