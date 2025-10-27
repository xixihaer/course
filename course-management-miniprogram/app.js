// app.js
App({
  globalData: {
    userInfo: null,
    token: null,
    baseUrl: 'https://your-api-domain.com/api'
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查登录态
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token')
    const userInfo = wx.getStorageSync('userInfo')
    
    if (token && userInfo) {
      this.globalData.token = token
      this.globalData.userInfo = userInfo
    } else {
      // 跳转到登录页
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },

  login(callback) {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        // 获取用户信息成功
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo)
        
        // 调用后端登录接口
        this.apiLogin(res.userInfo, callback)
      },
      fail: (err) => {
        console.error('获取用户信息失败', err)
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
      }
    })
  },

  apiLogin(userInfo, callback) {
    wx.request({
      url: `${this.globalData.baseUrl}/auth/wechat-login`,
      method: 'POST',
      data: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      },
      success: (res) => {
        if (res.data.code === 200) {
          const { token, user } = res.data.data
          this.globalData.token = token
          this.globalData.userInfo = user
          
          wx.setStorageSync('token', token)
          wx.setStorageSync('userInfo', user)
          
          if (callback) callback(true)
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
            icon: 'error'
          })
          if (callback) callback(false)
        }
      },
      fail: (err) => {
        console.error('登录请求失败', err)
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        })
        if (callback) callback(false)
      }
    })
  },

  logout() {
    this.globalData.token = null
    this.globalData.userInfo = null
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})