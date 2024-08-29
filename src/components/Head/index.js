import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { MdHome } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Head = ()=>{
        const navigate = useNavigate();
        const toJobs = ()=>{
            navigate("/jobs")
        }
        const toHome = ()=>{
            navigate('/')
        }
        const logoutFunction = ()=>{
            Cookies.remove('login_token')
            navigate('/login')
        }
        return(
            <div className='col-12 head d-flex justify-content-between align-items-center'>
                    <div className='p-0 m-0' onClick={toHome}>
                        <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
                                        alt='web-img' style={{height : "30px"}} />
                    </div>
                    <div className='d-block d-lg-none d-flex gap-3'>
                        <MdHome className='icon' onClick={toHome}/>
                        <MdWork className='icon' onClick={toJobs}/>
                        <IoIosLogOut className='icon' onClick={logoutFunction}/>
                    </div>
                    <div className='d-none d-lg-flex justify-content-between'>
                        <div className='d-flex gap-4'>
                            <Link  className='head-text' to="/">Home</Link>
                            <Link  className='head-text' to="/jobs">Jobs</Link>
                        </div>
                    </div>
                    <button className='logout-button d-none d-lg-flex' onClick={logoutFunction}>
                            Logout
                        </button>
                </div>
        )
    }

export default Head
