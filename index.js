import express from 'express';
import 'dotenv/config';
import Homepage from './Controllers/Homepage.js';
import Logger from './Helpers/Logger.js';
const { PORT } = process.env;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(Logger.expressLogger);

app.get('/api', Homepage.get)

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));