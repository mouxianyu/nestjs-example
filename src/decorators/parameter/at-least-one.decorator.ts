import { MetadataKey } from 'src/enums/metadata-key'

export function AtLeastOne(message = 'Payload should not be empty'): ClassDecorator {
    return function (target: unknown) {
        Reflect.defineMetadata(MetadataKey.AtLeastOne, message, target)
    }
}
