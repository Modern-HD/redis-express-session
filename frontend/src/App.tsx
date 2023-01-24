import { useRecoilState } from 'recoil';
import './App.css';
import LoginForm from './form/LoginForm';
import RegisterForm from './form/RegisterForm';
import Home from './home/Home';
import Security from './security/Security';
import Mode from './state/Mode';

function App() {
    const [mode,] = useRecoilState(Mode);
    
    return (
        <div className="container">
            {mode === 'home' ? <Home/> : ''}
            {mode === 'login' ? <LoginForm/> : ''}
            {mode === 'register' ? <RegisterForm/> : ''}
            {mode === 'security' ? <Security /> : ''}
        </div>
    );
}

export default App;
