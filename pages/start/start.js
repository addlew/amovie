// pages/start/start.js
var app = getApp()
const HOST = getApp().globalData.HOST
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this

    //判断本地缓存startImg是否为空并验证是否有效
    var startImg = wx.getStorageSync('startImg')
    if (startImg != '') {
      console.log("缓存startImg")
      console.log(startImg)
      wx.request({
        url: HOST + 'api/index/getStartImg.php',
        success: function (e) {
          console.log("获取的startImg")
          console.log(e.data)

          var startImg0 = "'" + startImg + "'";
          var startImg1 = "'" + e.data + "'";

          console.log("开始判断")
          console.log("startImg", startImg)
          console.log("e.data", e.data)
          if (startImg0 == startImg1) {
            console.log("本地缓存 startImg与服务器一致，跳转首页")
            wx.switchTab({
              url: '../index/index'
            })            
          } else
            console.log("本地缓存 startImg与服务器不一致")
          that.getStartImg();//从后端获取startImg
        }
      })

    } else{
      console.log("本地缓存 startImg为空")
      that.getStartImg();//从后端获取startImg
    }
     

  },


  getStartImg: function () {
    var that = this;
    wx.request({
      url: HOST + 'api/index/getStartImg.php',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var startImg = res.data
          that.setData({ // 再次渲染
            startImg: startImg
          })
          console.log("覆盖startImg缓存数据")
          console.log(startImg)
          wx.setStorageSync("startImg", startImg) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getStartImg请求失败"),
          console.log(e)
      }
    })
  },
  handleStart() {
    wx.switchTab({
      url: '../index/index'
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