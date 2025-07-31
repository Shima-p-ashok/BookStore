import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"


//API Call
export const registerAPI = (reqBody) => {
        return commonAPI('POST', `${serverURL}/api/register`, reqBody, {})
}

export const loginAPI = (reqBody) => {
        return commonAPI('POST', `${serverURL}/api/login`, reqBody, {})
}

export const GoogleLoginAPI = (reqBody) => {
        return commonAPI('POST', `${serverURL}/api/google-login`, reqBody, {})
}

export const uploadBookAPI = (reqBody, reqHeader) => {
        return commonAPI('POST', `${serverURL}/api/addBook`, reqBody, reqHeader)
}

export const getHomeBookAPI = (reqBody, reqHeader) => {
        return commonAPI('GET', `${serverURL}/api/homeBook`)
}

export const getAllBookAPI = (reqHeader) => {
        return commonAPI('GET', `${serverURL}/api/allBook`, "", reqHeader)
}

export const getABookAPI = (reqHeader) => {
        return commonAPI('GET', `${serverURL}/api/getABook/:id`, "", reqHeader)
}


