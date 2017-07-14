//get the required config by judging the process environment

const configdefault = './config-default.js';
const configtest = './config-test.js';
const configoverride = './config-override.js';

const fs = require('fs');

var config = null;

if(process.env.NODE_ENV === 'test'){
    console.log(`Load ${configtest}...`);
    config = require(configtest);
}else{
    console.log(`Load ${configdefault}...`);
    config = require(configdefault);

    try{//if file configoverride exists, load it and merge with configdefault
        if(fs.statSync(configoverride).isFile()){
            console.log(`Load ${configoverride}...`);
            config = Object.assign(config, require(configoverride));
        }
    }catch(err){
        console.log(`Cannot load ${configoverride}...`);
    }

}

module.exports = config;