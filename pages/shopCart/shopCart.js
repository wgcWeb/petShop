// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 100,
    cartList: [],
    isCheckedAll: false,
    totalPrice: 0,
    isNoResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartData();
  },

  /**
   * 获取购物车列表数据
   */
  getCartData() {
    let that = this;
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/getCardList',
      data: {
        userId: '32977'
      },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        let result = res.data;
        if (result && result.success && result.data.length>0) {
          that.setData({
            cartList: result.data,
            isNoResult: false
          })
        }else{
          that.setData({
            cartList: result.data,
            isNoResult: true
          })
        }
      },
    })
  },

  /**
   * 购物车的全选
   */
  checkAll() {
    let that = this;
    let isCheckedAll = !that.data.isCheckedAll
    that.setData({
      isCheckedAll: isCheckedAll
    })

    let list = that.data.cartList;
    let totalAmount = 0;
    list.forEach((item) => {
      // 全选选中
      if (isCheckedAll) {
        item.isChecked = true
        totalAmount += item.SaleAmount * item.Quantity
      } else {
        item.isChecked = false
        totalAmount = 0
      }
    })
    that.setData({
      cartList: list,
      totalPrice: totalAmount
    })
  },

  /**
   * 购物车的单选
   */
  checkboxChange(e) {
    let that = this;
    let ids = e.detail.value //获取到选中的值 数组
    let list = that.data.cartList
    let totalPrice = 0
    // 购物车商品总的循环
    list.forEach(item => {
      item.isChecked = false
      // 选中商品的循环
      ids.forEach(id => {
        // 如果选中的商品的id等于总的循环里面的id 进行价格的累加 ischecked设置为true
        if (item.Id == id) {
          totalPrice += item.SaleAmount * item.Quantity
          item.isChecked = true
        }
      })
    })
    let isAll = list.every(item => item.isChecked)

    that.setData({
      totalPrice: totalPrice,
      isCheckedAll: isAll
    })
    console.log(list);
    console.log(e.detail.value);
  },

  /**
   * 购物车的删除
   * 1.判断是否选择了商品,如果没有选择商品,提示用户请选择商品
   * 2.当用户已选择了商品,弹框提示用户是否确认删除,点击确认执行删除,点击取消取消删除
   */
  btnDel() {
    let that = this
    let totalCount = 0
    let selectIds = []
    // 循环获取选中商品的总数量,获取选中商品的GoodsId
    that.data.cartList.forEach(item => {
      if (item.isChecked) {
        totalCount += item.Quantity
        selectIds.push(item.GoodsId)
      }
    })
    // 当没有选择商品的时候
    if (totalCount == 0) {
      wx.showToast({
        title: '请选择商品',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗',
      success(res) {
        // 点击确认按钮
        if (res.confirm) {
          that.delCart(selectIds)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 删除功能,网络请求
   */
  delCart: function (selectIds) {
    let that = this
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/delCart',
      method: 'POST',
      data: {
        userId: '32977',
        ids: selectIds
      },
      success: function () {
        that.getCartData();
      }
    })
  },

  /**
   * 跳转首页
   */
  gotoHome(){
    wx.switchTab({
      url: '/pages/home/home',
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
    this.getCartData();
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