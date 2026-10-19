import commonAPI from "./commonAPI";
import { server_url } from "./server_url";

//registerAPI

export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/register`, reqBody);
};

//loginAPI

export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/login`, reqBody);
};

//googleloginAPI

export const googleloginAPI = async (reqBody) => {
  return await commonAPI("POST", `${server_url}/google-login`, reqBody);
};
//addBookAPI
export const addBookAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${server_url}/user/add-book`,
    reqBody,
    reqHeader,
  );
};
//getHomeBooksAPI
export const getHomeBooksAPI = async () => {
  return await commonAPI("GET", `${server_url}/home-books`, {});
};
//getAllBooksAPI
export const getAllBooksAPI = async (reqHeader,searchKey) => {
  return await commonAPI("GET", `${server_url}/all-books?search=${searchKey}`, {}, reqHeader);
};
//getUserProfileBooksAPI
export const getUserProfileBooksAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user-books`, {}, reqHeader);
};
//getUserPurchasedAPI
export const getUserPurchasedAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user-books/buy`, {}, reqHeader);
};
//viewBookAPI
export const viewBookAPI = async (id,reqHeader) => {
  return await commonAPI("GET", `${server_url}/view/${id}`, {}, reqHeader);
};
//editUserAPI

export const editUserAPI = async (id,reqBody,reqHeader) => {
  return await commonAPI("PUT", `${server_url}/user/${id}/edit`,reqBody, reqHeader);
};

//admin-getAllBooksAPI
export const getAllAdminBooksAPI=async(reqHeader)=>{
  return await commonAPI("GET",`${server_url}/admin/all-books`,{},reqHeader)
}

//admin-getAllUsersAPI
export const getAllAdminUsersAPI=async(reqHeader)=>{
  return await commonAPI("GET",`${server_url}/admin/all-users`,{},reqHeader)
}

//getUpdateBookStatusAPI
export const getUpdateBookStatusAPI=async(id,reqHeader)=>{
  return await commonAPI("PUT",`${server_url}/admin/${id}/update`,{},reqHeader)
}

//removeBooksAPI

export const removeBooksAPI = async (id,reqHeader) => {
  return await commonAPI("DELETE", `${server_url}/user/${id}/delete`,{}, reqHeader);
};

//makePaymentAPI
export const makePaymentAPI = async (id,reqHeader) => {
  return await commonAPI("PUT", `${server_url}/user/${id}/buy`,{}, reqHeader);
};