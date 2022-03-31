import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { Error } from 'mongoose'
import { ResponseDto } from 'src/dto/response.dto'
import { StatusCode } from 'src/enums/status-code'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        if (exception instanceof Error.ValidationError) {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(ResponseDto.error(HttpStatus.BAD_REQUEST, exception.name, exception.message))
        } else if (exception.name === 'MongoServerError') {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(ResponseDto.error(StatusCode.DuplicateKey, exception.name, exception.message, exception.keyValue))
        } else {
            super.catch(exception, host)
        }
    }
}
