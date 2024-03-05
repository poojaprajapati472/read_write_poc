import { Schema, Types, model } from "mongoose";

interface IUser {
    name: string;
    bio:string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Userbio = model<IUser>('Userbio', userSchema);

