import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil"
import User from "../interface/User";
import Mode from "../state/Mode"

export default function LoginForm() {
    const setMode = useSetRecoilState(Mode);
    const [data, setData] = useState<User>({});
    const onChange = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData({...data, [input.name]: input.value})
    }
    return (
        <div className='content-box'>
            <div className='content-title'>
                <h1>로그인 화면</h1>
            </div>
            <div className='content-body'>
                <form onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    axios.post('/api/login', JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }).then((result: AxiosResponse<number>) => {
                        if (result.status === 200 && result.data === 1) {
                            alert("로그인 성공");
                            setMode("home");
                        } else {
                            alert("로그인 실패");
                        }
                    }).catch((err: AxiosError) => {
                        console.log(err);
                        alert("로그인 실패");
                    })
                }}>
                    <label htmlFor='email'>이메일: </label>
                    <input id='email' name="email" type="text" onChange={onChange} />
                    <br/>
                    <label htmlFor="pwd">비밀번호: </label>
                    <input id="pwd" name="pwd" type="password" onChange={onChange} />
                    <br/>
                    <button type="submit">로그인</button>
                    <button type="button" onClick={() => { setMode('home') }}>홈으로</button>
                </form>
            </div>
        </div>
    )
}