import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from '../Head';
const Home =()=>{
    const [username, setUsername] = useState('');
    const navigate = useNavigate()
    const toJobs = ()=>{
        navigate("/jobs")
    }
    const bodyComonent = ()=>{
        return(
            <div className='col-12 body-component d-flex flex-column gap-4 py-3 px-4 '>
                <h1 className='body-head'>
                    Find The Job That Fits Your Life
                </h1>
                <h1 className='body-sub-head'>
                    Millions of people are searching for jobs, salary information,company reviews. Find the 
                    job that fits your abilites and potential.
                </h1>
                <button className='find-jobs-button button' onClick={toJobs}>
                    Find Jobs
                </button>
            </div>
        )
    }
    return(
        <div className='col-12'>
            <div className='row'>
                <Head />     
                {
                    bodyComonent()
                }           
            </div>
        </div>
    )       
}
export default Home
