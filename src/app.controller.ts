import { Body, Controller, Get, Post, Put, Request, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './modules/auth/auth.service'
import { ResponseDto } from './dto/response.dto'
import { SkipAuth } from './decorators/skip-auth.decorator'
import { LoginDto } from './modules/auth/dto/login.dto'
import { RefreshTokenDto } from './modules/auth/dto/refresh-token.dto'
@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

    @Version(VERSION_NEUTRAL)
    @SkipAuth()
    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @SkipAuth()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<unknown>> {
        const data = await this.authService.login(loginDto)
        return ResponseDto.success(data)
    }

    @SkipAuth()
    @Put('token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<ResponseDto<unknown>> {
        const data = await this.authService.createAccessTokenByRefreshToken(refreshTokenDto)
        return ResponseDto.success(data)
    }

    @Get('profile')
    async getProfile(@Request() req): Promise<ResponseDto<unknown>> {
        return ResponseDto.success(req.user)
    }

    @SkipAuth()
    @Get('routes')
    async getRoutes(): Promise<ResponseDto<unknown>> {
        return ResponseDto.success({ info: [] })
    }
}
