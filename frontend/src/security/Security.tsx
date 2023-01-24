import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil"
import Mode from "../state/Mode"

export default function Security() {
    
    const setMode = useSetRecoilState(Mode);
    
    useEffect(() => {
        axios.get('/api/auth').then( (result: AxiosResponse) => {
        }).catch((err: AxiosError) => {
            if (err.response?.status === 401) { return setMode('login') }
        })
    }, [setMode])

    return (
        <div className='content-box'>
            <div className='content-title'>
                <h1>보안 페이지</h1>
            </div>
            <div className='content-body'>
                로그인하지 않은 유저는 접속 불가능 한 페이지
                <button type="button" onClick={() => { setMode('home') }}>홈으로</button>
                <button type="button" onClick={() => { 
                    axios.get('/api/logout').then( (result: AxiosResponse) => {
                        if (result.status === 200) {
                            alert("로그아웃 성공");
                            setMode('home');
                        }
                    })
                }}>로그아웃</button>
            </div>
        </div>
    )
}