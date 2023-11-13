import axios from 'axios'
import { parseConfig } from '../utils/request'
import cookies from 'react-cookies'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
})

export const handleResponseError = error => new Promise((resolve, reject) => (error?.response?.data ? reject(error.response.data) : reject()))

// const decamelizePayload = data => data instanceof FormData ? createFormData(data, false) : humps.decamelizeKeys(data)

// const parsePayload = ({
//     data,
//     transformPayload,
//     transformOnlyRequest,
//     transformOnlyResponse,
//     transformFormData,
// }) => {
//     const shouldTransformData = (transformPayload || transformOnlyRequest) && !transformOnlyResponse
//     if (transformFormData) {
//        return createFormData(data, shouldTransformData)
//     }
//     return shouldTransformData ? decamelizePayload(data) : data
// }

const parseParams = (url, config, data, baseURL = null) => method => {
    const {
        // transformPayload = true,
        // transformOnlyRequest,
        // transformOnlyResponse,
        // transformFormData = false,
        ...configParams
    } = config

    const token = cookies.load('token')

    const payloadMethodsRequired = ['put', 'post', 'patch']
    const axiosConfig = {
        ...(baseURL && { baseURL }), // custom baseURL
        method,
        url,
        ...parseConfig(token, configParams), // key and authorization header
        ...(payloadMethodsRequired.includes(method) && {
            data
        })
    }
    
    return instance(axiosConfig).catch(handleResponseError)
}

export const post = (...params) => parseParams(...params)('post')
export const patch = (...params) => parseParams(...params)('patch')
export const put = (...params) => parseParams(...params)('put')
export const del = (...params) => parseParams(...params)('delete')
export const get = (...params) => parseParams(...params)('get')
export const upload = (...params) => parseParams(...params)('upload')