// pages/index/index.js
var app = getApp()
const HOST = getApp().globalData.HOST
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdverInfo();//从后端获取centerNavInfo
    this.getCenterNavInfo();//从后端获取centerNavInfo
  },
  getCenterNavInfo: function () {
    var that = this;
    wx.request({
      url: HOST + '/api/index/getCenterNavInfo.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var centerNavInfo = res.data
          that.setData({ // 再次渲染
            centerNavInfo: centerNavInfo
          })
          console.log("覆盖centerNavInfo缓存数据")
          console.log(centerNavInfo)
          wx.setStorageSync("centerNavInfo", centerNavInfo) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getCenterNavInfo请求失败"),
          console.log(e)
      }
    })
  },
  getAdverInfo: function () {
    var that = this;
    wx.request({
      url: HOST + '/api/index/getAdverInfo.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var adverInfo = res.data
          that.setData({ // 再次渲染
            adverInfo: adverInfo
          })
          console.log("覆盖adverInfo缓存数据")
          console.log(adverInfo)
          wx.setStorageSync("adverInfo", adverInfo) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getAdverInfo请求失败"),
          console.log(e)
      }
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