import { Module } from '@nestjs/common'
import { UsersModule } from '../user/users.module'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: { expiresIn: configService.get('jwt.ttl') }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
    exports: [AuthService]
})
export class AuthModule {}
