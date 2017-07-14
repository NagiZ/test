const db = require('../db');//这样分开只能映射单用户。对于多用户要怎么存还是个问题

module.exports = db.defineModel('blog', {
    title: {
        type: db.STRING(100),
        unique: true
    },
    article: db.STRING(100),
    gender: db.BOOLEAN
});