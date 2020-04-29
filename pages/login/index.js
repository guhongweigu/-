// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '登录', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    user:{},
  },
//  findUser: function (e) {
//     wx.request({
//       method:"get",
//       url: app.globalData.publicUrl + 'api/financial/companyuser',
//       data:{
//         phone: e.detail.value.phone
//       },
//       success:(e) => {
//         if(e.data.errcode == 0){
//           this.setData({
//              user:e.data.data[0]
//           })
//         }
//       }
//     })
//   },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let phone = e.detail.value.phone
    let passwd = e.detail.value.password
    wx.request({
      method:"get",
      url: app.globalData.publicUrl + 'api/financial/companyuser',
      data:{
        phone: e.detail.value.phone
      },
      success:(e) => {
        if(e.data.errcode == 0){
          this.setData({
             user:e.data.data[0]
          })
          console.log('find---user',this.data.user);
          wx.request({
            method:"POST",
            url: app.globalData.publicUrl + 'api/financial/companyuser/login',
            data:{
              phone:phone,
              passwd:passwd
            },
            success:(e) => {
              console.log('success',e);
              if(e.data.errcode == 0){
                wx.setStorage({
                  key: 'user',
                  data: this.data.user,
                })
                wx.navigateTo({
                  url: '/pages/home/index'
                })
              } else {
                wx.showToast({
                  title: e.data.errmsg,
                  icon: 'none',
                  duration: 1500
              })
              }
            }
          })
        }
      }
    })
  },

  
  // 忘记密码
  unBtnPass: function () {
    wx.navigateTo({
      url: '/pages/unpassword/index'
    })
  },
  // 注冊跳转
  registerBtn: function () {
    wx.navigateTo({
      url: '/pages/register/index'
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