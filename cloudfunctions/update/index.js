// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    let reult

    const {
        OPENID
    } = cloud.getWXContext()

    await db.collection('todos')
        .doc('W_dcfUXacNtiP6qK')
        .update({
            data: {
                style: {
                    color: 'red'
                },
                tags: ['Mini', 'App']
            },
        }).then(res => {
            result = res
        })

    // await db.collection('todos')
    //     .doc('W_dcfUXacNtiP6qK')
    //     .update({
    //         data: {
    //             createdAt: db.serverDate(),
    //             location: new db.Geo.Point(111.11111, 22.22222)
    //         },
    //     }).then(res => {
    //         result = res
    //     })

    return result
}