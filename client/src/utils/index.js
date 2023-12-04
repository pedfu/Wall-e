import { surpriseMePrompts } from '../constants'

export const generateRandom = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    return surpriseMePrompts[randomIndex]
}

export const containsNumbers = (value) => {
    return /\d/.test(value)
}

export const containsSpecialCharacters = (value) => {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)
}