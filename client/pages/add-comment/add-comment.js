// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
var interval

Page({

  /**
   * 页面的初始数据
   */
  data: {
    film: {},
    commentValue: '',
    j: 1,//帧动画初始图片  
    isSpeaking: false,//是否正在说话  
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

  onInput(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  goToPreview() {
    console.log(this.data.voice)
    if (!this.data.commentValue && !this.data.voice){
      wx.showToast({
        icon: 'none',
        title: '请填写文字评论或进行语音评论',
      })
    }else{
      wx.navigateTo({
        url: `/pages/preview/preview?id=${this.data.film.id}&commentValue=${this.data.commentValue}&voice=${this.data.voice}`,
      })
    }
  },

  startRecordOnTap: function() {
    console.log("手指按下了...") 
    speaking.call(this);
    var _this = this; 
    this.setData({
      isSpeaking: true
    })
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)  
        //持久保存  
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            //持久路径  
            //本地文件存储的大小限制为 100M  
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
            _this.setData({
              voice: savedFilePath
            })
          }
        })  

        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })  
      },
      fail: function (res) {
        //录音失败  
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        }) 
      }
    })
  },

  stopRecordOnTap: function () {
    console.log("手指抬起了...") 
    this.setData({
      isSpeaking: false,
    }) 
    wx.stopRecord()
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

//麦克风帧动画  
function speaking() {
  var _this = this;
  //话筒帧动画  
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}