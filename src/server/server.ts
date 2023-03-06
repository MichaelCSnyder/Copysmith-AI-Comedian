import { NextFunction, request, Request, response, Response } from 'express';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { config } from '../config/config';
import router from './routes/index';

const app = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Connected to DB...');
        StartServer();
    })
    .catch((error: Error) => {
        console.log('Unable to connect to DB');
        console.log(error);
    });

/**Only start server if mongo connects */
const StartServer = () => {
    /**Global middlewares */
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    /**Routes */
    app.use('/api', router);

    app.get('/', (req: Request, res: Response) => {
        return res.status(200).send('Haaaaaay!');
    });

    /**Catch bad paths */
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
        return next({
            message: 'The resource you requested does not exist',
            log: 'The user provided a bad path',
            status: 404
        });
    });

    /**Global Error Handling */
    type GlobalError = {
        message: string;
        log: string;
        status: number;
    };

    app.use((error: GlobalError, req: Request, res: Response, next: NextFunction) => {
        const defaultMessage = {
            message: 'An unknown error occured in the backend',
            log: 'An unknown error occured in the backend',
            status: 500
        };

        const newMessage = Object.assign({}, defaultMessage, error);

        console.log('Error: ' + newMessage.log);
        return res.status(newMessage.status).json(newMessage.message);
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000...');
    });
};
