const path = require('path');
const mime = require('mime');
const mz = require('mz/fs');

function staticFiles(url, dir){
    return async (ctx, next)=>{
        let rpath = ctx.request.path;
        if(rpath.startsWith(url)){
            let filepath = path.join(dir, rpath.substring(url.length));
            if(await mz.exists(filepath)){
                ctx.response.type = mime.lookup(filepath);
                ctx.response.body = mz.readFile(filepath);
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next;
        }
    }
}

module.exports = staticFiles;