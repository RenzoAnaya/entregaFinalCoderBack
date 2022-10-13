import mongoose from 'mongoose';
import 'dotenv/config';



const config ={
    mongoDB:{
        URL:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hc1kn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        options:{
            useNewUrlParser:true, 
            useUnifiedTopology: true
        }
    }
}

export const conectarDB = async () =>{
    try{
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options)
        console.log('Conexion exitosa a la base de datos')
    }catch(error){
        console.log('Error en la conexion DB', error);
    }
}