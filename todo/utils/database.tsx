// import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDB = async () =>{
//     // mongoose.set('strictQuery',true);

//     // if(isConnected){
//     //     console.log("MongoDB is already connected");
//     //     return;
//     // }

//     // try{
        
//     //     await mongoose.connect("mongodb://localhost:27017/todo")

//     //     isConnected = true;

//     //     console.log("MongoDB connected")
//     // } catch(error){
//     //     console.log(error)
//     // }

//     try {

//         await mongoose.connect("mongodb://localhost:27017/dbb", {
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true,
//             useNewUrlParser: true
//           });
//         console.log('connection true')
//     } catch (err) {
//         console.log(err)
//     }
// }

import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb://localhost:27017/dbb");

export default connectMongo;