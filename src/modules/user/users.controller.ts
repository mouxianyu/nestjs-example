import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseDto } from 'src/dto/response.dto'
import { omit } from 'lodash'
import { QueryUserDto } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AtLeastOne } from 'src/decorators/parameter/at-least-one.decorator'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findByPage(@Query() queryUserDto: QueryUserDto): Promise<ResponseDto<unknown>> {
        const data = await this.usersService.findByPage(queryUserDto)
        return ResponseDto.success(data)
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.create(createUserDto)
        return ResponseDto.success(omit(user.toJSON(), 'password'))
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.updateById(id, updateUserDto)
        return ResponseDto.success(user)
    }
}
