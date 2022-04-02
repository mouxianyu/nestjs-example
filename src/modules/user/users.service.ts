import { Model, ObjectId } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { isEmail } from 'class-validator'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './interfaces/users.interface'
import { QueryUserDto } from './dto/query-user.dto'
import { PaginationResultDto } from 'src/dto/pagination-result.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

    async getById(id: ObjectId): Promise<User> {
        return this.userModel.findById(id).exec()
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

    async getByAccountOrEmail(val: string, selectPwd = false): Promise<User> {
        const keys = Object.keys(this.userModel.schema.paths).join(' ')
        const queryObj = isEmail(val) ? { email: val } : { account: val }
        if (selectPwd) {
            return this.userModel.findOne(queryObj).select(keys).exec()
        }
        return this.userModel.findOne(queryObj).exec()
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto)
    }

    async updateById(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { returnDocument: 'after' }).exec()
    }

    async deleteById(id: ObjectId): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec()
    }
}
