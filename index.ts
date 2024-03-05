import express from 'express';
import { mongoConnection } from './src/database/database';
import { generateUserandbio, generateUsersAndPosts } from './dummy.controller';
import { router } from './src/routes/router';
const app = express();
const port = 3000;


async function startServer(){
  console.log("server is starting")
  await mongoConnection.connectDB()
  // await generateUsersAndPosts()
  // await generateUserandbio()
}
startServer();
app.use('/app', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
