import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'
import { User } from '../types'

interface AuthState {
  token: string | null
  user: User | null
  isLoading: boolean
  setAuth: (token: string, user: User) => Promise<void>
  clearAuth: () => Promise<void>
  initAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoading: true,

  setAuth: async (token: string, user: User) => {
    await SecureStore.setItemAsync('token', token)
    await SecureStore.setItemAsync('user', JSON.stringify(user))
    set({ token, user })
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync('token')
    await SecureStore.deleteItemAsync('user')
    set({ token: null, user: null })
  },

  initAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync('token')
      const userStr = await SecureStore.getItemAsync('user')
      
      if (token && userStr) {
        const user = JSON.parse(userStr)
        set({ token, user, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      set({ isLoading: false })
    }
  },
}))