const Koa = require('koa');
const templating = require('./templating');
const controller = require('./controller');
const bodyParser = require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

if(!isProduction){
    let staticFile = require('./static-files');
    app.use(staticFile('/static/', __dirname + '/static'));
};

app.use(bodyParser());

app.use(templating('views', {
    watch: !isProduction,
    noCache: !isProduction
}));

app.use(controller());

app.listen(3000);

console.log('Server starts on port 3000');