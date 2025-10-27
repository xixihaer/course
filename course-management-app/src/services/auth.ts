import { post } from '../utils/request'
import { LoginRequest, LoginResponse } from '../types'

export const login = (data: LoginRequest): Promise<LoginResponse> =>
  post('/auth/login', data)

export const logout = (): Promise<void> =>
  post('/auth/logout')