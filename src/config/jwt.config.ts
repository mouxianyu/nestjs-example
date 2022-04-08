import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'secretKey',
    secretExpires: process.env.JWT_EXPIRES || '1h'
}))
