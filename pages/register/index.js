// pages/register/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '注册', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
  },
  // 注册账号
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      method:"POST",
      url: app.globalData.publicUrl + 'api/financial/companyuser',
      data:{
        phone: e.detail.value.phone,
        passwd: e.detail.value.password,
        company_name: e.detail.value.companyname
      },
      success:(e) => {
        console.log('success',e);
        if(e.data.errcode == 0){
          wx.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          if (e.data.details === "phone无效") {
            wx.showToast({
              title: '请重新输入手机号',
              icon: 'none',
              duration: 1500
          })
          
          }
          else if(e.data.errmsg === "数据已存在"){
              wx.showToast({
                title: '改手机号已被注册',
                icon: 'none',
                duration: 1500
            })
          }
          else{
              wx.showToast({
                title: e.data.details?e.data.details:e.data.errmsg,
                icon: 'none',
                duration: 1500
            })
         }
        }
      }
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