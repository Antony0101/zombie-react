import { Request, Response } from 'express';

async function indexRoute(req: Request, res: Response) {
    res.send('index Page');
}

export default indexRoute;