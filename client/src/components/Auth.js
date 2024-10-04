import { useState } from "react";
import {useCookies} from 'react-cookie';

const Auth = () => {
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [buttonText, setButtonText] = useState('Login');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmedPassword, setConfirmedPassword] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies(null);

    const viewLogin = (state) => {
        setIsLogIn(state);
        setError(null);
        if(!isLogIn)
        {
            setButtonText('Login');
        } else {
            setButtonText('Sign up');   
        }
    };
    
    const handleSubmit = async (e, endpoint) => {
        const endpointTrimmed = endpoint.toLowerCase().replace(/\s/g, "");
        setError(null);
        e.preventDefault();
        if(password !== confirmedPassword && endpoint === 'Sign up') {
            setError('Password do not match!')
        }
        else {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_email: email, password:password}),
            };

           const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpointTrimmed}`, options);
           
           const data = await response.json();
           if(data.detail) {
                setError(data.detail);
           } else {
                setCookie('Email', data.user_email);
                setCookie('AuthToken', data.token);
                window.location.reload();
           }
        }
        
        
    }

    return (
        <div>
            <div className="auth-container">
                <div className="auth-container-box">
                    <form onSubmit={(e) => {handleSubmit(e, buttonText)}}>
                        <h2>{isLogIn ? 'Please Login': 'Please Signup'}</h2>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email" 
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password"
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        {!isLogIn && 
                            <input 
                                type="password" 
                                placeholder="confirm password"
                                onChange={(e) => {setConfirmedPassword(e.target.value)}}
                            />}
                        <input type="submit" className="auth-button" value={buttonText}/>
                        {error && <p className="error">{error}</p>}
                    </form>
                    <div className="auth-options">
                        {isLogIn ? <p onClick={() => viewLogin(false)}>Don't have an account? Sign up</p> :
                        <p onClick={() => viewLogin(true)}>Have an account? Login</p> }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;