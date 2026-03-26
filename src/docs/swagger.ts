import path from 'node:path'
import swaggerJsdoc from 'swagger-jsdoc'  

const options: swaggerJsdoc.Options={
    definition:{
        openapi: '3.0.0',
        info: {
            title:" API servidor local",
            description: "Plataforma de gestão de Prestador e servidores",
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'dev',
            }
        ]
},
        apis: [
        path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
        path.join(process.cwd(), "./src/docs/paths/*.yaml"),
    ]
    }

    

export const swaggerSpec = swaggerJsdoc(options);
