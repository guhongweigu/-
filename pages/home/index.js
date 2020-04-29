const request = require('../../utils/request.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 0, //返回
      title: '我的主页', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    // 此页面 页面内容距最顶部的距离
    active: 0,
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
    // 成功对接
    successNum: '2564',
    // 热门产品
    productList: [],
    // 政策解读
    policyList: [],
    // 轮播
    background: [{
        "pic": "/pages/images/test1.png",
      },
      {
        "pic": "/pages/images/test.jpg",
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  // 政策解读页面列表跳转
  policyListTap: function () {
    wx.navigateTo({
      url: '/pages/policy/index'
    })
  },

  // 政策解读页面详情跳转
  // 判断id
  policyListDetailTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/policyDetail/index?id=' + e.currentTarget.dataset.pid // 希望跳转过去的页面
    })
  },

  // 热门产品跳转
  toshow(e) {
    let claimid = e.currentTarget.dataset.claimid;
    let img = e.currentTarget.dataset.img;
    console.log(JSON.stringify(e.currentTarget.dataset))
    wx.navigateTo({
      url: '/pages/marketLoanDetail/index?claimid=' + claimid + '&img=' + img,
    })
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
  topNews: function () {
    wx.request({
      method: "POST",
      url: app.globalData.publicUrl + 'api/financial/financeclaims/top',
      success: (e) => {
        if (e.data.errcode == 0) {
          let arr = [];
          e.data.data.forEach((item) => {
            arr.push({
              _id: item._id,
              pic: app.globalData.imageUrl + item.innew.logo,
              title: item.name.substring(0, 5) + '...'
            });
          });
          this.setData({
            productList: arr
          })
        }
      }
    })
  },
  loadPolicyList: function () {
    request.query({
      url: 'api/financial/tPolicyInterpretation/select',
      data: {
        skip: 0,
        limit: 4,
        publish_state: 1
      }
    }).then((res) => {
      let temp = res.data.data.map((item) => {
        if (item.image) {
          item.image = request.imageUrl + item.image
        }
        return item;
      });
      this.setData({
        policyList: temp
      });
    }).catch((err) => {
      console.log(err);
    });
  },

  //轮播图
  getbanner() {
    wx.request({
      method: "GET",
      url: app.globalData.publicUrl + 'api/financial/banner',
      data: {
        skip: 0,
        limit: 3,
      },
      success: (res) => {
        if (res.data.errcode == 0) {
          this.setData({
            background: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.topNews();
    this.loadPolicyList();
    this.getbanner();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(JSON.stringify(wx.getStorageSync('user')))
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