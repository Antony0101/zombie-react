import { describe, expect, test, beforeAll,  } from "vitest";

import {Server} from "../../src_zombie/helpers/server.js";
import express from "express";

describe("Server First", () => {
    // beforeAll(async() => {
    //     await initServer({port:3000});
    // });
    test("testing empty server", async () => {
        const {initServer, closeServer} = Server();
        await initServer({port:3033});
        const response1 = await fetch("http://localhost:3033");
        const textRoot = await response1.text();
        const response2 = await fetch("http://localhost:3033/api");
        const textApi = await response2.text();
        expect(textRoot+textApi).toBe("Routers not found"+"API not found")
        await closeServer();
    });

    test("testing server with api", async () => {
        const {initServer, closeServer} = Server();
        const routerApi = express.Router();
        routerApi.get('/', (req, res) => {
            res.send('API found');
        });
        await initServer({port:4044, routerApi});
        const response1 = await fetch("http://localhost:4044");
        const textRoot = await response1.text();
        const response2 = await fetch("http://localhost:4044/api");
        const textApi = await response2.text();
        expect(textRoot+textApi).toBe("Routers not found"+"API found")
        closeServer();
    });

    test("testing server with pages", async () => {
        const {initServer, closeServer} = Server();
        const routerPages = express.Router();
        routerPages.get('/', (req, res) => {
            res.send('Page found');
        });
        await initServer({port:3002, routerPages});
        const response1 = await fetch("http://localhost:3002");
        const textRoot = await response1.text();
        const response2 = await fetch("http://localhost:3002/api");
        const textApi = await response2.text();
        expect(textRoot+textApi).toBe("Page found"+"API not found")
        closeServer();
    });
});

describe("Server Second", () => {
    test("testing server with api and pages", async () => {
        const {initServer, closeServer} = Server();
        const routerApi = express.Router();
        routerApi.get('/', (req, res) => {
            res.send('API found');
        });
        const routerPages = express.Router();
        routerPages.get('/', (req, res) => {
            res.send('Page found');
        });
        await initServer({port:4002, routerApi, routerPages});
        const response1 = await fetch("http://localhost:4002");
        const textRoot = await response1.text();
        const response2 = await fetch("http://localhost:4002/api");
        const textApi = await response2.text();
        expect(textRoot+textApi).toBe("Page found"+"API found")
        closeServer();
    });
});