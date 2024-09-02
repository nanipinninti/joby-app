import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Login =()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg , setErrorMsg] = useState('');
    
    const navigate = useNavigate();
    const onsubmit = async (event)=>{
        event.preventDefault()
        const UserDetails = {username,password}
        const options = {
            method : "POST",
            body : JSON.stringify(UserDetails)
        }
        try{
            const api = 'http://35.154.82.187:5001/nani/login'

            const local_api = "http://localhost:5001/nani/login"
            const next_wave_api = "https://apis.ccbp.in/login"
            const response = await fetch(next_wave_api,options)
            const data = await response.json()
            if (response.ok){
                // console.log(data)
                const jwt_token = data.token || data.jwt_token
                Cookies.set('login_token',jwt_token)
                navigate("/joby-app/")
            }
            else{
                setErrorMsg('*'+data.message)
            }
        }
        catch(e){
            alert(e)
            console.log(e)
        }
    }

    if (Cookies.get('login_token')!== undefined) return <Navigate to={'/joby-app/'} />
        return(
            <div className='row d-flex flex-column justify-content-center align-items-center' style={{height:'90vh'}}>
                <div className='col-10 col-lg-3 login-container'>
                    <form onSubmit={onsubmit} className='row
                           login-form  d-flex flex-column justify-content-center align-items-center'>
                        <div className='col-12 d-flex flex-column justify-content-center align-items-center mb-3'>
                            <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
                                alt='web-img' style={{height : "30px"}} />
                        </div>
                        <h1 className='login-question col-12 '>Username</h1>
                        <input className='col-12' placeholder='Username' value={username} 
                                    onChange={e=>(setUsername(e.target.value))}    type='text' />

                        <h1 className='login-question col-12 '>Password</h1>
                        <input className='col-12' placeholder='Password' value={password}
                                 onChange={e=>(setPassword(e.target.value))}     type='password' />

                        <button type='submit' className='col-12 submit-button'>
                            Login
                        </button>
                        <p className='error-msg col-12'>{errorMsg}</p>
                    </form>
                </div>
            </div>
        )
    
}
export default Login
