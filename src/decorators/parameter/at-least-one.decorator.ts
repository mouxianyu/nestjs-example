export const AT_LEAST_ONE_KEY = 'custom:at-least-one'
export function AtLeastOne(message = 'Payload should not be empty'): ClassDecorator {
    return function (target: unknown) {
        Reflect.defineMetadata(AT_LEAST_ONE_KEY, message, target)
    }
}
