import { IsEmail, IsNotEmpty, Matches, IsArray, IsString, IsOptional } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @Matches(/^[a-z][a-z0-9_]{3,30}$/, {
        message: '账号只能使用小写字母、数字、下划线，第一个字符为小写字母，长度在4-30个字符'
    })
    @IsNotEmpty()
    readonly account: string

    @IsString()
    @IsEmail({}, { message: '无效的邮件地址' })
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @Matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,30})\S$/, {
        message: '密码至少包含大写字母、小写字母、数字，长度6-30个字符'
    })
    @IsNotEmpty()
    readonly password: string

    @IsOptional()
    @IsArray({ message: '权限格式必须为数组' })
    @IsString({ each: true, message: '权限格式必须为字符串数组' })
    readonly auth: Array<string> = []
}
