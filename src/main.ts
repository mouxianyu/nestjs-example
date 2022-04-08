import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { CustomValidationPipe } from './pipes/custom-validation.pipe'
import { internalPrefix } from './utils/router.util'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get<ConfigService>(ConfigService)

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: internalPrefix(),
        prefix: false
    })

    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
        new CustomValidationPipe()
    )

    const port = configService.get<number>('http.port')
    await app.listen(port)
}
bootstrap()
