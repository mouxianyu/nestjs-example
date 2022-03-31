import { MetadataKey } from 'src/enums/metadata-key'
import { QueryOptions } from './interface/query-options'
export function QueryOption(queryOptions?: QueryOptions): PropertyDecorator {
    return (target: unknown, propertyKey: string | symbol) => {
        Reflect.defineMetadata(MetadataKey.QueryOptions, queryOptions, target, propertyKey)
    }
}
