import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import User from "../interface/User";
import Mode from "../state/Mode";

export default function RegisterForm() {
    const setMode = useSetRecoilState(Mode);
    const [data, setData] = useState<User>({});
    const onChange = (e: React.ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setData({...data, [input.name]: input.value})
    }
    return (
        <div className='content-box'>
            <div className='content-title'>
                <h1>회원가입 화면</h1>
            </div>
            <div className='content-body'>
                <form onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    axios.post('/api/register', JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }).then((result: AxiosResponse<number>) => {
                        if (result.status === 200 && result.data === 1) {
                            alert("등록 성공!");
                            setMode("login")
                        } else {
                            alert("등록 실패");
                        }
                    }).catch((err: AxiosError) => {
                        console.log(err);
                        alert("등록 실패");
                    })
                }}>
                    <label htmlFor='email'>이메일: </label>
                    <input id='email' name="email" type="text" onChange={onChange} />
                    <br/>
                    <label htmlFor="pwd">비밀번호: </label>
                    <input id="pwd" name="pwd" type="password" onChange={onChange} />
                    <br/>
                    <label htmlFor="nick-name">닉네임: </label>
                    <input id="nick-name" name="nick_name" type="text" onChange={onChange}/> 
                    <br/>
                    <button type="submit">회원가입</button>
                    <button type="button" onClick={() => { setMode('home') }}>홈으로</button>
                </form>
            </div>
        </div>
    )
}