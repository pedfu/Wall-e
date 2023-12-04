const DEFAULT_AUTHORIZATION_KEYWORK = 'Bearer '
const DEFAULT_AUTHORIZATION_HEADER = 'Authorization'

export const parseConfig = (token, { ...config } = {}) => {
    const newConfig = { headers: {}, ...config }

    if (token) {
        newConfig.headers[DEFAULT_AUTHORIZATION_HEADER] = `${token}`
    }

    return newConfig
}