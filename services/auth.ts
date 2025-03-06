import { API_LOGIN_URL } from "@/constant/routes";
import axios, { AxiosResponse } from "axios";
import { deleteCookie } from "cookies-next";

export default async function login(username: string, password: string): Promise<ApiResponse<UserLoginResponse>>{
  const res = await axios.post(API_LOGIN_URL, { username, password }) as AxiosResponse<ApiResponse<UserLoginResponse>>
  return res.data
}

export async function logout() {
  localStorage.removeItem('user')
  await deleteCookie('token')
}