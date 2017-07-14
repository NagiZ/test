//渲染html页面用
const nunjucks = require('nunjucks');

function createEnr(path, opts){
    var autoescape = opts.autoescape===undefined? true:opts.autoescape,
        watch = opts.watch||false,
        noCache = opts.noCache||false,
        throwOnUndefined = opts.throwOnUndefined||false;
    var enr = new nunjucks.Environment(new nunjucks.FileSystemLoader(path, {
        watch: watch,
        noCache: noCache
    }), {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined
    });
    //额外的过滤器
    if(opts.filters){
        for(var f in opts.filters){
            enr.addFilter(f, opts.filters[f]);
        }
    }
    return enr;
}

function templating(path, opts){
    var enr = createEnr(path, opts);
    return async (ctx, next)=>{
        ctx.render = (view, model)=>{
            ctx.response.type = 'text/html';
            ctx.response.body = enr.render(view, Object.assign({}, ctx.state||{}, model||{}));
        }
        await next;
    }
}

module.exports = templating;