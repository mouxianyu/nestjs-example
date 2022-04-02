import { IsEmail, IsNotEmpty, Matches, IsArray, IsString, IsOptional, IsEnum } from 'class-validator'
import { AtLeastOne } from 'src/decorators/parameter'
import { UserStatus } from 'src/enums/user-status'
@AtLeastOne('No data to update')
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly name: string

    @Matches(/^[a-z][a-z0-9_-]{3,30}$/, {
        message:
            'The account must contain only lowercase letters, numbers, and hyphens/underscores; The first character should be lowercase letters; 4-30 characters'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly account: string

    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    readonly email: string

    @IsArray({ message: 'Auth must be array' })
    @IsString({ each: true, message: 'Auth must be string array' })
    @IsOptional()
    readonly auth: Array<string>

    @IsEnum(UserStatus)
    @IsOptional()
    readonly status: UserStatus
}
