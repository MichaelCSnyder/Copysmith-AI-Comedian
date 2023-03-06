import express, { application } from 'express';
import jokeRouter from './Joke';

const router = express.Router();

/**Route incoming requests */
router.use('/joke', jokeRouter);

export default router;
