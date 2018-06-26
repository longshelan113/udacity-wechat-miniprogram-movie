// pages/preview/preview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    film: {},
    commentValue: '',
    voice: '',//音频 
  },

  getFilm(id) {
    wx.showLoading({
      title: '电影详情加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()

        let data = result.data
        if (!data.code) {
          this.setData({
            film: data.data
          })
        } else {
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

  //点击播放录音  
  goToPlay: function () {
    console.log(this.data.voice)
    var filePath = this.data.voice;
    //点击开始播放  
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilm(options.id)
    this.setData({
      commentValue: options.commentValue,
      voice: options.voice 
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