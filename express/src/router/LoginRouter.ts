import { NextFunction, request, Request, Response, Router } from "express";
import { MysqlError, OkPacket } from "mysql";
import User from "../interface/User";
import mysql from "../orm/DBConnection";

const router = Router();

router.get('/api/auth', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session);
    if (!req.session.userIdx) { return res.status(401).send('로그인이 필요합니다.') }
    const body: User = {
        email: req.session.email,
        nick_name: req.session.nickName
    }
    return res.send(body);
})

router.post('/api/register', (req: Request, res: Response, next: NextFunction) => {
    console.log("LoginRouter > Register > POST");
    const body: User = req.body;
    const query = "INSERT INTO `user`(email, nick_name, pwd) VALUES (?, ?, ?)";
    mysql.query(query, [body.email, body.nick_name, body.pwd], (err: MysqlError | null, result: OkPacket) => {
        if (err) return next(err);
        return res.send("1");
    })
})

router.post('/api/login', (req: Request, res: Response, next: NextFunction) => {
    console.log("LoginRouter > Login > POST");
    const body: User = req.body;
    const query = "SELECT a.user_idx, a.email, a.nick_name FROM `user` a\n" +
                    "WHERE a.email = ? AND pwd = ?";
    mysql.query(query, [body.email, body.pwd], (err: MysqlError | null, result: User[]) => {
        if (err) return next(err);
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
        if (err) return next(err);
        return res.send("로그아웃 성공");
    });
})

export default router;