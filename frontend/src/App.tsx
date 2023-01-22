import { useRecoilState } from 'recoil';
import './App.css';
import LoginForm from './form/LoginForm';
import RegisterForm from './form/RegisterForm';
import Home from './home/Home';
import Mode from './state/Mode';

function App() {
    const [mode,] = useRecoilState(Mode);

    return (
        <div className="container">
            {mode === 'home' ? <Home/> : ''}
            {mode === 'login' ? <LoginForm/> : ''}
            {mode === 'register' ? <RegisterForm/> : ''}
        </div>
    );
}

export default App;
