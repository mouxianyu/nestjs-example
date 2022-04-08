export const VERSION_PREFIX = process.env.VERSION_PREFIX || 'v'
export const VERSION = parseInt(process.env.VERSION) || 1
export const INTERNAL_URI_PREFIX = process.env.INTERNAL_URI_PREFIX || 'api'
export const EXTERNAL_URI_PREFIX = process.env.EXTERNAL_URI_PREFIX || 'web'

export const internalPrefix = (version = VERSION) => {
    return `${INTERNAL_URI_PREFIX}/${VERSION_PREFIX}${version}`
}

export const externalPrefix = (version = VERSION) => {
    return `${EXTERNAL_URI_PREFIX}/${VERSION_PREFIX}${version}`
}
