type ApiResponse<T> = {
  data: T | null
  message: string
  responseResult: boolean
}

type UserLoginResponse = {
  id_user: number
  nama_lengkap: string
  token?: string
  username: string
}

type BannerAdsPackageRequest = {
  package_name: string
  package_description: string
  package_price: number
  package_duration: number
}

type BannerAdsPackage = {
  id_banner_ads_package: string
  package_name: string
  package_description: string
  package_price: number
  package_duration: number
  package_is_active: boolean
  created_at: string
} 