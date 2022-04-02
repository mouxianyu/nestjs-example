import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { AT_LEAST_ONE_KEY } from 'src/decorators/parameter'
@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(payload: unknown, metadata: ArgumentMetadata): unknown {
        const metatype = metadata.metatype
        const atLeastOne = Reflect.hasOwnMetadata(AT_LEAST_ONE_KEY, metatype)
        if (atLeastOne && !Object.keys(payload).length) {
            const message = Reflect.getMetadata(AT_LEAST_ONE_KEY, metatype)
            throw new BadRequestException(message)
        }
        return payload
    }
}
