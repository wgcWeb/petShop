// pages/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: [],
    background: ['http://img.boqiicdn.com/Data/U/P/img5837591bfbb3dd49a.jpg', 'http://img.boqiicdn.com/Data/U/P/img9380591bfb8f73c86.jpg', 'http://img.boqiicdn.com/Data/U/P/img31935ef876e549dca.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    current: 0,
    goodsNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.goodsNo = options.goodsNo
    this.getDetailData()
  },

  /**
   * 获取商品详情页面数据接口
   */
  getDetailData: function(){
    let that = this;
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/getWXGoodsInfo', 
      data: {
        goodsNo: that.data.goodsNo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        let result = res.data
        if(result && result.data){
          that.setData({
            detailInfo: result.data
          })
        }
      }
    })
  },

  /***
   * 幻灯片切换事件
   */
  swiperChange: function(e){
    // console.log(e);
    let currentNum = e.detail.current;
    this.setData({
      current: currentNum
    })
  },

  /**
   * 图片的全屏预览
   */
  showImage: function(){
    wx.previewImage({
      current: this.data.detailInfo.SwiperImgList[this.data.current],
      urls: this.data.detailInfo.SwiperImgList 
    })
  },

  /**
   * 跳转到首页
   */
  jumpToHome: function(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  /**
   * 微信咨询
   */
  onCall: function(){
    wx.makePhoneCall({
      phoneNumber: '10086'
    })
  },

  /**
   * 跳转到购物车页面
   */
  jumpToCart: function(){
    wx.switchTab({
      url: '/pages/shopCart/shopCart'
    })
  },

  /**
   * 加入购物车
   */
  addToCart: function(){
    console.log('我是购物车');
    let that = this;
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/addCart',
      data: {
        userId: '32977', //用户id
        quantity: 1,  //数量
        goodsId: that.data.goodsNo,  //商品id
      },
      method: 'POST',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        if(res.data && res.data.success) {
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration:2000
          })
        }
      }
    })
  },

  /**
   * 立即购买
   */
  btnBuy: function(){
    console.log('立即购买');
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