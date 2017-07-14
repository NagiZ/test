const model = require('./model');

let
    Blog = model.Blog,
    User = model.User;

(async () => {
    var blog, user;
    try{
        user = await User.create({
            email: 'nagino1@example.com',
            name: 'Nagino1',
            password: 'lmx030416',
            gender: false
        });
       blog = await Blog.create({
            title: '验证blog',
            gender: false,
            article: `尝试用mysql和node做一个本地blog,
            大概能行。。。`,
        });
        
    }catch(e){
        console.log(e);
    }
})();

module.exports = {
    blog: Blog,
    users: User
}