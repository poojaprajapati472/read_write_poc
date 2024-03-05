import { Schema, Types, model } from "mongoose";

interface IUser {
    name: string;
    mobileNumber: string;
    address: string;
    posts: Types.Array<Types.ObjectId>;
    bio:string
}

 const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            required: true,
        },
        bio:{
            type: String,
            required: true,
        },
        address: {
            type: String,
            required:true
        },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        
       
    },
    {
        timestamps: true,
    }
);

export const User = model<IUser>('user', userSchema);

