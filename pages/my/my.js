// pages/my/my.js
/**
 * 1.未登录
 * 2.点击授权弹窗,获取用户信息,将用户信息存储起来
 * 3.当进入的页面的时候,去判断用户信息是否存在,如果存在直接使用
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地用户信息
    let userInfo = wx.getStorageSync('userInfo')
    // 判断用户信息是否存在
    if(userInfo){
      this.setData({
        user: userInfo
      })
    }
  },

  /**
   * 获取用户信息
   */
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    this.setData({
      user: e.detail.userInfo
    })

    wx.setStorageSync('userInfo', e.detail.userInfo)
  },

  // 跳转到订单页面
  jumpOrder(){
    wx.switchTab({
      url: '/pages/order/order'
    })
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