import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// API Calls
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

export const getHomeBookAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/homeBook`, "", reqHeader)
}

export const getAllBookAPI = (searchKey, reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/allBook?search=${searchKey}`, "", reqHeader)
}

export const getABookAPI = (id, reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/getABook/${id}`, "", reqHeader)
}

// ------------------------------- ADMIN ------------------------------
export const getAdminAllBookAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/admin-allBooks`, "", reqHeader)
}

export const adminApprovedBookAPI = (reqBody, reqHeader) => {
    return commonAPI('PUT', `${serverURL}/api/admin-approvedBook`, reqBody, reqHeader)
}

export const getAllUsersAdminAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/admin-getallusers`, "", reqHeader)
}

//-------------------------------Job-----------------------------------
export const uploadJobAPI = (reqBody, reqHeader) => {
    return commonAPI('POST', `${serverURL}/api/admin-addJobs`, reqBody, reqHeader)
}

export const getAdminAllJobsAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/admin-allJobs`, "", reqHeader)
}

export const deleteAdminAJobsAPI = (id, reqHeader) => {
    return commonAPI('DELETE', `${serverURL}/api/admin-deleteJobs/${id}`, "", {})
}

//---------------------------------AdminProfile-------------------------------
export const updateAdminAPI = (reqBody, reqHeader) => {
    return commonAPI('PUT', `${serverURL}/api/updateAdmin`, reqBody, reqHeader)
}

export const getAdminDetailsAPI = (reqHeader) => {
    return commonAPI('GET', `${serverURL}/api/admin-Details`, "", reqHeader)
}