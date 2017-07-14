const models = require('../msq/msqapp');

let User = models.users,
    Blog = models.blog;

module.exports = {
    'POST /upload': async()=>{
        let article = ctx.request.body.article,
            title = ctx.request.body.title;
        (async()=>{
            var newArticle = await Blog.create({
                title: title,
                article: article
            })
        })
    }
}