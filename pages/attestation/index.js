// pages/attestation/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '我的企业', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    user:{},
  },
  // 认证信息提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let user = wx.getStorageSync('user')
    console.log('user',user._id)
    if (user) {
    e.detail.value.uid = user._id;
    e.detail.value.business_license = '#';// 营业执照图片
    e.detail.value.card_back = '#';//身份证反面图	
    e.detail.value.card_front = '#';// 身份证正面图
    e.detail.value.profession_one = '1';
    e.detail.value.profession_two = '1';
    e.detail.value.profession_three = '1';
    e.detail.value.belong_addr_area = '1';
    console.log('postDorm',e.detail.value)
    wx.request({
      method:"POST",
      url: app.globalData.publicUrl + 'api/financial/companyidentify',
      data: e.detail.value,
      success:(e) => {
        console.log('success',e);
        if(e.data.errcode == 0){
          wx.navigateTo({
            url: '/pages/home/index'
          })
        } else {
          wx.showToast({
            title: e.data.details?e.data.details:e.data.errmsg,
            icon: 'none',
            duration: 1500
        })
        }
      }
    })
    }else{
      wx.showModal({
                title: '警告',
                content: '您当前没有登录，将无法进行认证，请重新登录!!!',
                showCancel: false,
                confirmText: '返回登录',
                success: function (res) {
                if (res.confirm) {
                console.log('用户点击了“返回”')
                wx.navigateTo({
                  url: '/pages/login/index'
                })
                }
              }
            })
    }
  },

  //数据回显
  loadData: function () {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let user = wx.getStorageSync('user')
    console.log('user',user._id)
    wx.request({
      method:"get",
      url: app.globalData.publicUrl + 'api/financial/companyidentify',
      data: {uid:user._id},
      success:(e) => {
        console.log('success',e);
        if(e.data.errcode == 0){
          this.setData({
            user:e.data.data[0]
          })
        } else {
          wx.showToast({
            title: e.data.details?e.data.details:e.data.errmsg,
            icon: 'none',
            duration: 1500
        })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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