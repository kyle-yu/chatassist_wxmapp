//index.js
//var websocket = require('../../utils/mywebsocket.js');
//获取应用实例
var app = getApp()
var user = {}
const br = '\n'
const say = ' 说: '
const botname = '虚拟助理'
const maxline = 13
var chathist = []

//const Tuling123 = require('../../utils/tuling123client.js')
const API_URL = 'http://www.tuling123.com/openapi/api'
const TULING123_API_KEY = <your key>
//const brain = new Tuling123(TULING123_API_KEY)

Page({
  data: {
    message : '',
    text : '',
    textarray : chathist,
    bvalue: ''
  },
  bindChange: function(e) {
    message = e.detail.value
    this.data.message = message
  },
  //事件处理函数
  add: function(e) {
    var reply = '' 
    this.ask(this.data.message)
    .then(res=>{
      //console.log(res.data)
      reply = res.data.text
      var isay = user.nickName + say + this.data.message
      var botsay = botname + say + reply
      if (chathist.length>maxline) {
        chathist.shift()
      }
      chathist.push(isay)
      if (chathist.length>maxline) {
        chathist.shift()
      }
      chathist.push(botsay)
      var ntext = this.changeToString(chathist)
      this.setData({text:ntext})
      this.setData({bvalue:''})      
    })
  },
  changeToString: function(hist) {
    var strhist = ''
    for(var i=0;i<hist.length;i++){
      strhist += hist[i] + br
    }
    return strhist
  },
  ask: function(info){
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${API_URL}`,
        data: {key:TULING123_API_KEY, info:info},
        header: { 'Content-Type': 'application/json' },
        success: resolve,
        fail: reject
      })
    })
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    var that = this
    app.getUserInfo(function(userInfo){
      user = userInfo;
      var ltext = 'Dear ' + user.nickName + ', my Lord. Orz~' + br
      chathist.push('Dear ' + user.nickName + ', my Lord. Orz~')
      that.setData({
        text:ltext
      })
    })
  }
})
