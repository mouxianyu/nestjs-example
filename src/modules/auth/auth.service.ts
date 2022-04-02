import { Injectable } from '@nestjs/common'
import { UsersService } from './../user/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/schemas/users.schema'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(account: string, password: string): Promise<unknown> {
        const user = await this.usersService.getByAccountOrEmail(account, true)
        if (user && user.checkPassword(password)) {
            return user
        }
        return null
    }

    async login(user: User) {
        const payload = { account: user.account, sub: user.id }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
