import { Mongoose } from 'mongoose'
import { UserSchema } from './schemas/users.schema'

const modelName = 'User'

export const userProviders = [
    {
        provide: `${modelName.toUpperCase()}_MODEL`,
        useFactory: (mongoose: Mongoose) => mongoose.model(modelName, UserSchema, `t_${modelName.toLowerCase()}`),
        inject: ['DATABASE_CONNECTION']
    }
]
