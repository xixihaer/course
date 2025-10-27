import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, Title, Text, Chip, Button, useTheme } from 'react-native-paper'

export default function AssignmentsScreen() {
  const theme = useTheme()

  const assignments = [
    {
      id: 1,
      title: '数学练习册第3章',
      course: '高中数学',
      dueDate: '2024-01-15',
      status: 'pending',
      score: null,
    },
    {
      id: 2,
      title: '英语口语作业',
      course: '英语口语',
      dueDate: '2024-01-12',
      status: 'submitted',
      score: null,
    },
    {
      id: 3,
      title: '物理实验报告',
      course: '物理实验',
      dueDate: '2024-01-10',
      status: 'graded',
      score: 88,
    },
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: '待提交', color: theme.colors.error }
      case 'submitted':
        return { label: '已提交', color: '#ff9800' }
      case 'graded':
        return { label: '已批改', color: '#4caf50' }
      default:
        return { label: status, color: theme.colors.outline }
    }
  }

  const renderAssignment = ({ item }: { item: any }) => {
    const statusInfo = getStatusInfo(item.status)
    const isOverdue = new Date(item.dueDate) < new Date() && item.status === 'pending'

    return (
      <Card style={styles.assignmentCard}>
        <Card.Content>
          <View style={styles.assignmentHeader}>
            <Title style={styles.assignmentTitle}>{item.title}</Title>
            <Chip
              mode="outlined"
              textStyle={{ color: statusInfo.color }}
              style={{ borderColor: statusInfo.color }}
            >
              {statusInfo.label}
            </Chip>
          </View>
          
          <View style={styles.assignmentInfo}>
            <Text style={styles.infoText}>📚 {item.course}</Text>
            <Text style={[styles.infoText, isOverdue && styles.overdueText]}>
              📅 截止时间: {item.dueDate}
            </Text>
            {item.score && (
              <Text style={styles.scoreText}>📊 得分: {item.score}/100</Text>
            )}
          </View>

          {item.status === 'pending' && (
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={() => {
                // Handle submit assignment
              }}
            >
              提交作业
            </Button>
          )}
        </Card.Content>
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assignments}
        renderItem={renderAssignment}
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
  assignmentCard: {
    marginBottom: 15,
    elevation: 2,
    borderRadius: 12,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  assignmentInfo: {
    gap: 8,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
  },
  overdueText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  submitButton: {
    borderRadius: 8,
  },
})