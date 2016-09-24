var example = require('./example.js')

Page({
  onLoad: function () {
    this.context = wx.createContext()

    var methods = Object.keys(example)
    this.setData({
      methods: methods
    })

    var that = this
    methods.forEach(function (method) {
      that[method] = function () {
        example[method](that.context)
        wx.drawCanvas({
          canvasId: 'canvas',
          actions: that.context.getActions()
        })
      }
    })
  }
})
