export class ResponseDto<T> {
    readonly data?: T
    readonly message?: string
    readonly statusCode?: number
    readonly error?: string

    constructor(init?: Partial<ResponseDto<T>>) {
        Object.assign(this, init)
    }

    public static success<T>(data: T, message?: string) {
        return new ResponseDto<T>({ data: data, message: message })
    }

    public static error<T>(statusCode: number, error: string, message: string, data?: T) {
        return new ResponseDto<T>({
            error: error,
            message: message,
            statusCode: statusCode,
            data: data
        })
    }
}
