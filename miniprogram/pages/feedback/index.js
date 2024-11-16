const app = getApp() // 全局APP

Page({
	data: {
    text: '',
    files: [],
    sourceFiles: [],
    isLoading: false,
    roomId: '',
  },
  
  onLoad(options) {
    console.log("options", options)
    const roomId = options.room_id;
    this.setData({
        uploadFile: this.uploadFile.bind(this),
        roomId
    })
  },
  uploadFile(files) {
    console.log('upload files', files)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve({
            urls: files.tempFilePaths
          })
      }, 1000)
    })
  },
  uploadError(e) {
      console.log('upload error', e)
  },
  uploadSuccess(e) {
    console.log("uploadSuccess url", e, JSON.stringify(this.data.files))
    const urls = e.detail.urls
    if(urls) {
      this.setData({
        sourceFiles: [...this.data.sourceFiles, ...urls]
      });
    }
  },
  deletePic(e) {
    const index = e.detail.index
    const sourceFiles = this.data.sourceFiles;
    sourceFiles.splice(index, 1);
    this.setData({
      sourceFiles: sourceFiles
    });
  },
  onTextAreaChange(e) {
    this.setData({
      text: e.detail.value
    })
  },
  uploadPromise(filepath) {
    console.log("upload", filepath)
    return new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        cloudPath: String(Date.now()), // 上传至云端的路径
        filePath: filepath, // 小程序临时文件路径
        success: res => {
          resolve(res.fileID)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  },
  onSubmit(e) {
    if(this.data.isLoading) return;
    if(this.data.text && this.data.roomId) {
      console.log("onSubmit", this.data.sourceFiles, this.data.text)
      this.setData({ isLoading: true });
      wx.showLoading({
        title: '上传中',
      })      
      const promises = this.data.sourceFiles.map((file) => this.uploadPromise(file))
      Promise.all(promises)
        .then((res) => {
          wx.hideLoading()
          app.call({ name: 'submit_feedback', data: { 
           content: this.data.text,
           images: res,
           room_id: this.data.roomId
          }}).then((result) => {
            console.log("zsy请求成功", result)
            this.setData({ isLoading: false });
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index',  // 首页页面路径
                success() {
                  console.log('成功跳转到首页');
                },
                fail(err) {
                  console.error('跳转失败', err);
                }
              });
            }, 2000)
          }).catch((e) => {
            console.log("请求失败", e)
            wx.hideLoading()
            wx.showToast({
              title: '请求失败',
              icon: 'error',
              duration: 2000
            })
            this.setData({ isLoading: false });
          })
        }).catch((e) => {
          wx.hideLoading()
          wx.showToast({
            title: '图片上传失败',
            icon: 'error',
            duration: 2000
          })
          console.log("上传失败", e)
          this.setData({ isLoading: false });
        })
    } else {
      wx.showToast({
        title: '请填写反馈',
        icon: 'error',
        duration: 2000
      })
    }
  },
})