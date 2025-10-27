import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import { ApiResponse } from '../types'

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8080/api'

const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

request.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, data } = response.data
    
    if (code === 200) {
      return { ...response, data }
    } else {
      return Promise.reject(new Error(response.data.message || '请求失败'))
    }
  },
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token')
      await SecureStore.deleteItemAsync('user')
      // You might want to navigate to login screen here
    }
    return Promise.reject(error)
  }
)

export default request

export const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  request.get(url, config)

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  request.post(url, data, config)

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  request.put(url, data, config)

export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  request.delete(url, config)