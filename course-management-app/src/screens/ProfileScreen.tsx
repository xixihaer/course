import React from 'react'
import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import { List, Avatar, Button, Card, Text, useTheme } from 'react-native-paper'
import { useAuthStore } from '../stores/auth'

export default function ProfileScreen() {
  const { user, clearAuth } = useAuthStore()
  const theme = useTheme()

  const handleLogout = () => {
    Alert.alert('确认退出', '您确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        style: 'destructive',
        onPress: async () => {
          await clearAuth()
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Header */}
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text 
            size={80} 
            label={user?.realName?.charAt(0) || 'U'}
            style={{ backgroundColor: theme.colors.primary }}
          />
          <View style={styles.profileText}>
            <Text style={styles.userName}>{user?.realName}</Text>
            <Text style={styles.userType}>
              {user?.userType === 'STUDENT' ? '学生' : user?.userType}
            </Text>
            {user?.phone && (
              <Text style={styles.userInfo}>📱 {user.phone}</Text>
            )}
            {user?.email && (
              <Text style={styles.userInfo}>📧 {user.email}</Text>
            )}
          </View>
        </Card.Content>
      </Card>

      {/* Menu Items */}
      <Card style={styles.menuCard}>
        <List.Section>
          <List.Item
            title="个人信息"
            description="查看和编辑个人资料"
            left={(props) => <List.Icon {...props} icon="account-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // Navigate to profile edit
            }}
          />
          
          <List.Item
            title="学习统计"
            description="查看学习进度和统计"
            left={(props) => <List.Icon {...props} icon="chart-line" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // Navigate to statistics
            }}
          />
          
          <List.Item
            title="设置"
            description="应用设置和偏好"
            left={(props) => <List.Icon {...props} icon="cog" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // Navigate to settings
            }}
          />
          
          <List.Item
            title="帮助中心"
            description="常见问题和帮助"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // Navigate to help
            }}
          />
          
          <List.Item
            title="关于应用"
            description="版本信息和更新"
            left={(props) => <List.Icon {...props} icon="information" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              // Navigate to about
            }}
          />
        </List.Section>
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        textColor={theme.colors.error}
        icon="logout"
      >
        退出登录
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 15,
    elevation: 2,
    borderRadius: 12,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileText: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userType: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 3,
  },
  menuCard: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
    borderRadius: 12,
  },
  logoutButton: {
    margin: 15,
    borderRadius: 8,
    borderColor: '#f44336',
  },
})