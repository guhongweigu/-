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
      title: '贷款产品', //导航栏 中间的标题
      // 此页面 页面内容距最顶部的距离
      height: app.globalData.height * 2 + 20,
    },
    star:'5',
    loanDetail:{},
    img: '',
    claimid:'',
    video:'',
    ecode:'',
    num:'0',
  },

  loadDetail: function () {
    console.log(this.data.pid);
  },

  clickApply(event){
    console.log(event)
    if (wx.getStorageSync('user') == "") {
      wx.redirectTo({
        url: '/pages/login/index'
      })
    } else {
      if (wx.getStorageSync('user').roles != "0") {
        wx.navigateTo({
          url: '/pages/loanDetailapply/index?id=' + event.target.dataset.id + '&uid=' + event.target.dataset.uid + '&num=' + event.target.dataset.num + '&ecode=' + event.target.dataset.ecode + '&img=' + event.target.dataset.img // 希望跳转过去的页面
        })
      }else{
        wx.showToast({
          title: '您的企业正在审核中，暂不能申请',
          icon: "none"
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      claimid: options.claimid
    }); 
    if (options.img.substring(0,4)=='http'){
      this.setData({
        img: options.img
      });
    }else{
      this.setData({
        img: app.globalData.imageUrl + options.img
      });
    }
    wx.request({
      method: "post",
      url: app.globalData.publicUrl + 'api/financial/searchauto/successnum',
      data: {
        "id": options.claimid
      },
      success: (res) => {
        if (res.data.errcode == 0) {
          this.setData({
            num: res.data.data.num
          })
        }
      }
    })
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let finalid = this.data.claimid;
    wx.request({
      method: "get",
      url: app.globalData.publicUrl + 'api/financial/financeclaims/' + finalid,
      success: (res)  =>  {
        if (res.data.errcode  ==  0) {
          console.log(JSON.stringify(res));
          this.setData({
            loanDetail:res.data.data,
            video: app.globalData.imageUrl + res.data.data.video,
            ecode: res.data.data.ensure_id
          })
          wx.request({
            method: "get",
            url: app.globalData.publicUrl + 'api/financial/dictionary' ,
            data:{
              "code":this.data.ecode
            },
            success: (res) => {
              if (res.data.errcode == 0) {
                this.setData({
                  ecode: res.data.data[0].name
                })
              }
            }
          })
        }
      }
    })
    // 视频一进来 就全屏播放了
    // this.videoContext = wx.createVideoContext('myvideo', this);
    // this.videoContext.requestFullScreen({ direction: 90 });
  },


  
})