import mongoose from "mongoose";
class Connection {
    async connectDB(){
        try{
           await mongoose.connect('mongodb+srv://poojaa:123@cluster0.pf0tywt.mongodb.net/read_write_poc'), {
            useNewUrlParser: true,
            useUnifiedTopology: true  
        }
    }
        catch(error){
            throw error;
        }
    }
}
export const mongoConnection=new Connection()
