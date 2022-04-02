import { Document } from 'mongoose'

export interface User extends Document {
    readonly name: string
    readonly account: string
    readonly email: string
    readonly password: string
    readonly auth: Array<string>
    readonly status: number
    readonly createdAt: Date
    readonly updatedAt: Date
    checkPassword: (password: string) => Promise<boolean>
}
