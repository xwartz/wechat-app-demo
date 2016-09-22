var util = require('../../../util/util.js')
var dataUrl = 'http://ws.stream.qqmusic.qq.com/C100001wmp4t06stlC.m4a?fromtag=38'
Page({
  onLoad: function () {
    var that = this
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playing: false,
        playTime: 0,
        formatedPlayTime: '00:00:00'
      })
    })
  },
  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  },
  play: function (res) {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: dataUrl,
      title: 'Lost Stars',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R150x150M000000Jhxf24CFL06.jpg?max_age=2592000',
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
  },
  seek: function (e) {
    clearInterval(this.updateInterval)
    var that = this
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete: function () {
        // 实际会延迟两秒左右才跳过去
        setTimeout(function () {
          that._enableInterval()
        }, 2000)
      }
    })
  },
  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
  },
  stop: function () {
    var that = this
    wx.stopBackgroundAudio({
      success: function (res) {
        that.setData({
          playing: false,
          playTime: 0,
          formatedPlayTime: util.formatTime(0)
        })
      }
    })
  },
  _enableInterval: function () {
    var that = this
    update()
    this.updateInterval = setInterval(update, 500)
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition + 1)
          })
        }
      })
    }
  },
  onUnload: function () {
    clearInterval(this.updateInterval)
  }
})
