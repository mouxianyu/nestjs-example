import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import config from './config'
import { UsersModule } from './modules/user/users.module'
import * as Joi from 'joi'
@Module({
    imports: [
        ConfigModule.forRoot({
            load: config,
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production', 'test', 'local').default('development')
            }),
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
