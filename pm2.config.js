module.exports = {
    apps: [
        {
            name: 'iot-api',
            script: './dist/main.js',
            log_date_format: 'YYYY/MM/DD HH:mm Z',
            out_file: './logs/iot-api-access.log',
            error_file: './logs/iot-api-error.log',
            max_restarts: 1,
            env_production: {
                NODE_ENV: 'production'
            },
            env_development: {
                NODE_ENV: 'development'
            },
            env_local: {
                NODE_ENV: 'local'
            }
        }
    ]
}
