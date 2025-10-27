// pages/index/index.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    stats: [
      { title: '我的课程', value: '5', icon: '📚' },
      { title: '待完成作业', value: '3', icon: '📝' },
      { title: '本周课时', value: '12', icon: '⏰' },
      { title: '学习积分', value: '86', icon: '🏆' }
    ],
    activities: [
      { title: '数学作业已批改', time: '2小时前', type: 'success' },
      { title: '英语课程提醒', time: '明天 14:00', type: 'info' },
      { title: '物理实验报告', time: '后天截止', type: 'warning' }
    ]
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    this.loadData()
  },

  loadData() {
    // 加载首页数据
    this.loadStats()
    this.loadActivities()
  },

  loadStats() {
    wx.request({
      url: `${app.globalData.baseUrl}/dashboard/stats`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${app.globalData.token}`
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            stats: res.data.data
          })
        }
      },
      fail: (err) => {
        console.error('加载统计数据失败', err)
      }
    })
  },

  loadActivities() {
    wx.request({
      url: `${app.globalData.baseUrl}/dashboard/activities`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${app.globalData.token}`
      },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            activities: res.data.data
          })
        }
      },
      fail: (err) => {
        console.error('加载活动数据失败', err)
      }
    })
  },

  onPullDownRefresh() {
    this.loadData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})