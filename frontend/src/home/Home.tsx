import { useSetRecoilState } from 'recoil';
import Mode from '../state/Mode';
import './Home.css';

export default function Home() {
    const setMode = useSetRecoilState(Mode);
    return (
        <div className='content-box'>
            <div className='content-title'>
                <h1>홈 화면</h1>
            </div>
            <div className='content-body'>
                <button onClick={() => {setMode('login')}}>로그인</button>
                <button onClick={() => {setMode('register')}}>회원 가입</button>
                <button onClick={() => {setMode('security')}}>보안 페이지</button>
            </div>
        </div>
    )
}