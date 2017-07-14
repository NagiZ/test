const fs = require('fs');

function addMapping(router, mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path, mapping[url]);
        }else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        }else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
        }else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
        }else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir){
    fs.readdirSync(__dirname + '/' + dir).filter((file)=>{
        return file.endsWith('.js');
    }).forEach((value)=>{
        let mapping = require(__dirname + '/' + dir + '/' + value);
        addMapping(router, mapping);
    });
}

function controller(dir){
    let ctrls_dir = dir||'controllers',
        router = require('koa-router')();
    addControllers(router, ctrls_dir);
    return router.routes();
}

module.exports = controller;