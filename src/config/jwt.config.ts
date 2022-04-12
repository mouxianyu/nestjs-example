import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'secretKey',
    secretExpires: process.env.JWT_EXPIRES || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshkey',
    refreshSecretExpires: process.env.JWT_REFRESH_EXPIRES || '30d'
}))
