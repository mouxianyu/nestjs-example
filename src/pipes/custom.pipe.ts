import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class CustomPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata) {
        console.log(value)
        console.log(metadata)
        return value
    }
}
