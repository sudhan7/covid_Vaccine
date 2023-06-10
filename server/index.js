import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {Adminmodel} from './models/Admin.js';
import {Adminrouter} from './routes/admin.js';
import { Userrouter } from './routes/users.js';


mongoose.connect("mongodb+srv://rsudhan2020:rsudhan@users.n85ljmw.mongodb.net/")
.then(console.log("DB connected"));

const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin',Adminrouter);
app.use('/users',Userrouter);

app.listen(3001, () => {
    console.log("server is on 🔥");
});
