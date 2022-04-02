import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard'
import { AuthService } from './modules/auth/auth.service'
import { ResponseDto } from './dto/response.dto'
import { SkipAuth } from './decorators/skip-auth.decorator'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @SkipAuth()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req): Promise<ResponseDto<unknown>> {
        const data = await this.authService.login(req.user)
        return ResponseDto.success(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<ResponseDto<unknown>> {
        return ResponseDto.success(req.user)
    }
}
