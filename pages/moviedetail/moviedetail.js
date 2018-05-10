// pages/moviedetail/moviedetail.js
var app = getApp()
const HOST = getApp().globalData.HOST
const baiDuYun= { }
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.currentTarget.dataset.url, )
    }
    return {
      title: '爱电影',
      desc: '电影资源分享!',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
    baiDuYun: {
      url: "",
      passWord: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("百度云",baiDuYun)
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
    var that = this
    that.setData({
      id: options.id
    })
    console.log("id", options.id)
    that.getMovieDetail(options.id)

    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
  },

  getMovieDetail: function (id) {
    console.log("getMovieDetail");
    var that = this;
    wx.request({
      url: HOST + 'api/centernav/getMovieDetail.php',
      method: 'GET',
      data:{
        id:id
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("getMovieDetail succeed");
          var movieDetail = res.data
          that.setData({ // 再次渲染
            movieDetail: movieDetail
          })
          console.log("覆盖 movieDetail 缓存数据")
          console.log(movieDetail)
          wx.setStorageSync("movieDetail", movieDetail) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getMovieDetail 请求失败"),
          console.log(e)
      }
    })
  },
  /*在线链接复制到剪切板*/
  setClipboardDataOnLine: function (data) {
    //console.log(data.currentTarget.dataset)    
    wx.setClipboardData({
      data: "http://video.eyunzhu.com/?mode=search&k=" + data.currentTarget.dataset.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log("成功复制内容", res.data) // data
            wx.showToast({
              title: "复制成功",
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  /*百度云链接复制到剪切板*/
  setClipboardDataBaiDuYun: function (data) {
    //console.log(data.currentTarget.dataset)    
    wx.setClipboardData({
      data: data.currentTarget.dataset.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log("成功复制内容", res.data) // data
            wx.showToast({
              title: "复制成功",
              icon: 'success',
              duration: 2000
            })
          }
        })
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