const app = getApp()
import WxValidate from '../../utils/WxValidate';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, 
      showBack: 1, 
      title: '贷款产品',
      height: app.globalData.height * 2 + 20,
    },
    loanDetail:{},
    rateValue: 5,
    pid: '',
    money:'', //融资金额：
    use:'',  //融资用途：
    warehouseContent:'', //担保方式
    claims_min_term:'', //期望融资期限：
    claims_max_term:'',  //期望融资期限：
    mongey_min_rate:'', //期望利率范围：
    mongey_max_rate:'',  //期望利率范围：
    remarks:'', //补充信息：
    show: true,
    text:'请选择',
    warehouseContent: '点击选择', //输入框显示的内容
    index: null,
    objectArray: [
      { name: '保证', code: '2201' },
      { name: '抵押', code: '2202' },
      { name: '质押', code: '2203' },
    ],
    finalpic:'',
    finalcomtitle:'',
    finalnum:'',
    jg_id:'',
    jg_pro_id:'',
    finalecode:'',
    ensure_id:'',//担保方式code
  },
  
  loadDetail: function () {
    console.log(this.data.pid);
  },

  bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value,
      text:'',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    this.setData({
      finalpic: options.img,
      finalcomtitle: wx.getStorageSync('user').company_name,
      finalnum: options.num,
      jg_id: options.uid,
      jg_pro_id: options.id,
      finalecode: options.ecode,
    });
    this.loadDetail();
  },

  initValidate(){
    const rules = {
      money: {
          required: true,
          number: true,
      },
      use: {
          required: true,
      },
      claims_min_term: {
        required: true,
        number: true,
      },
      claims_max_term: {
        required: true,
        number: true,
      },
      mongey_min_rate: {
        required: true,
        number: true,
      },
      mongey_max_rate: {
        required: true,
        number: true,
      },
    };
    const messages = {
      money: {
        required: '请输入融资金额',
      },
      use: {
        required: '请输入融资用途',
      },
      claims_min_term: {
        required: '请输入期望融资期限最小值',
      },
      claims_max_term: {
        required: '请输入期望融资期限最大值',
      },
      mongey_min_rate: {
        required: '请输入期望利率最小值',
      },
      mongey_max_rate: {
        required: '请输入期望利率最大值',
      },
    };
     // 创建实例对象
     this.WxValidate = new WxValidate(rules, messages)
  },

  submitForm(e) {
    /***4-3(表单提交校验)*/
    const params = e.detail.value
    const id = e.detail.target.dataset.id
    if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
    }
    /*** 这里添写验证成功以后的逻辑**/
    
    //验证通过以后->
    this.submitInfo(params,id);
  },

     // form提交
  submitInfo(params,id) {
    let form = params;
    form.ensure_id = this.data.ensure_id;
    form.jg_id = this.data.jg_id;
    form.jg_pro_id = this.data.jg_pro_id;
    form.userid = wx.getStorageSync('user')._id;
    console.log('将要提交的表单信息：', form);
    this.toclamneed(form);
  },

  showModal(error) {
        wx.showModal({
            content: error.msg,
            showCancel: false,
        })
  },

  toclamneed(finaldata){
    wx.request({
      method: "POST",
      url: app.globalData.publicUrl + 'api/financial/claimneed',
      data:finaldata,
      success: (res) => {
        console.log(JSON.stringify(res)+"测试")
        if (res.data.errcode == 0) {
          //希望跳转过去的页面
          wx.redirectTo({
            url: '/pages/loanDetailapplysuccess/index?id=' + res.data.data._id + '&img=' + this.data.finalpic + '&num=' + this.data.finalnum              + '&ecode=' + this.data.finalecode + '&proid=' + this.data.jg_pro_id
          })
        }else{
          wx.showToast({
            title: '提交失败,请确认填写信息正确！！！',
            icon: "none"
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let finalid = this.data.jg_pro_id;
    wx.request({
      method: "get",
      url: app.globalData.publicUrl + 'api/financial/financeclaims/' + finalid,
      success: (res) => {
        if (res.data.errcode == 0) {
          this.setData({
            loanDetail: res.data.data,
            ensure_id: res.data.data.ensure_id,
          })
        }
      }
    })
  },

})