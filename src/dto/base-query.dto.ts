import { IsOptional, IsInt, IsPositive } from 'class-validator'
import { pullAll } from 'lodash'
import { MetadataKey } from 'src/enums/metadata-key'
import { QueryType } from 'src/enums/query-type'
export class BaseQueryDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    readonly pageSize: number = 20

    @IsOptional()
    @IsInt()
    @IsPositive()
    readonly currentPage: number = 1

    getQueryOptions(): Record<string, unknown> {
        const result: Record<string, unknown> = {}
        const properties = pullAll(Object.getOwnPropertyNames(this), ['pageSize', 'currentPage'])
        for (const propertyName of properties) {
            const queryOptions = Reflect.getMetadata(MetadataKey.QueryOptions, this, propertyName)
            if (queryOptions && queryOptions.type) {
                switch (queryOptions.type) {
                    case QueryType.Like:
                        result[propertyName] = { $regex: this[propertyName], $options: 'i' }
                        break
                    default:
                        result[propertyName] = this[propertyName]
                        break
                }
            } else {
                result[propertyName] = this[propertyName]
            }
        }
        return result
    }
}
