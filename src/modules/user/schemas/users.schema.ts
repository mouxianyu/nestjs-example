import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { promisify } from 'util'

const SALT_ROUNDS = 10
export type UserDocument = User & Document

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
    @Prop({
        default: function () {
            return this.account
        }
    })
    name: string

    @Prop({ required: true, unique: true, index: true, match: /^[a-z][a-z0-9_-]{3,30}$/ })
    account: string

    @Prop({
        index: true,
        unique: true,
        required: true,
        match: /^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/
    })
    email: string

    @Prop({ required: true, select: false })
    password: string

    @Prop()
    auth: Array<string>

    @Prop({ required: true, default: 1 })
    status: number
}
const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
    virtuals: true,
    transform(doc: any, ret: any): any {
        delete ret.password
    }
})

UserSchema.pre<User>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    next()
})

UserSchema.pre<User>('updateOne', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    }
    next()
})

UserSchema.methods.checkPassword = async function (password: string) {
    return promisify(bcrypt.compare)(password, this.password)
}
export { UserSchema }
