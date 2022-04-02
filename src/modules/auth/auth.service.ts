import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './../user/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/schemas/users.schema'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.usersService.getByAccountOrEmail(loginDto.account, true)
        if (user && (await user.checkPassword(loginDto.password))) {
            return user
        }
        throw new BadRequestException('The account or password is incorrect')
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto)
        if (user) {
            const payload = { account: user.account, sub: user.id }
            return {
                accessToken: this.jwtService.sign(payload)
            }
        }
    }
}
