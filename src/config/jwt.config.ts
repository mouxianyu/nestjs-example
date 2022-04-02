import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'secretKey',
    ttl: process.env.JWT_TTL || '1h'
}))
