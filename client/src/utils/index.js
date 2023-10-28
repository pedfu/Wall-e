import { surpriseMePrompts } from '../constants'

export const generateRandom = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    return surpriseMePrompts[randomIndex]
}