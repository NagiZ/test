/*require('babel-core/register')({
    presets: ['stage-3']
});*/

//在运行node init-db.js之前设置NODE_ENV，win下是命令行set NODE_ENV=test。linux和mac是export命令。

const model = require('./model.js');

model.sync().then(()=>{
    console.log('init on ok...');
    process.exit(0);
}).catch((err)=>{
    console.log('Error: ' + err);
    process.exit(0);
})
