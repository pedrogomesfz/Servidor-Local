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

export function isOwner(model: any, field:string){
    return async (req: Request, res:Response, next: NextFunction)=>{
        
        const userId = req.user?.id

        const { id } = req.params

        const entity = await model.get(id as string)

        if (!entity){
            return res.status(404).json({ message: "Entidade nao encontrada" })
        }

        if (!userId){
            return res.status(401).json({ message: "Utilizador nao autorizado" })
        }

        if (entity[field] !== userId){
            return res.status(403).json({ message: "Permissao insuficiente" })
        }

        next()
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
//me esplica a função acima authrize

//A função `authrize` é um middleware de autorização para o Express.js. Ela é usada para restringir o acesso a determinadas rotas com base no papel (role) do usuário autenticado.
//Aqui está uma explicação detalhada de como a função `authrize` funciona:
//1. A função `authrize` recebe um array de strings chamado `roles`, que representa os papéis permitidos para acessar a rota.
//2. Ela retorna uma função middleware que recebe os objetos `req`, `res` e `next` do Express.
//3. Dentro do middleware, a função verifica se o objeto `req.user` existe. Este objeto é geralmente definido pelo middleware de autenticação (como o `AuthMiddleware`) e contém informações sobre o usuário autenticado.
//4. Se `req.user` não existir, isso significa que o usuário não está autenticado, e a função retorna uma resposta com status 401 (Não Autorizado) e uma mensagem indicando que o usuário não está autorizado.
//5. Se `req.user` existir, a função verifica se o papel do usuário (`req.user.role`) está incluído no array de papéis permitidos (`roles`). Se o papel do usuário não estiver na lista, a função retorna uma resposta com status 403 (Proibido) e uma mensagem indicando que a permissão é insuficiente.
//6. Se o papel do usuário estiver na lista de papéis permitidos, a função chama `next()`, permitindo que a requisição prossiga para o próximo middleware ou para


// req: {
//     headrs: {
//         authorizathion: " brearer token aqui"
//         }


//         const nome = "thiago gomes"
//         nome.split(" ")
// }

