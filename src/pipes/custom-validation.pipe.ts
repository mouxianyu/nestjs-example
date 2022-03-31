import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { MetadataKey } from 'src/enums/metadata-key'

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(payload: unknown, metadata: ArgumentMetadata): unknown {
        const metatype = metadata.metatype
        const atLeastOne = Reflect.hasOwnMetadata(MetadataKey.AtLeastOne, metatype)
        if (atLeastOne && !Object.keys(payload).length) {
            const message = Reflect.getMetadata(MetadataKey.AtLeastOne, metatype)
            throw new BadRequestException(message)
        }
        return payload
    }
}
