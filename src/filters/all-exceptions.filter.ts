import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { Error } from 'mongoose'
import { ResponseDto } from 'src/dto/response.dto'

export enum StatusCode {
    DuplicateKey = 11000
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        if (exception instanceof Error.ValidationError) {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(ResponseDto.error(HttpStatus.BAD_REQUEST, exception.name, exception.message))
        } else if (exception instanceof Error.CastError) {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    ResponseDto.error(
                        HttpStatus.BAD_REQUEST,
                        exception.name,
                        `Invalid Id ${exception.value}`,
                        exception.value
                    )
                )
        } else if (exception.name === 'MongoServerError') {
            response
                .status(HttpStatus.BAD_REQUEST)
                .json(ResponseDto.error(StatusCode.DuplicateKey, exception.name, exception.message, exception.keyValue))
        } else {
            super.catch(exception, host)
        }
    }
}
