import React from 'react'
import { Row, Col, Card, Statistic, List, Avatar } from 'antd'
import { UserOutlined, BookOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons'

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: '总用户数',
      value: 1234,
      icon: <UserOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: '课程数量',
      value: 89,
      icon: <BookOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: '学生数量',
      value: 567,
      icon: <TeamOutlined style={{ color: '#fa8c16' }} />,
    },
    {
      title: '待批改作业',
      value: 23,
      icon: <FileTextOutlined style={{ color: '#f5222d' }} />,
    },
  ]

  const recentActivities = [
    {
      title: '新学生注册',
      description: '张三同学注册了数学辅导课程',
      time: '2 小时前',
    },
    {
      title: '作业提交',
      description: '李四提交了英语作业',
      time: '3 小时前',
    },
    {
      title: '课程反馈',
      description: '王五对物理课程给出了5星评价',
      time: '5 小时前',
    },
    {
      title: '新课程发布',
      description: '化学老师发布了新的实验课程',
      time: '1 天前',
    },
  ]

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>仪表板</h1>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="最近活动" style={{ height: 400 }}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.title}
                    description={item.description}
                  />
                  <div>{item.time}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统状态" style={{ height: 400 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="CPU使用率" value={45} suffix="%" />
              </Col>
              <Col span={12}>
                <Statistic title="内存使用率" value={68} suffix="%" />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Statistic title="磁盘使用率" value={32} suffix="%" />
              </Col>
              <Col span={12}>
                <Statistic title="在线用户" value={156} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard