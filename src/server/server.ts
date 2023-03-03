import { Request, Response } from 'express';

const express = require('express');

const app = express();

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('Haaaaaay!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});
