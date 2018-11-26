// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const {
        OPENID,
        APPID,
        UNIONID
    } = cloud.getWXContext()

    let result = {};
    await db.collection('todos').add({
        data: {
            done: false,
            progress: 50
        }
    }).then(res => {
        result = res
    })

    return {
        OPENID,
        APPID,
        UNIONID,
        sum: event.a + event.b,
        result: result
    }
}