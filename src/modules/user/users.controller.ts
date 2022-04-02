import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ResponseDto } from 'src/dto/response.dto'
import { QueryUserDto } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ObjectId } from 'mongoose'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findByPage(@Query() queryUserDto: QueryUserDto): Promise<ResponseDto<unknown>> {
        const data = await this.usersService.findByPage(queryUserDto)
        return ResponseDto.success(data)
    }

    @Get(':id')
    async getById(@Param('id') id): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.getById(id)
        return ResponseDto.success(user)
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.create(createUserDto)
        return ResponseDto.success(user)
    }

    @Put(':id')
    async updateById(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.updateById(id, updateUserDto)
        return ResponseDto.success(user)
    }

    @Delete(':id')
    async deleteById(@Param('id') id): Promise<ResponseDto<unknown>> {
        const user = await this.usersService.deleteById(id)
        return ResponseDto.success(user)
    }
}
