import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouters.js'

const uri = "mongodb+srv://ronaldo:12345@cluster0.dk4pr.gcp.mongodb.net/users?retryWrites=true&w=majority";

(async () => {
    try{
        await mongoose.connect(uri, {useNewUrlParser: true,useUnifiedTopology: true});
        console.log("Conectado Com o Banco na nuvem");
    }catch (err) {console.log(err.message)}
})();

const app = express();
app.use(express.json());
app.use(userRouter);


app.listen(3030, () => {

    console.log("Olá");
});