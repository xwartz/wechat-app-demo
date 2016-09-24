Page({
  data : {
    longitude:0,
    latitude:0
  },
  onLoad: function() {
    that = this;
    wx.getLocation({
        success: function (res) {
          location = res
          console.log(res)
          that.data.longitude = res.longitude
          that.data.latitude = res.latitude
        }
      })
  },
  openLocation: function (e) {
    console.log(e)
    var value = e.detail.value
    console.log(value)
    
    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude),
      name: value.name,
      address: value.address
    })
  }
})
