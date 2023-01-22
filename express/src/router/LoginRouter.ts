import { NextFunction, request, Request, Response, Router } from "express";
import { MysqlError, OkPacket } from "mysql";
import User from "../interface/User";
import mysql from "../orm/DBConnection";

const router = Router();

router.post('/api/auth', (req: Request, res: Response, next: NextFunction) => {
    const session = req.session;
    const body: User = req.body;
    console.log(req.session);
    if (body) {
        session.email = body.email;
        session.userIdx = 1;
        session.save(() => {
            res.send("Login OK");
        });
    } else {
        return res.send("Aleady Logined");
    }
})

router.get('/api/register', (req: Request, res: Response, next: NextFunction) => {
    const body: User = req.body;
    const query = "INSERT INTO `user`(email, nick_name, pwd) VALUES (?, ?, ?)";
    mysql.query(query, [body.email, body.nick_name, body.pwd], (err: MysqlError | null, result: OkPacket) => {
        if (err) next(err);
        return res.send("1");
    })
})

router.get('/api/login', (req: Request, res: Response, next: NextFunction) => {
    const body: User = req.body;
    const query = "SELECT a.user_idx, a.email, a.nick_name FROM `user` a\n" +
                    "WHERE a.email = ? AND pwd = ?";
    mysql.query(query, [body.email, body.pwd], (err: MysqlError | null, result: User[]) => {
        if (err) next(err);
        req.session.email = result[0].email;
        req.session.userIdx = result[0].user_idx;
        req.session.nickName = result[0].nick_name;
        req.session.save();
        return res.send("1");
    })
})

router.get('/api/logout', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session);
    req.session.destroy((err) => {
        if (err) next(err);
        return res.send("로그아웃 성공");
    });
})

export default router;