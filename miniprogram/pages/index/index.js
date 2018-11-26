import { Base64 } from 'js-base64'

//index.js
const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        imgUrl: '',
        imageProgress: 0,
        fileID: ''
    },

    onLoad: function () {
        console.log(Base64.encode('你好'))
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    onGetUserInfo: function (e) {
        console.log(e)
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

    addData: function () {
        wx.cloud.callFunction({
            name: 'add',
            data: {
                a: 2,
                b: 5
            },
            success(res) {
                console.log(res.result)
            },
            fail(err) {
                console.error(err)
            }
        })
    },

    getData: function () {
        wx.showLoading({
            title: 'Getting',
        })
        wx.cloud.callFunction({
            name: 'get',
            data: {},
            success: res => {
                console.log(res)
            },
            fail: err => {
                console.error(err)
            },
            complete: res => {
                wx.hideLoading()
            }
        })
    },

    updateData: function () {
        wx.showLoading({
            title: 'Updating',
        })
        wx.cloud.callFunction({
            name: 'update',
            data: {
                progress: 0
            },
            success: res => {
                console.log(res)
            },
            fail: err => {
                console.error(err)
            },
            complete: res => {
                wx.hideLoading()
            }
        })
    },

    removeData: function () {
        wx.showLoading({
            title: 'Deleting',
        })
        wx.cloud.callFunction({
            name: 'remove',
            data: {},
            success: res => {
                console.log(res)
            },
            fail: err => {
                console.error(err)
            },
            complete: res => {
                wx.hideLoading()
            }
        })
    },

    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log(res.result)
                app.globalData.openid = res.result.openid
                // wx.navigateTo({
                //     url: '../userConsole/userConsole',
                // })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                    url: '../deployFunctions/deployFunctions',
                })
            }
        })
    },

    doDownload: function () {
        const self = this

        wx.cloud.downloadFile({
            fileID: self.data.fileID,
            success(res) {
                self.setData({
                    imgUrl: res.tempFilePath
                })
            },
            complete(res) {
                console.log(res)
            }
        })
    },

    getUrl: function () {
        const self = this
        wx.cloud.getTempFileURL({
            fileList: [self.data.fileID],
        }).then(res => {
            console.log(res.fileList)
        })
    },

    deleteImage: function () {
        const self = this

        wx.cloud.deleteFile({
            fileList: [self.data.fileID],
            success: res => {
                console.log(res)
            }
        })
    },

    // 上传图片
    doUpload: function () {
        const self = this
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                wx.showLoading({
                    title: `${self.data.imageProgress}%`,
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)
                        self.setData({
                            fileID: res.fileID,
                        })
                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        // wx.navigateTo({
                        //     url: '../storageConsole/storageConsole'
                        // })
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
                console.error(e)
            }
        })
    },

})