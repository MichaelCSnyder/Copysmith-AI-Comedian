import { NextFunction, Response, Request } from 'express';
import axios from 'axios';

import mongoose from 'mongoose';
import Joke from '../models/Joke';
import { config } from '../../config/config';

const getJokes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jokes = await Joke.find({});
        res.locals.jokes = jokes;
        return next();
    } catch (error) {
        return next({
            message: 'Error attempting to fetch all jokes',
            log: 'Error attempting to fetch all jokes in jokeController.getJokes:' + error,
            status: 500
        });
    }
};

const generateJoke = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { punchline } = req.body;
        const body = {
            model: 'text-davinci-003',
            prompt: `Tell me a joke whose punchline is: ${punchline}`
        };
        const headers = {
            Authorization: `Bearer ${config.api.key}`
        };

        const openAIJoke: any = await axios.post('https://api.openai.com/v1/completions', body, { headers });
        const setup = openAIJoke.data.choices[0].text;

        res.locals.joke = { setup, punchline };

        return next();
    } catch (error) {
        return next({
            message: 'Error attempting to generate AI Joke',
            log: 'Error attempting to generate joke in jokeController.generateJoke: ' + error
        });
    }
};

const saveJoke = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { setup, punchline } = res.locals.joke;

        const joke = await Joke.create({ setup, punchline });
        res.locals.joke = joke;

        return next();
    } catch (error) {
        return next({
            message: 'Error attempting to save joke in DB',
            log: 'Error attempting to save joke in jokeController.saveJoke:' + error,
            status: 500
        });
    }
};

export default { getJokes, generateJoke, saveJoke };
