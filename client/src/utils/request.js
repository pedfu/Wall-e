const DEFAULT_AUTHORIZATION_KEYWORK = 'Token '
const DEFAULT_AUTHORIZATION_HEADER = 'Authorization'

export const parseConfig = ({ token, ...config } = {}) => {
    const newConfig = { headers: {}, ...config }

    if (token) {
        newConfig.headers[DEFAULT_AUTHORIZATION_HEADER] = `${DEFAULT_AUTHORIZATION_KEYWORK}${token}`
    }

    return newConfig
}