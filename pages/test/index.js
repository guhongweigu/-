// pages/style/style.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    showView: true,
    list:[
      {"title":"你是不是傻"} ,
      {"title":"ni'hao"} ,
    ],
  },
  //滑动切换nihao
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },
  // 上下效果
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  // 页面跳转
  // 判断id
  onDetail: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/job/loginPage?id=' + e.currentTarget.id // 希望跳转过去的页面    
    })
  },
  // 无id，模拟数据跳转
  onDetail: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
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