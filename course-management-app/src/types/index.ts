export interface User {
  id: number
  username: string
  realName: string
  phone?: string
  email?: string
  avatar?: string
  userType: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'INSTITUTION_ADMIN'
  status: number
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: number
  name: string
  subject: string
  description?: string
  teacherId: number
  institutionId: number
  courseType: 'ONE_ON_ONE' | 'SMALL_CLASS' | 'LARGE_CLASS'
  maxStudents: number
  price?: number
  durationMinutes: number
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  status: number
  teacher?: Teacher
  institution?: Institution
  createdAt: string
  updatedAt: string
}

export interface Teacher {
  id: number
  userId: number
  teacherNumber?: string
  institutionId?: number
  subjects?: string[]
  experienceYears?: number
  qualification?: string
  introduction?: string
  user?: User
  institution?: Institution
  createdAt: string
  updatedAt: string
}

export interface Institution {
  id: number
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  licenseNumber?: string
  website?: string
  logo?: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  id: number
  courseId: number
  title: string
  description?: string
  dueDate?: string
  totalScore: number
  assignmentType: 'HOMEWORK' | 'QUIZ' | 'PROJECT' | 'EXAM'
  status: number
  createdAt: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  timestamp: number
}