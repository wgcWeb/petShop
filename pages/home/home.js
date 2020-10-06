// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['http://img.boqiicdn.com/Data/U/P/img5837591bfbb3dd49a.jpg', 'http://img.boqiicdn.com/Data/U/P/img9380591bfb8f73c86.jpg', 'http://img.boqiicdn.com/Data/U/P/img31935ef876e549dca.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    goodsList: ['全部', '狗粮', '猫粮', '零食', '玩具', '保健', '小宠', '水族', '爬虫', '其他'],
    currentIndex: 0,
    goodsData: [],
    pageNo: 1,
    pageSize: 10,
    isComplete: false
  },
  go: function(e){
    let index = e.currentTarget.dataset.index

    this.setData({
      currentIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsData();
  },
  // 获取商品列表
  getGoodsData: function(){
    let that = this;
    // 显示加载状态
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://ys.lumingx.com/api/manage/GoodsList',
      data: {
        pageNo: that.data.pageNo,
        pageSize: that.data.pageSize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // 隐藏loading状态
        wx.hideLoading();
        // 停止加载
        wx.hideNavigationBarLoading();
        // 停止下拉
        wx.stopPullDownRefresh();
        console.log(res.data)
        let result = res.data
        // 有值的时候
        if(result.success && result.data.length>0) {
          // 已经存在的数据和最新返回的数据进行合并
          let newData = that.data.goodsData.concat(result.data);
          that.setData({
            goodsData: newData
          })
        }else {
          that.setData({
            isComplete: true
          })
        }
      }
    })
  },
  // 跳转到商品详情页
  jumpDetail: function(e){
    console.log(e);
    // 1.点击商品获取当前商品的数据 (商品id)
    // 2.跳转到商品详情页,将商品id传给商品详情页
    let goodsNo=e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: "/pages/detail/detail?goodsNo=" + goodsNo
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
    // 加载动画
    wx.showNavigationBarLoading();
    // 重置页数为1
    this.data.pageNo = 1;
    // 清除原来的商品数据
    this.data.goodsData = [];
    // 重新请求数据
    this.getGoodsData();
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNo++;
    this.getGoodsData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})