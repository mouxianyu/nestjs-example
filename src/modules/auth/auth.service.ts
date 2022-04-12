import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './../user/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/schemas/users.schema'
import { LoginDto } from './dto/login.dto'
import { ConfigService } from '@nestjs/config'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.usersService.getByAccountOrEmail(loginDto.account, true)
        if (user && (await user.checkPassword(loginDto.password))) {
            return user
        }
        throw new BadRequestException('The account or password is incorrect')
    }

    async createRefreshToken(payload): Promise<string> {
        const refreshSecret = this.configService.get('jwt.refreshSecret')
        const refreshExpires = this.configService.get('jwt.refreshSecretExpires')
        return this.jwtService.sign(payload, {
            secret: refreshSecret,
            expiresIn: refreshExpires
        })
    }

    async createAccessTokenByRefreshToken(refreshTokenDto: RefreshTokenDto) {
        const refreshSecret = this.configService.get('jwt.refreshSecret')
        try {
            const payload = this.jwtService.verify(refreshTokenDto.refreshToken, {
                secret: refreshSecret,
                ignoreExpiration: false,
                ignoreNotBefore: false
            })
            return {
                accessToken: this.jwtService.sign({ account: payload.account, sub: payload.sub })
            }
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto)
        if (user) {
            const payload = { account: user.account, sub: user.id }
            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken: await this.createRefreshToken(payload)
            }
        }
    }
}
