const request = require('../../utils/request.js');
// pages/policyDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 0, //返回
      title: '政策信息', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    currentTab: 0,
    sHeight:'100vh',
    policyPageIndex: 0,
    policyPageSize: 6,
    policyHasMore: true,
    policyUrl: 'api/financial/tPolicyInterpretation/select',
    unscramblePageIndex: 0,
    unscramblePageSize: 6,
    unscrambleHasMore: true,
    unscrambleUrl: 'api/financial/tPolicyDeclaration/select',
    state: 1,
    policyList: [],
    unscrambleList: [],
    active: 3,
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
  //滑动切换nihao
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

    if(this.data.currentTab === 0){
      console.log(this.data.currentTab);
      let query = wx.createSelectorQuery();
      query.select('#policy').boundingClientRect(function (rect) {
        that.setData({
          sHeight: 180*(that.data.policyList.length)+'rpx'
        })
      }).exec();
    }else {
      console.log(this.data.currentTab);
      let query = wx.createSelectorQuery();
      query.select('#unscramble').boundingClientRect(function (rect) {
        that.setData({
          sHeight: 180*(that.data.unscrambleList.length)+'rpx'
        })
      }).exec();
    }

  },

  policyListDetail: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/policyDetail/index?id=' + e.currentTarget.dataset.pid // 希望跳转过去的页面
    })
  },
  /*// 无id，模拟数据跳转
  policyListDetail: function () {
    wx.navigateTo({
      url: '/pages/policyDetail/index'
    })
  },*/

  unscrambleListDetail: function (e) {
    wx.navigateTo({
      url: '/pages/unscrambleDetail/index?id=' + e.currentTarget.dataset.unid // 希望跳转过去的页面
    })
  },
  /*// 无id，模拟数据跳转
  unscrambleListDetail: function () {
    wx.navigateTo({
      url: '/pages/unscrambleDetail/index'
    })
  },*/
  //点击切换
  clickTab: function (e) {
    console.log('点击切换');
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });

      if(this.data.currentTab === 0){
        console.log(this.data.currentTab);
        let query = wx.createSelectorQuery();
        query.select('#policy').boundingClientRect(function (rect) {
          that.setData({
            sHeight: 180*(that.data.policyList.length)+'rpx'
          })
        }).exec();
      }else {
        console.log(this.data.currentTab);
        let query = wx.createSelectorQuery();
        query.select('#unscramble').boundingClientRect(function (rect) {
          that.setData({
            sHeight: 180*(that.data.unscrambleList.length)+'rpx'
          })
        }).exec();
      }

    }
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
  loadMore: function () {

    if(this.data.currentTab === 0){
      if (!this.data.policyHasMore) return;
      request.query({
        url: this.data.policyUrl,
        data: {
          skip: (++this.data.policyPageIndex - 1) * this.data.policyPageSize,
          limit: this.data.policyPageSize,
          publish_state: this.data.state
        }
      }).then((res) => {
        let temp = res.data.data.map((item) => {
          if (item.image) {
            item.image = request.imageUrl + item.image
          }
          return item;
        });
        console.log(res);
        let newList = this.data.policyList.concat(temp);
        console.log(newList);
        console.log(res.data.total);
        let flag = this.data.policyPageIndex * this.data.policyPageSize < res.data.total;

        let query = wx.createSelectorQuery();
        let that = this;
        query.select('#policy').boundingClientRect(function (rect) {
          that.setData({
            sHeight: 180*(newList.length)+'rpx'
          })
        }).exec();

        this.setData({
          policyList: newList,
          policyHasMore: flag,
        });
      }).catch((err) => {
        console.log(err);
      });
    }else {
      if (!this.data.unscrambleHasMore) return;
      request.query({
        url: this.data.unscrambleUrl,
        data: {
          skip: (++this.data.unscramblePageIndex - 1) * this.data.unscramblePageSize,
          limit: this.data.unscramblePageSize,
          current_state: this.data.state
        }
      }).then((res) => {
        let temp = res.data.data.map((item) => {
          if (item.image) {
            item.image = request.imageUrl + item.image
          }
          return item;
        });
        console.log(res);
        let newList = this.data.unscrambleList.concat(temp);
        console.log(newList);
        console.log(res.data.total);
        let flag = this.data.unscramblePageIndex * this.data.unscramblePageSize < res.data.total;

        let query = wx.createSelectorQuery();
        let that = this;
        query.select('#unscramble').boundingClientRect(function (rect) {
          that.setData({
            sHeight: 180*(newList.length)+'rpx'
          })
        }).exec();

        this.setData({
          unscrambleList: newList,
          unscrambleHasMore: flag,
        });
      }).catch((err) => {
        console.log(err);
      });

    }

  },
  loadPolicyFirst: function () {

    request.query({
      url: this.data.policyUrl,
      data: {
        skip: (++this.data.policyPageIndex - 1) * this.data.policyPageSize,
        limit: this.data.policyPageSize,
        publish_state: this.data.state
      }
    }).then((res) => {
      let temp = res.data.data.map((item) => {
        if (item.image) {
          item.image = request.imageUrl + item.image
        }
        return item;
      });
      console.log(res);
      let newList = this.data.policyList.concat(temp);
      console.log(newList);
      console.log(res.data.total);
      let flag = this.data.policyPageIndex * this.data.policyPageSize < res.data.total;

      let query = wx.createSelectorQuery();
      let that = this;
      query.select('#policy').boundingClientRect(function (rect) {
        that.setData({
          sHeight: 180*(newList.length)+'rpx'
        })
      }).exec();

      this.setData({
        policyList: newList,
        policyHasMore: flag,
      });
    }).catch((err) => {
      console.log(err);
    });

  },
  loadUnscrambleFirst: function () {

      request.query({
        url: this.data.unscrambleUrl,
        data: {
          skip: (++this.data.unscramblePageIndex - 1) * this.data.unscramblePageSize,
          limit: this.data.unscramblePageSize,
          current_state: this.data.state
        }
      }).then((res) => {
        let temp = res.data.data.map((item) => {
          if (item.image) {
            item.image = request.imageUrl + item.image
          }
          return item;
        });
        console.log(res);
        let newList = this.data.unscrambleList.concat(temp);
        console.log(newList);
        console.log(res.data.total);
        let flag = this.data.unscramblePageIndex * this.data.unscramblePageSize < res.data.total;
        this.setData({
          unscrambleList: newList,
          unscrambleHasMore: flag,
        });
      }).catch((err) => {
        console.log(err);
      });

  },
  loadMoreFirst: function () {
    this.loadPolicyFirst();
    this.loadUnscrambleFirst();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMoreFirst();

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
    console.log("下拉事件");
    if(this.data.currentTab === 0){
      this.setData({
        policyList:[],
        policyPageIndex:0,
        policyHasMore:true,
      });
    }else {
      this.setData({
        unscrambleList:[],
        unscramblePageIndex:0,
        unscrambleHasMore:true,
      });
    }
    this.loadMore();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
