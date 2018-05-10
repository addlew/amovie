// pages/centernav/nav0/nav0.js
var app = getApp()
const HOST = getApp().globalData.HOST
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true ,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      hiddenLoading: !that.data.hiddenLoading
    })    
    if (wx.getStorageSync("inTheaters")) {// 本地如果有缓存，提前渲染
      that.setData({
        inTheaters: wx.getStorageSync("inTheaters")
      })
    }
    this.getInTheaters()
    this.setData({
      hiddenLoading: !that.data.hiddenLoading
    })
  },
  goMovieDetail: function (e) {
    // console.log("弹出框", e.currentTarget.dataset)
    wx.navigateTo({
      url: '../../moviedetail/moviedetail?id=' + e.currentTarget.dataset.movie_id
    })
  },
  getInTheaters: function () {   
    console.log("getInTheaters");
    var that = this;
    wx.request({
      url: HOST +'api/centernav/getInTheaters.php',
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("getInTheaters succeed");
          var inTheaters = res.data.subjects
          that.setData({ // 再次渲染
            inTheaters: inTheaters
          })
          console.log("覆盖inTheaters缓存数据")
          console.log(inTheaters)
          wx.setStorageSync("inTheaters", inTheaters) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getInTheaters 请求失败"),
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