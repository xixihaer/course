// pages/login/login.js
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading: false
  },

  onLoad() {
    // 检查是否已经登录
    if (app.globalData.token) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  getUserProfile() {
    this.setData({ loading: true })
    
    app.login((success) => {
      this.setData({ loading: false })
      
      if (success) {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      }
    })
  },

  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.getUserProfile()
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      })
    }
  }
})