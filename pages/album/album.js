// pages/album/album.js
var app = getApp();
var flag = false;
Page({


  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.chooseImage({
      sourceType: ['album'],
      success: function(res) {
        console.log(res);
    
        // setTimeout(function(){ 
        //   wx.reLaunch({
        //     url: '../webview/webview?image=' + res.tempFilePaths[0],
        //   })
        // },200)
        wx.uploadFile({
          url: 'https://jiaoxue.maaee.com/Excoord_Upload_Server/file/upload',
          filePath: res.tempFilePaths[0],
          name: 'uploadfile_ant',
          formData: {
            'imgIndex': 1
          },
          header: {  
            "Content-Type": "multipart/form-data"
          },
          success: (res) => {
            console.log('跳转');
            flag = false;
            wx.reLaunch({
              url: '../webview/webview?image=' + res.data+'&storage=true',
            })

          },
          fail: (res) => {
            console.log(res);
          },
        })
      },
      complete: function() {
        // wx.reLaunch({
        //   url: '../webview/webview?image=null',
        // })
        
      },
      cancel:function(){
        console.log('cancel')
        wx.navigateBack({});
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('出发onSHOW事件');
    if (flag) {
      // wx.reLaunch({
      //   url: '../webview/webview?image=null',
      // })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('触发onHide')
    flag = true;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})