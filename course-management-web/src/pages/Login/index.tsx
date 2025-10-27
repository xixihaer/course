import React from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { login } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { LoginRequest } from '@/types'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form] = Form.useForm()

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      message.success('登录成功')
      navigate('/dashboard')
    },
    onError: (error: any) => {
      message.error(error.message || '登录失败')
    },
  })

  const handleSubmit = (values: LoginRequest) => {
    loginMutation.mutate(values)
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Card
        title="课外课程管理系统"
        style={{
          width: 400,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        headStyle={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isLoading}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', color: '#666', fontSize: '12px' }}>
          默认管理员账号: admin / admin123
        </div>
      </Card>
    </div>
  )
}

export default Login