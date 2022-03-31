import { registerAs } from '@nestjs/config'

export default registerAs('http', () => ({
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) || 3000
}))
