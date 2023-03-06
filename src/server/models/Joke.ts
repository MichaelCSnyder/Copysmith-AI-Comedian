import mongoose, { Document, Schema } from 'mongoose';

export interface Joke {
    punchline: string;
    setup: string;
}

export interface JokeModel extends Joke, Document {}

const JokeSchema: mongoose.Schema = new Schema(
    {
        punchline: {
            type: String,
            required: true
        },
        setup: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<JokeModel>('Joke', JokeSchema);
