import { IsEmail, IsNotEmpty, Matches, IsArray, IsString, IsOptional } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @Matches(/^[a-z][a-z0-9_]{3,30}$/, {
        message:
            'The account must contain only lowercase letters, numbers, and hyphens/underscores; The first character should be lowercase letters; 4-30 characters'
    })
    @IsNotEmpty()
    readonly account: string

    @IsString()
    @IsEmail({}, { message: 'Invalid email address' })
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @Matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,30})\S$/, {
        message:
            'The password must contain at least uppercase letters and lowercase letters and digits; 6-30 characters'
    })
    @IsNotEmpty()
    readonly password: string

    @IsOptional()
    @IsArray({ message: 'Auth must be array' })
    @IsString({ each: true, message: 'Auth must be string array' })
    readonly auth: Array<string> = []
}
