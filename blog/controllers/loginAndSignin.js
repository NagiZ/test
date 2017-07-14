const models = require('../msq/msqapp');

let User = models.users,
    Blog = models.blog;           

module.exports = {
    'POST /signin': async(ctx, next)=>{
        var email = ctx.request.body.email,
            password = ctx.request.body.email;
        var userIn = await User.findAll({
            where:{
                email: email
            },
        });
        console.log('用户的name是：' + userIn[0].name);
        if(userIn[0].password==password){
            ctx.render('signin.html',{
                title: userIn[0].name + '的博客',
                name: userIn[0].name,
            });
        }else{
            ctx.render('signin-failed.html',{
                title: '登入失败'
            });
        }
    },

    'POST /login': async(ctx, next)=>{
        var email = ctx.request.body.email,
            name = ctx.request.body.name,
            password = ctx.request.body.password;//应该还要判断是否重复
        (async()=>{
            var newUser = await User.create({
                name: name,
                email: email,
                password: password,
                gender: false
            }) 
        })();
        ctx.render('loginIn-ok.html', {
            title: '注册成功',
            name: name
        });
    }
}