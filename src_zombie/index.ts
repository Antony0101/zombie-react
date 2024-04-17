import { Server } from "./helpers/server.js";
import {initFileRouter} from "./lib/node-file-router/index.js";
import * as path from 'node:path';
import * as process from 'node:process';

async function main(){
    const configPath = path.join(process.cwd(), 'zombie.config.json');
    // import config from './zombie.config.json';
    let config = {};
    try{
        config = (await import(configPath, {assert: {type: 'json'}})).default;
    }
    catch(e){
        console.error('Error loading config file', e);
    }
    console.log(config,"hello");
    const {initServer, closeServer} = Server();
    const routerPages = await initFileRouter({baseDir: 'example/dist/app'});
    const routerApi = await initFileRouter({baseDir: 'example/dist/api'});
    
    await initServer({port:3002, routerApi, routerPages});
}

main();
