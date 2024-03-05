import mongoose from "mongoose";
import { User } from "./src/model/user.model";
import { Post } from "./src/model/post.model";
import { Userbio } from "./src/model/userbio";

function generateRandomObjectId() {
    return new mongoose.Types.ObjectId();
}

function generateRandomPostContent() {
    const posts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
}

function generateRandomComment() {
    const comments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"];
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
}
function generateRandomBio() {
    const bios = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
    const randomIndex = Math.floor(Math.random() * bios.length);
    return bios[randomIndex];
}

export async function generateUsersAndPosts() {
    try {
        for (let i = 0; i < 10; i++) {
            console.log(`Creating user ${i + 1}`);
            const userId = generateRandomObjectId();
            const user = new User({
                _id: userId,
                name: `User${i + 1}`,
                mobileNumber: `123456789${i.toString().padStart(4, '0')}`,
                address: `Address of User${i + 1}`,
                posts: [],
            });
            await user.save();

            for (let j = 0; j < Math.random()*10; j++) { 
                console.log(`Creating post ${j + 1} for user ${i + 1}`);
                const postId = generateRandomObjectId();
                const post = new Post({
                    _id: postId,
                    content: generateRandomPostContent(),
                    likes: [userId], 
                    comments: [], 
                });
                await post.save();

                const numLikes = Math.floor(Math.random() * 11);
                for (let k = 0; k < numLikes; k++) {
                    const likeId = generateRandomObjectId();
                    post.likes.push(likeId);
                }

                const numComments = Math.floor(Math.random() * 6);
                for (let l = 0; l < numComments; l++) {
                    const comment = generateRandomComment();
                    post.comments.push(comment);
                }
                await post.save();
                await User.findByIdAndUpdate(userId, { $push: { posts: postId } });
            }
        }
        console.log("User and post generation completed.");
    } catch (error) {
        console.error("Error generating users and posts:", error);
    }
}
export async function generateUserandbio() {
    try {
        for (let i = 0; i < 100000; i++) {
            console.log(`Creating user ${i + 1}`);
            const userId = generateRandomObjectId();
            const user = new Userbio({
                _id: userId,
                name: `User${i + 1}`,
                bio: generateRandomBio(), 
            });
            await user.save();
        }
        console.log("User and post generation completed.");
    } catch (error) {
        console.error("Error generating users and posts:", error);
    }
}
