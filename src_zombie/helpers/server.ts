import { once } from 'events';
import express from 'express';
import { fileURLToPath } from 'url'

let __filename = fileURLToPath(import.meta.url)

function Server(){
    const app = express();
    let server: any;
    async function initServer(params:{port:number, routerApi?: express.Router | express.RequestHandler, routerPages?:express.Router | express.RequestHandler}){
        if(params.routerApi){
            app.use('/api', params.routerApi);
        }
        else{
            app.get('/api', (req, res) => {
                res.send('API not found');
            });
        }
        if(params.routerPages){
            app.use('/', params.routerPages);
        }
        else{
            app.get('/', (req, res) => {
                res.send('Routers not found');
            });
        }
        server = app.listen(params.port, () => {
            console.log(`Server is running on http://localhost:${params.port}`);
        });3000
        await once(server, 'listening');
        console.log('Server is ready');
    }
    async function closeServer(){
        await server.close();
    }
    return {initServer, closeServer};
}

let entryFile = process.argv?.[1];
console.log(entryFile);
console.log(__filename);

if (entryFile === __filename) {
    const {initServer} = Server();
    initServer({port:3000,routerApi: undefined, routerPages: undefined});
}

export {Server};

