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

export interface Student {
  id: number
  userId: number
  studentNumber?: string
  grade?: string
  school?: string
  parentName?: string
  parentPhone?: string
  user?: User
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
  scheduleId?: number
  title: string
  description?: string
  content?: string
  attachments?: string[]
  dueDate?: string
  totalScore: number
  assignmentType: 'HOMEWORK' | 'QUIZ' | 'PROJECT' | 'EXAM'
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD'
  autoGrade: boolean
  status: number
  createdBy: number
  createdAt: string
  updatedAt: string
}

export interface Feedback {
  id: number
  courseId: number
  scheduleId?: number
  studentId: number
  teacherId: number
  rating: number
  content?: string
  feedbackType: 'COURSE_QUALITY' | 'TEACHER_PERFORMANCE' | 'FACILITY' | 'OVERALL' | 'SUGGESTION'
  tags?: string[]
  isAnonymous: boolean
  status: 'PENDING' | 'REVIEWED' | 'REPLIED'
  reply?: string
  repliedBy?: number
  repliedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  timestamp: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  current: number
  size: number
  pages: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface CreateUserRequest {
  username: string
  password: string
  realName: string
  phone?: string
  email?: string
  avatar?: string
  userType: User['userType']
}

export interface UpdateUserRequest {
  realName?: string
  phone?: string
  email?: string
  avatar?: string
  status?: number
}