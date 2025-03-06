import { API_BANNER_ADS_PACKAGE } from "@/constant/routes";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

export async function getPackagesList(){
  const token = await getCookie('token')
  const res = await axios.get(API_BANNER_ADS_PACKAGE + '/List', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) as AxiosResponse<ApiResponse<BannerAdsPackage[]>>
  return res.data
}

export async function getPackages(id: string){
  const token = await getCookie('token')
  const res = await axios.get(`${API_BANNER_ADS_PACKAGE}/Detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) as AxiosResponse<ApiResponse<BannerAdsPackage>>
  return res.data
}

export async function addPackage(req: BannerAdsPackageRequest){
  const token = await getCookie('token')
  const res = await axios.post(API_BANNER_ADS_PACKAGE + '/Insert', req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) as AxiosResponse<ApiResponse<BannerAdsPackage>>
  return res.data
}

export async function editPackage(id: string, req: BannerAdsPackageRequest){
  const token = await getCookie('token')
  const res = await axios.put(`${API_BANNER_ADS_PACKAGE}/Update/${id}`, req, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) as AxiosResponse<ApiResponse<BannerAdsPackage>>
  return res.data
}

export async function deletePackage(id: string){
  const token = await getCookie('token')
  const res = await axios.delete(`${API_BANNER_ADS_PACKAGE}/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }) as AxiosResponse<ApiResponse<BannerAdsPackage>>
  return res.data
}