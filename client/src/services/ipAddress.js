import axios from "axios"
import { get } from "./request"

export const getIpAddress = async () => {
    return await axios('https://api.ipify.org/?format=json')
    // return get('https://api.ipify.org/?format=json')
}