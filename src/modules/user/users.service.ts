import { Model } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './interfaces/users.interface'
import { QueryUserDto } from './dto/query-user.dto'
import { PaginationResultDto } from 'src/dto/pagination-result.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findByPage(queryUserDto: QueryUserDto): Promise<PaginationResultDto<User>> {
        const { currentPage, pageSize } = queryUserDto
        const queryOptions = queryUserDto.getQueryOptions()
        const list: Array<User> = await this.userModel
            .find(queryOptions)
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
            .sort({ _id: -1 })
            .exec()
        const totalCount: number = await this.userModel.find(queryOptions).countDocuments().exec()
        return new PaginationResultDto(list, totalCount)
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto)
    }

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<unknown> {
        return this.userModel.updateOne({ _id: id }, updateUserDto)
    }
}
