import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native'
import {
  TextInput,
  Button,
  Title,
  Card,
  HelperText,
  useTheme,
} from 'react-native-paper'
import { useMutation } from 'react-query'
import { useAuthStore } from '../stores/auth'
import { login } from '../services/auth'
import { LoginRequest } from '../types'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { setAuth } = useAuthStore()
  const theme = useTheme()

  const loginMutation = useMutation(login, {
    onSuccess: async (data) => {
      await setAuth(data.token, data.user)
    },
    onError: (error: any) => {
      Alert.alert('登录失败', error.message || '用户名或密码错误')
    },
  })

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('提示', '请输入用户名和密码')
      return
    }

    const loginData: LoginRequest = {
      username: username.trim(),
      password: password.trim(),
    }

    loginMutation.mutate(loginData)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            课程管理系统
          </Title>
          
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <TextInput
                label="用户名"
                value={username}
                onChangeText={setUsername}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TextInput
                label="密码"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
              />
              
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loginMutation.isLoading}
                disabled={loginMutation.isLoading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                登录
              </Button>
              
              <HelperText type="info" style={styles.helperText}>
                测试账号: admin / admin123
              </HelperText>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    padding: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  helperText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
  },
})