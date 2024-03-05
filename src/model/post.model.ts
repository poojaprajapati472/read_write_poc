import mongoose, { Schema, model } from "mongoose";

interface IPost {
  content: string;
  likes: mongoose.Types.ObjectId[];
  comments: string[];
}

const post = new Schema<IPost>(
  {
    content: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", post);


