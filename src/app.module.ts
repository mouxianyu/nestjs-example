import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import config from './config'
import { UsersModule } from './modules/user/users.module'
import { AuthModule } from './modules/auth/auth.module'
import * as Joi from 'joi'
import { LoggerMiddleware } from './middlewares/logger-middleware'
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
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
