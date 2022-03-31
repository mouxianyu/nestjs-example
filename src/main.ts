import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { CustomValidationPipe } from './pipes/custom-validation.pipe'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
        new CustomValidationPipe()
    )

    const configService = app.get<ConfigService>(ConfigService)
    const port = configService.get<number>('http.port')
    await app.listen(port)
}
bootstrap()
