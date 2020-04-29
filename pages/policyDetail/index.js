const request = require('../../utils/request.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 0, //是否显示左上角图标，消息中心   1表示显示    0表示不显示
            showBack: 1, //返回
            title: '政策解读', //导航栏 中间的标题
            // 此页面 页面内容距最顶部的距离
            height: app.globalData.height * 2 + 20,
        },
        policyDetail: {},
        pid: '',
    },
    getDate(val, formatStr) {
        if (val) {
            return this.format(new Date(Number(val)), formatStr);
        }
        return '';
    },
    format(date, formatStr) {
        formatStr = formatStr.replace(/yyyy|YYYY/, date.getFullYear());
        formatStr = formatStr.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        formatStr = formatStr.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        return formatStr;
    },
    loadDetail: function () {
        console.log(this.data.pid);
        request.fetch({
            url: 'api/financial/tPolicyInterpretation',
            id: this.data.pid,
        }).then((res) => {
            if (res.data.data.image) {
                res.data.data.image = request.imageUrl + res.data.data.image
            }
            if (res.data.data.publish_time) {
                res.data.data.publish_time = this.getDate(res.data.data.publish_time, 'yyyy.MM.dd')
            } else {
                res.data.data.publish_time = '';
            }
            if (res.data.data.description) {
                let reg = /src="/g;
                res.data.data.description = res.data.data.description.replace(reg,'src="'+request.imageUrl)
            }
            this.setData({
                policyDetail: res.data.data
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            pid: options.id
        });
        this.loadDetail();
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
