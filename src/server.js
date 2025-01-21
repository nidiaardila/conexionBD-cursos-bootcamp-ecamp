import express from "express";
import { serverInit } from './services/serverInit.js';

import UserRouter from './routes/user.routes.js';
import BootcampRouter from './routes/bootcamp.routes.js'

import { errorHandler } from './middlewares/errorHandlers.js';

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', UserRouter);
app.use('/api/v1', BootcampRouter);

app.use(errorHandler);

serverInit(app, PORT)

