import express, { NextFunction, Request, Response } from 'express';
import jokeController from '../controllers/jokeController';

const router = express.Router();

router.get('/', jokeController.getJokes, (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.jokes);
});

router.post('/', jokeController.generateJoke, jokeController.saveJoke, (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(res.locals.joke);
});

export default router;
