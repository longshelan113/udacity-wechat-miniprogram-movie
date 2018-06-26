// pages/detail/detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    film: {},
    tempFilePaths: ''
  },

  getFilm(id){
    wx.showLoading({
      title: '电影详情加载中...',
    })

    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        if(!data.code){
          this.setData({
            film: data.data
          })
        } else{
          wx.showToast({
            icon: 'none',
            title: '电影详情加载错误',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '电影详情加载错误',
        })
      }
    })
  },

  addCommentAction: function (event) {
    wx.showActionSheet({
      itemList: ['文字', '语音'],
      success: function (res) {
        if(!res.cancel){
          let id = event.currentTarget.dataset.id
          let title = event.currentTarget.dataset.title
          let image = event.currentTarget.dataset.image
          wx.navigateTo({
            url: `/pages/add-comment/add-comment?id=${id}`,
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilm(options.id)
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