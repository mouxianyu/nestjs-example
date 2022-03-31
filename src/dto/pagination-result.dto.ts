export class PaginationResultDto<T> {
    readonly list: T[]
    readonly totalCount: number

    constructor(list: T[], totalCount: number) {
        this.list = list
        this.totalCount = totalCount
    }
}
