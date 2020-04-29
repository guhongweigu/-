// pages/market/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 0, //返回
      title: '金融数字超市', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    active: 2,
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
    tabActive: 0,
    currentTab: 0,
    idx: '0',
    applyList: [{
      id: "0",
      name: "全部"
    }, {
      id: "1",
      name: "最低利率"
    }, {
      id: "2",
      name: "成功率"
    }],
    show: false,
    showView: true,
    successNum: '1000',
    // 全部-视频列表
    marketOneVideoList: [{
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '科技创贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
    }, {
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '科技创贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
      "top": '0'
    }, ],
    //全部-无视频列表
    marketOneNovideoList: [{
        "pic": '/pages/images/test.jpg',
        "title": '科技创贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '1'
      },
      {
        "pic": '/pages/images/test.jpg',
        "title": '科技创贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '0'
      },
    ],
    // 抗疫贷-视频列表
    marketTwoVideoList: [{
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '抗疫贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
    }, {
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '抗疫贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
      "top": '0'
    }, ],
    // 抗疫贷-无视频列表
    marketTwoNovideoList: [{
        "pic": '/pages/images/test.jpg',
        "title": '抗疫贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '1'
      },
      {
        "pic": '/pages/images/test.jpg',
        "title": '抗疫贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '0'
      },
    ],
    // 科技贷-视频列表
    marketThreeVideoList: [{
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '科技贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
    }, {
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '科技贷',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
      "top": '0'
    }, ],
    // 科技贷-无视频列表
    marketThreeNovideoList: [{
        "pic": '/pages/images/test.jpg',
        "title": '科技贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '1'
      },
      {
        "pic": '/pages/images/test.jpg',
        "title": '科技贷',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '0'
      },
    ],
    // 其他-视频列表
    marketFourVideoList: [{
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '其他',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
    }, {
      "video": 'http://124.235.209.122:88/files/financial/custom/20200422182552.mp4',
      "title": '其他',
      "minTern": "0.5",
      "maxTern": "1.0",
      "minMoney": "1",
      "maxMonery": "2500",
      "danbao": "不限",
      "minMonth": "1",
      "maxMonth": "12",
      "top": '0'
    }, ],
    // 其他-无视频列表
    marketFourNovideoList: [{
        "pic": '/pages/images/test.jpg',
        "title": '其他',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '1'
      },
      {
        "pic": '/pages/images/test.jpg',
        "title": '其他',
        "minTern": "0.5",
        "maxTern": "1.0",
        "minMoney": "1",
        "maxMonery": "2500",
        "danbao": "不限",
        "minMonth": "1",
        "maxMonth": "12",
        "top": '0'
      },
    ],
    rzqxList: [{
        code: '1',
        name: '3个月及以下',
        checked: 'true'
      },
      {
        code: '2',
        name: '6个月及以下',
      },
      {
        code: '3',
        name: '9个月及以下'
      },
      {
        code: '4',
        name: '12个月及以下'
      },
      {
        code: '5',
        name: '12个月及以上'
      },
    ],
    dbfsList: [{
        code: '1',
        name: '抵押',
        checked: 'true'
      },
      {
        code: '2',
        name: '质押',
      },
      {
        code: '3',
        name: '信用'
      },
      {
        code: '4',
        name: '保证'
      },
    ],
    rzedList: [{
        code: '1',
        name: '100万及以下',
        checked: 'true'
      },
      {
        code: '2',
        name: '200万及以下',
      },
      {
        code: '3',
        name: '500万及以下'
      },
      {
        code: '4',
        name: '1000万及以下'
      },
      {
        code: '5',
        name: '1000万及以上'
      },
    ],
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 筛选提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  // 有id跳转
  marketOneVideoDetail: function (e) {
    wx.navigateTo({
      url: '/pages/loanDetailapply/index?id=' + e.currentTarget.dataset.pid // 希望跳转过去的页面
    })
  },
  // 无id，模拟数据跳转
  marketOneVideoDetail: function () {
    wx.navigateTo({
      url: '/pages/loanDetailapply/index'
    })
  },
  // 上下效果
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  showPopup() {
    console.log('showPopup');
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  // 切换标签
  onChangeTab(event) {
    console.log(event);
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.title}`,
    // });
  },
  // 筛选
  selectApply: function (e) {
    let id = e.target.dataset.id
    this.setData({
      idx: id
    })
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