import { QueryOptions } from './interface/query-options'
export const QUERY_OPTIONS_KEY = 'custom:query-options'
export enum QueryType {
    Equal,
    Like
}
export function QueryOption(queryOptions?: QueryOptions): PropertyDecorator {
    return (target: unknown, propertyKey: string | symbol) => {
        Reflect.defineMetadata(QUERY_OPTIONS_KEY, queryOptions, target, propertyKey)
    }
}
