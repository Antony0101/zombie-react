import { Server } from "./helpers/server.js";
import {initFileRouter} from "./lib/node-file-router/index.js";

async function main(){
    const {initServer, closeServer} = Server();
    const routerPages = await initFileRouter({baseDir: './example/dist/app'});
    const routerApi = await initFileRouter({baseDir: './example/dist/api'});
    
    await initServer({port:3002, routerApi, routerPages});
}

main();
