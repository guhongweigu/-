// pages/my/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
      showBack: 1, //返回
      title: '贷款产品', 
      height: app.globalData.height * 2 + 20,
  },
    loanDetail:{},
    clamneedDetail:{},
    rateValue: 5,
    finpic:'',
    finalnum:'',
    finalecode:'',
    cpid:'',//产品ID
    claimid:'',//需求ID
    compname:'',
    compcode:'',
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      finpic: options.img,
      finalnum: options.num,
      finalecode: options.ecode,
      cpid: options.proid,
      claimid: options.id,
  });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getclamneed()
    this.getcpnews()
    this.getcompnews()
  },

  getclamneed() {//需求信息
    wx.request({
      method: "GET",
      url: app.globalData.publicUrl + 'api/financial/claimneed/' + this.data.claimid,
      success: (res) => {
        //console.log("需求信息+=============================="+JSON.stringify(res))
        if (res.data.errcode == 0) {
          this.setData({
            clamneedDetail: res.data.data,
          })
        }
      }
    })
  },

  getcpnews(){//产品信息
    let finalid = this.data.cpid;
    wx.request({
      method: "get",
      url: app.globalData.publicUrl + 'api/financial/financeclaims/' + finalid,
      success: (res) => {
        if (res.data.errcode == 0) {
          this.setData({
            loanDetail: res.data.data,
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
      data:{
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