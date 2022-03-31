import { ConfigService } from '@nestjs/config'
import * as mongoose from 'mongoose'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
            try {
                const { host, port, name, user, password } = configService.get('database')
                const DB_URL = user
                    ? `mongodb://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}?authSource=admin`
                    : `mongodb://${host}:${port}/${name}`
                return await mongoose.connect(DB_URL)
            } catch (error) {
                throw error
            }
        },
        inject: [ConfigService]
    }
]
