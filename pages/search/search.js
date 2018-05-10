
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
    if (wx.getStorageSync("randMovie")) {// 本地如果有缓存，提前渲染
      that.setData({
        searchResult: wx.getStorageSync("randMovie")
      })
    }
    this.getRandMovie();

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
  getRandMovie: function () {
    console.log("getRandMovie");
    var that = this;
    wx.request({
      url: HOST + 'api/centernav/getRandMovie.php',
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          console.log("getRandMovie succeed");
          var randMovie = res.data
          that.setData({ // 再次渲染
            searchResult: randMovie
          })
          console.log("覆盖 randMovie 缓存数据")
          console.log(randMovie)
          wx.setStorageSync("randMovie", randMovie) // 覆盖缓存数据
        }
      },
      fail: function (e) {
        console.log("getRandMovie 请求失败"),
          console.log(e)
      }
    })
  },
  formBindsubmit:function(e){
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    });
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
            searchResult: searchResult,
            hiddenLoading: !that.data.hiddenLoading
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