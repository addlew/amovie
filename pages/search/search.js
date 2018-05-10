
var app = getApp()
const HOST = getApp().globalData.HOST
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });

    var that = this
    if (wx.getStorageSync("top250")) {// 本地如果有缓存，提前渲染
      that.setData({
        top250: wx.getStorageSync("top250")
      })
    }
    this.getTop250();

    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
  },
  goMovieDetail: function (e) {
    // console.log("弹出框", e.currentTarget.dataset)
    wx.navigateTo({
      url: '../moviedetail/moviedetail?id=' + e.currentTarget.dataset.movie_id
    })
  },
  getTop250: function () {
    console.log("getTop250");
    var that = this;
    wx.request({
      url: HOST + 'api/centernav/getTop250.php',
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("getTop250 succeed");
          var top250 = res.data.subjects
          that.setData({ // 再次渲染
            top250: top250
          })
          console.log("覆盖top250缓存数据")
          console.log(top250)
          wx.setStorageSync("top250", top250) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getTop250请求失败"),
          console.log(e)
      }
    })
  },
  formBindsubmit:function(e){
    console.log(e.detail.value.searchInput)
    var that = this;
    wx.request({
      url: HOST + 'api/centernav/getSearchResult.php',
      data:{
        searchInput: e.detail.value.searchInput
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("getSearchResult succeed");
          var searchResult = res.data.subjects
          that.setData({ // 再次渲染
            searchResult: searchResult
          })
          console.log("覆盖 searchResult 缓存数据")
          console.log(searchResult)
          wx.setStorageSync("searchResult", searchResult) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getSearchResult 请求失败"),
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