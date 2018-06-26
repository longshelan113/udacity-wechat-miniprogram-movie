// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favCommsList:[{
      id: 1,
      filmId: 1,
      filmImage: '/images/p2517753454.png',
      filmTitle: '复仇者联盟3：无限战争',
      userId: 1,
      userName: '徐妍',
      comment: ''
    },{
      id: 2,
      filmId: 1,
      filmImage: '/images/p2517753454.png',
      filmTitle: '复仇者联盟3：无限战争',
      userId: 2,
      userName: '培松',
      comment: '比一个科技领先全世界n年的国家，堪比黑科技般...'
    }]
  },

  goToHome(){
    wx.navigateBack({
      url: '/pages/home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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