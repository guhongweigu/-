// pages/myloanprojuctDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '贷款产品', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    jgproid:'',//产品ID
    jgproidname:'',
    ecode:'',
    ecodename:'',
    cneedid:'',
    clamneedDetail: {},
    compname: '',
    compcode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ // 设置页面列表的内容
      cneedid: options.cneedid,
    })
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getclamneed(),
      this.getcompnews()
  },

  getclamneed() {//需求信息
    wx.request({
      method: "GET",
      url: app.globalData.publicUrl + 'api/financial/claimneed/' + this.data.cneedid,
      success: (res) => {
        //console.log("需求信息+=============================="+JSON.stringify(res))
        if (res.data.errcode == 0) {
          this.setData({
            clamneedDetail: res.data.data,
            ecode:res.data.data.ensure_id,
            jgproid: res.data.data.jg_pro_id
          })
          wx.request({
            method: "get",
            url: app.globalData.publicUrl + 'api/financial/dictionary',
            data: {
              "code": this.data.ecode
            },
            success: (res) => {
              if (res.data.errcode == 0) {
                this.setData({
                  ecodename: res.data.data[0].name
                })
              }
              wx.request({
                method: "get",
                url: app.globalData.publicUrl + 'api/financial/financeclaims/' + this.data.jgproid,
                success: (res) => {
                  if (res.data.errcode == 0) {
                    this.setData({
                      jgproidname: res.data.data.name,
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  getcompnews() {//企业信息
    let fiduid = wx.getStorageSync('user')._id;
    wx.request({
      method: "get",
      url: app.globalData.publicUrl + 'api/financial/companyidentify',
      data: {
        uid: fiduid
      },
      success: (res) => {
        //console.log("企业信息================================================"+JSON.stringify(res))
        if (res.data.errcode == 0) {
          this.setData({
            compname: res.data.data[0].company_name,
            compcode: res.data.data[0].code
          })
        }
      }
    })
  },

  
})