import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP')

    use(req: Request, res: Response, next: NextFunction): void {
        const start = Date.now()
        const { ip, method, originalUrl } = req
        res.on('close', () => {
            const spend = Date.now() - start
            const { statusCode } = res
            this.logger.log(`${method} ${statusCode} ${originalUrl} ${spend}ms ${ip}`)
        })
        next()
    }
}
