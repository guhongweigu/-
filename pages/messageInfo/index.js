const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '消息中心', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    messageList: [],
    skip: 1,
    limit: 10,
    total: 0,
    listshow: 1,
    // 是否到底
    hasMoreData: true

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('user') == ""){
      wx.redirectTo({
      url: '/pages/login/index'
    })
    }else{
      var that = this;
      that.searchInfo('正在加载数据...')
    }
    
  },

 
  // 列表查询
  searchInfo: function (message) {
    wx.showLoading({
      title: message,
    })
    var that = this;
    wx.request({
      url: app.globalData.publicUrl+'api/financial/viewnews/select', //真是接口
      method: 'post',
      data: {
        qyid: wx.getStorageSync('user')._id,//wx.getStorageSync('user')._id  '5e903455d72a944fd899c59c'
        skip: that.data.skip,
        limit: that.data.limit
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.errcode == '0') {
          if (res.data.res.length !== 0) {
            if (that.data.messageList.isEmpty) {
              that.setData({ // 设置页面列表的内容
                messageList: res.data.res,
              })
            } else {
              that.setData({ // 设置页面列表的内容
                messageList: that.data.messageList.concat(res.data.res),
                total: res.data.total
              })
            }
          } else {
            wx.showToast({
              title: "没有更多数据了",
              duration: 1000,
              icon: 'none',
              mask: true
            })
          }
        }
      },
      complete: function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.data.skip = 1
    this.data.messageList=[]
    this.searchInfo('正在刷新数据')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const pageNum = this.data.skip;
    const _pagenum = Math.ceil(this.data.total / this.data.limit);
    if (pageNum < _pagenum) {
      this.setData({
        skip: pageNum + 1 //设置下一页
      })
      this.searchInfo('正在刷新数据'); //查询数据
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
})