import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator'
import { BaseQueryDto } from 'src/dto/base-query.dto'
import { QueryOption } from 'src/decorators/property'
import { QueryType } from 'src/enums/query-type'
export class QueryUserDto extends BaseQueryDto {
    @QueryOption({ type: QueryType.Like })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly name: string

    @QueryOption({ type: QueryType.Like })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly account: string

    @QueryOption({ type: QueryType.Like })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly email: string

    @IsOptional()
    @IsInt()
    readonly status: number
}
