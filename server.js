import express from 'express';
import moment from 'moment';
import cors from 'cors';
import router from './src/routes/router.js'
import dotenv from 'dotenv';
import {conectarDB} from './src/config/db.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {dirname} from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { createServer } from 'http';
import { Server } from 'socket.io';
import chatDao from './src/DAO/chatDao.js';



dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors({
    origin:'*',
    methods:"GET, POST, PUT, DELETE, OPTIONS",
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Session

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hc1kn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            ttl: 60 * 10,
        }),
    })
);

// Rutas
router(app);

// Conexion DB
conectarDB();

// Sockets

io.on('connection', async (socket) => {
    console.log('nuevo cliente conectado');
  
    io.sockets.emit('messages', await chatDao.listAll());
  
    socket.on('message', async (data) => {
      const { text, email } = data;
      const newMessage = {
        email,
        text,
        date: moment(new Date()).format('DD/MM/YYYY HH:mm'),
      };
  
      await chatDao.save(newMessage);
  
      io.sockets.emit('messages', await chatDao.listAll());
    });
  });

// SERVIDOR
const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto ${PORT}`);
  });
  
  server.on('error', (err) => {
    console.log('Error del servidor.' + err);
  });
  process.on('exit', (code) => {
    console.log('Exit code -> ' + code);
  });