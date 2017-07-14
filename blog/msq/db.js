const Sequelize = require('sequelize');
const uuid = require('uuid/v4');//get the unique ID 
const config = require('./config.js');

console.log('Init sequelize...');

function generateId() {
    return uuid();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);//统一主键

function defineModel(name, attributes){
    //第一部分起转化，即统一作用
    var attrs = {};
    for(let key in attributes){
        var avalue = attributes[key];
        if(typeof avalue ==='object' &&  avalue['type']){//属性值形式为对象，同时存在type属性
            avalue.allowNull = avalue.allowNull||false;
            attrs[key] = avalue;
        }else{
            attrs[key] = {
                type: avalue,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };

    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    
    //返回一个define出来的模块；
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks:{//钩子函数，在模型生命周期的特殊时刻被调用的函数
            beforeValidate: function(obj){//传入的参数怎么识别，还是默认this//define返回的model？
                let now = Date.now();
                if(obj.isNewRecord){//是否新记录
                    console.log('Will create entity...' + obj);
                    if(!obj.id){
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    console.log('Will update entity...');
                    obj.updatedAt = now;
                    obj.version++;
                }

            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: ()=>{
        if(process.env.NODE_ENV!=='production'){
           return sequelize.sync({force: true});//创建表前，先删除原表
        }else{
            throw new Error('Cannot sync() when NODE_ENV is not \'production\'.');
        }
    }
};

for(let type of TYPES){
    exp[type] = Sequelize[type];
}
//这一块没看懂
exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;