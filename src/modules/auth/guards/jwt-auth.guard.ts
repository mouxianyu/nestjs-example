import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { SKIP_AUTH_KEY } from 'src/decorators/skip-auth.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        return skipAuth ? true : super.canActivate(context)
    }
}
