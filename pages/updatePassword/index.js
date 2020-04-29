// pages/updatePassword/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '修改密码', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 获取当前登录用户信息
    console.log(wx.getStorageSync('user'))
    let user = wx.getStorageSync('user')
    // console.log('user',user._id)
   let password_new = e.detail.value.password_new
   let password_again = e.detail.value.password_again
    if (password_again != password_new) {
      wx.showToast({
        title: '密码不一致,请重新输入',
        icon: 'none',
        duration: 1500
    })
    }else{
      wx.request({
        method:"POST",
        url: app.globalData.publicUrl + 'api/financial/companyuser/uppasswd',
        data:{
          uid: user._id,
          newpasswd: e.detail.value.password_new,
          oldpasswd: e.detail.value.password_old
        },
        success:(e) => {
          console.log('success',e);
          if(e.data.errcode == 0){
            wx.showToast({
              title: '密码修改成功',
              icon: 'none',
              duration: 1500
          })
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
    // console.log(JSON.stringify(wx.getStorageSync('user')))
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