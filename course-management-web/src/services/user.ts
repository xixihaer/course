import { get, post, put, del } from '@/utils/request'
import { User, PageResult, CreateUserRequest, UpdateUserRequest } from '@/types'

export const getUsers = (params: {
  current?: number
  size?: number
  keyword?: string
}): Promise<PageResult<User>> =>
  get('/users', { params })

export const getUser = (id: number): Promise<User> =>
  get(`/users/${id}`)

export const createUser = (data: CreateUserRequest): Promise<User> =>
  post('/users', data)

export const updateUser = (id: number, data: UpdateUserRequest): Promise<User> =>
  put(`/users/${id}`, data)

export const deleteUser = (id: number): Promise<void> =>
  del(`/users/${id}`)

export const resetPassword = (id: number, newPassword: string): Promise<void> =>
  post(`/users/${id}/reset-password`, null, { params: { newPassword } })

export const changePassword = (id: number, oldPassword: string, newPassword: string): Promise<void> =>
  post(`/users/${id}/change-password`, null, { params: { oldPassword, newPassword } })