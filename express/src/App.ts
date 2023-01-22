import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import SessionStore from './config/SessionStore';
import cookieParser from 'cookie-parser';
import LoginRouter from './router/LoginRouter';

const app = express();
const port: number = 8080;

app.use(SessionStore);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(LoginRouter);

app.get("/hello", (req: Request, res: Response) => {
    res.send("hello world!");
})

app.get('/:username');

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Sorry cant find that!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`App listen ${port} port`);
})