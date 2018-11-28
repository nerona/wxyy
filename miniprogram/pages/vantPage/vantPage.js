import { runTest } from '../../utils/test.js'
 
// miniprogram/pages/vantPage/vantPage.js
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        runTest()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: 'Vant'
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log(this.route)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    onShareAppMessage: function(res) {
        console.log(res)
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        } else {
            console.log('menu')
        }
        return {
            title: '自定义转发标题',
            path: '/page/user?id=123'
        }
    },

    onPullDownRefresh: function() {
        console.log('refresh')
    },

    onReachBottom: function() {
        console.log('bottom')
    },

    getData: function() {
        wx.showLoading({
            title: 'Loading',
        })
        wx.cloud.callFunction({
            name: 'get'
        }).then(res => {
            wx.hideLoading();
            console.log(res)
        }).catch(err => {
            wx.hideLoading();
            console.error(err)
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})