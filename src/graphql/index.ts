import { typeDefs } from './typedefs/typedefs.js';
import { userResolver } from './typedefs/resolvers/users.resolvers.js';


export const resolvers = {
    Query: {
        ...userResolver.Query,
    },
    Mutation:{
        ...userResolver.Mutation
    }

    
}

export { typeDefs }


