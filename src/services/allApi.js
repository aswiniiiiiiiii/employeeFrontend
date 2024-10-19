//define all api calls
import commonAPI from "./commonAPI"
import server_URL from "./serverUrl"

//UploadEmployeeDetailsAPI - called by add component
export const UploadEmployeeDetailsAPI = async(employee)=>{
   return await commonAPI("POSt",`${server_URL}/employee`,employee)
}

//getAllEmployeeAPI - called by home component
export const getAllEmployeeAPI = async()=>{
    return await commonAPI("GET",`${server_URL}/employee`,"") // if there is no body,we can pass it either  "" or {}
 }

 //deleteEmployeAPI - called by home component
 export const deleteEmployeAPI = async(id)=>{
    return await commonAPI("DELETE",`${server_URL}/employee/${id}`,{}) // in deletion case, body always {}
 }

 //updateEmployeeAPI - called by home component
 export const updateEmployeeAPI = async(id,employe)=>{
    return await commonAPI("PUT",`${server_URL}/employee/${id}`,employe)
 }
 