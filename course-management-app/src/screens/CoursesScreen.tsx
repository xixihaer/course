import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Title, Text, Chip, useTheme } from 'react-native-paper'

export default function CoursesScreen() {
  const theme = useTheme()

  const courses = [
    {
      id: 1,
      name: '高中数学',
      teacher: '李老师',
      time: '周二 14:00-16:00',
      location: '教学楼A201',
      type: 'ONE_ON_ONE',
    },
    {
      id: 2,
      name: '英语口语',
      teacher: '王老师',
      time: '周四 16:00-17:30',
      location: '教学楼B105',
      type: 'SMALL_CLASS',
    },
    {
      id: 3,
      name: '物理实验',
      teacher: '张老师',
      time: '周六 09:00-11:00',
      location: '实验楼C301',
      type: 'LARGE_CLASS',
    },
  ]

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ONE_ON_ONE':
        return '一对一'
      case 'SMALL_CLASS':
        return '小班课'
      case 'LARGE_CLASS':
        return '大班课'
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ONE_ON_ONE':
        return theme.colors.primary
      case 'SMALL_CLASS':
        return theme.colors.secondary
      case 'LARGE_CLASS':
        return '#4caf50'
      default:
        return theme.colors.outline
    }
  }

  const renderCourse = ({ item }: { item: any }) => (
    <Card style={styles.courseCard}>
      <Card.Content>
        <View style={styles.courseHeader}>
          <Title style={styles.courseName}>{item.name}</Title>
          <Chip
            mode="outlined"
            textStyle={{ color: getTypeColor(item.type) }}
            style={{ borderColor: getTypeColor(item.type) }}
          >
            {getTypeLabel(item.type)}
          </Chip>
        </View>
        
        <View style={styles.courseInfo}>
          <Text style={styles.infoText}>👨‍🏫 {item.teacher}</Text>
          <Text style={styles.infoText}>⏰ {item.time}</Text>
          <Text style={styles.infoText}>📍 {item.location}</Text>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  courseCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 12,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  courseInfo: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
  },
})