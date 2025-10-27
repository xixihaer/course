import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Title, Card, Text, Avatar, useTheme } from 'react-native-paper'
import { useAuthStore } from '../stores/auth'

export default function HomeScreen() {
  const { user } = useAuthStore()
  const theme = useTheme()

  const quickStats = [
    { title: '我的课程', value: '5', color: theme.colors.primary },
    { title: '待完成作业', value: '3', color: theme.colors.secondary },
    { title: '本周课时', value: '12', color: '#4caf50' },
    { title: '学习积分', value: '86', color: '#ff9800' },
  ]

  const recentActivities = [
    { title: '数学作业已批改', time: '2小时前', icon: 'check-circle' },
    { title: '英语课程提醒', time: '明天 14:00', icon: 'clock' },
    { title: '物理实验报告', time: '后天截止', icon: 'file-document' },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <View style={styles.userInfo}>
          <Avatar.Text size={50} label={user?.realName?.charAt(0) || 'U'} />
          <View style={styles.userText}>
            <Title style={styles.userName}>你好，{user?.realName}</Title>
            <Text style={styles.userRole}>
              {user?.userType === 'STUDENT' ? '学生' : user?.userType}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => (
          <Card key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Recent Activities */}
      <Card style={styles.activitiesCard}>
        <Card.Title title="最近动态" />
        <Card.Content>
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  activitiesCard: {
    margin: 15,
    marginTop: 0,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
})