import { IsEmail, IsNotEmpty, Matches, IsArray, IsString, IsOptional, IsEnum } from 'class-validator'
import { AtLeastOne } from 'src/decorators/parameter'
import { UserStatus } from 'src/enums/user-status'
@AtLeastOne('没有数据更新')
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly name: string

    @Matches(/^[a-z][a-z0-9_]{3,30}$/, {
        message: '账号只能使用小写字母、数字、下划线，第一个字符为小写字母，长度在4-30个字符'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly account: string

    @IsEmail({}, { message: '无效的邮件地址' })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    readonly email: string

    @IsArray({ message: '权限格式必须为数组' })
    @IsString({ each: true, message: '权限格式必须为字符串数组' })
    @IsOptional()
    readonly auth: Array<string>

    @IsEnum(UserStatus)
    @IsOptional()
    readonly status: UserStatus
}
