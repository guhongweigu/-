// pages/my/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 0, //返回
      title: '我的', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    active: 4,
    icon: {
      normal: '/pages/images/home.png',
      active: '/pages/images/home_fill.png',
      bankNormal: '/pages/images/duijie.png',
      bankActive: '/pages/images/duijie_fill.png',
      marketNormal: '/pages/images/recharge.png',
      marketActive: '/pages/images/recharge_fill.png',
      policyNormal: '/pages/images/news_hot.png',
      policyActive: '/pages/images/news_hot_fill.png',
      myNormal: '/pages/images/people.png',
      myActive: '/pages/images/people_fill.png'
    },
  },
  // 切换菜单
  onChange(event) {
    console.log(event.detail)
    this.setData({
      active: event.detail
    });
    if (event.detail == 0) {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    } else if (event.detail == 1) {
      wx.navigateTo({
        url: '/pages/bank/index'
      })
    } else if (event.detail == 2) {
      wx.navigateTo({
        url: '/pages/market/index'
      })
    } else if (event.detail == 3) {
      wx.navigateTo({
        url: '/pages/policy/index'
      })
    } else if (event.detail == 4) {
      wx.navigateTo({
        url: '/pages/my/index'
      })
    }
  },
  // 企业认证
  onattestation: function () {
    wx.navigateTo({
      url: '/pages/attestation/index'
    })
  },
  // 我的融资
  myFinanceBtn: function () {
    wx.navigateTo({
      url: '/pages/myFinance/index'
    })
  },
  //贷款产品
  myloanprojuct: function () {
    wx.navigateTo({
      url: '/pages/myloanprojuct/index'
    })
  },
  // 密码修改
  onUpdatePass: function () {
    wx.navigateTo({
      url: '/pages/updatePassword/index'
    })
  },
  // 退出登录
  onGoout: function () {
    console.log('退出登录')
    wx.removeStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '退出成功',
          icon: 'none',
          duration: 1500
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})