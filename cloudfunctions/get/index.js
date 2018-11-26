// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
    let result = {}
    let count = 0
    await db.collection('todos')
        .doc('W_dcfUXacNtiP6qK')
        .get()
        .then(res => {
            result = res.data;
        })
    // await db.collection('todos')
    // .field({
    //     progress: true
    // })
    // .skip(1)
    // .limit(1)
    // .get()
    // .then(res => {
    //     result = res.data;
    // })

    await db.collection('todos')
        .count()
        .then(res => {
            count = res.total
        })

    return {
        result,
        count
    }
}