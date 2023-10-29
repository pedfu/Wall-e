const DEFAULT_AUTHORIZATION_KEYWORK = 'Token '
const DEFAULT_AUTHORIZATION_HEADER = 'Authorization'

export const parseConfig = ({ key, ...config } = {}) => {
    const newConfig = { headers: {}, ...config }

    if (key) {
        newConfig.headers[DEFAULT_AUTHORIZATION_HEADER] = `${DEFAULT_AUTHORIZATION_KEYWORK}${key}`
    }

    return newConfig
}