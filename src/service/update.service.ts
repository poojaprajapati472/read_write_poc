
// userBioService.js

import { mongoConnection } from "../database/database";
import { MongoClient } from "mongodb";
import { User } from "../model/user.model";
const fs = require('fs');

export const updateUserBios = async () => {
    try {
        const jsonData = JSON.parse(fs.readFileSync('uploads/excelFile-1708418936130-950939131.json', 'utf-8'));
        const uri = 'mongodb://localhost:27017/read_write_poc';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db();
        // const result = await User.find()
        // console.log("result is---------------->",result)
        // const usersCollection = database.collection('users');
        if (Array.isArray(jsonData)) { 
            for (const user of jsonData) { 
                console.log(user.bio)
                const dbUser = await User.findOneAndUpdate({ name: user.name },{$set:{bio:user.bio}});
            }
        } else {
            console.log('jsonData is not an array');
        }


        console.log("User bio update process completed.");
        await client.close();
    } catch (error) {
        console.error("Error updating user bios:", error);
        throw error;
    }
};

