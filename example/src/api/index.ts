import { Request, Response } from 'express';

async function indexApi(req: Request, res: Response) {
    res.json({message: 'index Api'});
}

export default indexApi;