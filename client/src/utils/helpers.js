import humps from 'humps'

export const createFormData = (data, isCamelized = false) => {
    const formData = new FormData()

    Object.keys(data).forEach(field => {
        const fieldValue = data[field]

        // append file
        if (fieldValue && typeof fieldValue == 'object' && fieldValue.length > 0 && fieldValue[0].file) {
            fieldValue.forEach(item => {
                formData.append(isCamelized ? field : humps.decamelize(field), item.file)
            })
        } else {
            const formDataValue = (() => {
                if (!fieldValue) return ''

                if (fieldValue instanceof Blob || typeof fieldValue == 'object') {
                    return fieldValue
                }

                return JSON.stringify(fieldValue)
            })()

            formData.append(isCamelized ? field : humps.decamelizeKeys(field), formDataValue)
        }
    }) 

    return formData
}