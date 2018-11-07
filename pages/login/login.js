var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //验证码placeholder样式
    sendCodePlaceholder: 'input_palceholder',
    phonePlaceholder: 'input_palceholder',
    //接受到的验证码
    sendCode: '',
    time: 10,
    sendFlag: true,
    // buttonText:'立即绑定',
    // 按钮变换形态
    buttonChange: false,
    height:0
  },

  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res)=> {
        console.log(res);
        this.setData({
          height: res.windowHeight,
        })
      },
    })
  },

  //验证码input框获取焦点事件
  sendCodeFocus: function (e) {
    this.setData({
      sendCodePlaceholder: 'input_palceholder_focus',
    })
  },
  sendCodeBlur: function (e) {
    if (e.detail.value == '') {
      this.setData({
        sendCodePlaceholder: 'input_palceholder',
      })
    }
  },
  //手机号input框获取焦点事件
  phoneFocus: function (e) {
    this.setData({
      phonePlaceholder: 'input_palceholder_focus',
    })

  },
  //手机号input失去焦点事件
  phoneBlur: function (e) {
    // console.log(e);
    if (e.detail.value == '') {
      this.setData({
        phonePlaceholder: 'input_palceholder',
      })
    } else {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  //验证码输入事件
  sendCodeInput: function (e) {
    // console.log(e);
    this.setData({
      sendCode: e.detail.value
    })
  },

  //表单提交事件
  formSubmit: function (e) {
    console.log('手机号:' + e.detail.value.phone);
    console.log('输入的验证码:' + e.detail.value.sendCode);
    let warn = '';
    if (e.detail.value.phone == '') {
      warn = '账号不能为空!';
    }
    else if (e.detail.value.sendCode == '') {
      warn = '密码不能为空!';
    }
    if (warn != '') {
      wx.showModal({
        title: '温馨提示',
        content: warn,
        showCancel: false,
      });
      return;
    }
    //按钮形态变换开启
    this.setData({
      buttonChange: true,
    })

console.log('发送请求')
    wx.request({
      // url: 'https://www.maaee.com/Excoord_For_Education/webservice',
      url: app.globalData.domin,
      data:{
        params: JSON.stringify({
          "method": "login",
          "username": e.detail.value.phone,
          "password": e.detail.value.sendCode
        })
      },
      method: "POST",
      header: {
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
      },
      success: res => {
        console.log(res);
        console.log('请求成功')
        if(res.data.success){
          console.log(res.data.response);
          wx.setStorageSync('userInfo', res.data.response);
          wx.setStorageSync('password', e.detail.value.sendCode);
          console.log('写入缓存');
          setTimeout(()=>{
            wx.navigateTo({
              url: '../gradeList/gradeList',
            })
          },2000)
        }else{
          this.setData({
            buttonChange: false,
          },()=>{
            wx.showModal({
              title: '温馨提示',
              content: res.data.msg,
              showCancel: false,
            });
          })
        }
        
      }
    })
  }
})