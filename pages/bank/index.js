// pages/search/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 0, //返回
      title: '我要融资', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    active: 1,
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
    dbfsList: ['担保1', '担保2', '担保3', '担保4'],
    yjrzxqList: ['需求1', '需求2', '需求3', '需求4'],
    show: false,
    endInfo: {
      "bank_name": '中国建设银行'
    },
    rzqxList: [{
        code: '1',
        name: '取向1'
      },
      {
        code: '2',
        name: '取向2'
      },
      {
        code: '3',
        name: '取向3'
      },
      {
        code: '4',
        name: '取向4'
      },
      {
        code: '5',
        name: '取向5'
      },
    ],
    // 融资取向显示
    rzqxLists: []
  },
  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    let arr = [];
    for (const val of e.detail.value) {
      const arr1 = {
        name: val
      }
      arr.push(arr1)
    }
    this.setData({
      rzqxLists: arr
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    this.setData({
      show: true
    });
  },
  bindPickerChangeDanbao: function (e) {
    this.setData({
      dbindex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      xqindex: e.detail.value
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 切换菜单
  onChange(event) {
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