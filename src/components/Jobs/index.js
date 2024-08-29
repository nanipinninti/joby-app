import './index.css'
import Head from '../Head'
import React, { useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';
import { Checkbox } from '@mui/material';
import JobItem from '../JobItem';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const status_names = {
    loading : 'loading',
    active : 'active',
    failure : 'failure'
}
const Jobs = ()=>{
    const navigate = useNavigate()
    const [searchVal,setSearchVal] = useState('')
    const [profileDetails,setProfileDetails] = useState(null)
    const [status , setStatus] = useState(status_names.loading)
    const [jobDetails,setJobDetails] = useState(null)
    const [searchClickValue,setSearchClickValue] = useState('')

    const [typeOfJob , setTypeOfJob] = useState([])
    const [minSalary , setMinSalary] = useState('')

    // sorting functionalities
    const handlingCheckBox = event=>{
        const {value,checked} = event.target
        setTypeOfJob(prv=>{
            if (checked){
                return [...prv,value]
            }
            return prv.filter(item=>(item!==value))
        })
        setStatus(status_names.loading)
    }

    const handlingRadioBox = event=>{
        // console.log(event.target.value)
        setMinSalary(event.target.value)
        setStatus(status_names.loading)
    }
    const search = ()=>{
        return(
            <div className='col-10   order-0 d-lg-none col-lg-4 p-0'>
                    <input type='search' className='mt-2 search-input' placeholder='Search'
                        onChange={(e)=>(setSearchVal(e.target.value))}  value={searchVal}/>
                    <button className='search-icon-button' onClick={onSearchClick}>
                        <IoIosSearch className='search-icon' style={{color : 'rgb(255,255,255)'}} />
                    </button>
            </div>
        )
    }
    useEffect(()=>{
        getProfile()
        getJobDetails()
    },[typeOfJob , minSalary , searchClickValue])
    const getJobDetails = async ()=>{
        const joinParm = `employment_type=${typeOfJob.join(',')}`
        const minimum_package =`minimum_package=${minSalary}&search=`
        const api = `https://apis.ccbp.in/jobs?${joinParm}&${minimum_package}`
        const original_jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
        const options = {
            method : "GET",
            headers : {
                Authorization: `Bearer ${original_jwt_token}`
            }
        }
        try{
            const response = await fetch(api,options)
            if (response.ok){
                const data = await response.json()
                // console.log(data)
                const tempJobDetails = data.jobs.map(item=>({
                    companyLogoUrl : item.company_logo_url,
                    employmentType : item.employment_type,
                    id : item.id,
                    jobDescription : item.job_description,
                    location : item.location,
                    packagePerAnnum : item.package_per_annum,
                    rating : item.rating,
                    title : item.title
                }))
                setJobDetails(tempJobDetails.filter(item=>(item.title.toLowerCase().includes(searchClickValue.toLocaleLowerCase()))))
                setStatus(status_names.active)
            } 
            else{
                setStatus(status_names.failure)
                console.log(api)
                console.log('failed')
            }
        }
        catch(e){
            setStatus(status_names.failure)
            console.log(e)
        }
    }
    const noJobsComponent = ()=>{
        return(
            <div className='col-12 failure-component no-job-component d-flex justify-content-center align-items-center flex-column text-center' style={{color : 'white'}}>
                <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' 
                    alt='failure-img' className='failure-img'/>
                <h1 className='failure-head'>No Jobs Found</h1>
                <p className='failure-sub-head'>We could not find any jobs. Try other filters.</p> 
            </div>
        )
    }
    const getProfile = async ()=>{
        const api = 'https://apis.ccbp.in/profile'
        const original_jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
        const options = {
            method : "GET",
            headers : {
                Authorization: `Bearer ${original_jwt_token}`
            }
        }
        try {
        const response = await fetch(api,options)
            if (response.ok){
                const data = await response.json()
                // console.log(data.profile_details)
                setProfileDetails(
                    {
                        name : data.profile_details.name,
                        profileImageUrl : data.profile_details.profile_image_url,
                        shortBio  : data.profile_details.short_bio
                    }
                )
            } 
        }
        catch(e){
            console.log(e)
        }
    }
    const loading = ()=>{
        return(
            <div data-testid="loader" className='col-12 w-100 d-flex align-items-center justify-content-center'  style={{ height: '60vh' }}>
                        <ThreeDots 
                            type="ThreeDots" 
                            color="#0284c7" 
                            height={50} 
                            width={50} 
                        />
                    </div>
        )
    }
    const failureComponent = ()=>{
        return(
            <div className='col-12 failure-component d-flex justify-content-center align-items-center flex-column text-center' style={{color : 'white' ,'min-height': '90vh'}}>
                <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' 
                    alt='failure-img' className='failure-img'/>
                <h1 className='failure-head'>Oops! Something Went Wrong</h1>
                <p className='failure-sub-head'>We cannot seem to the page you are looking for.</p> 
                <button className='failure-button' onClick = {getJobDetails}>
                    Retry
                </button>
            </div>
        )
    }
    const profile = ()=>{
        return(
                <div className='order-1 order-lg-0 d-flex justify-content-center align-items-center' style={{width :'100%','min-height' : '100px'}}>
                {
                    (profileDetails!==null) ?(
                        <div className='profile-container col-12 row d-flex flex-column gap-2'>
                            <img src={profileDetails.profileImageUrl} alt='profile-img-url' className='profile-img-url' />
                            <h1 className='profile-name'>{profileDetails.name}</h1>
                            <h1 className='profile-bio'>{profileDetails.shortBio}</h1>
                        </div>
                    ) : <button onClick={getProfile} className='retry-profile-button'>
                            Retry
                    </button>
                }
                </div>
        )
    }
    const sortings = ()=>{
        return(
        <div className='sortings d-flex flex-column gap-2'>

            {/* type of job */}
            <h1 className='sort-head'>Type of Employment</h1>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='checkbox' value="FULLTIME" onClick={handlingCheckBox} id='cb-1'/>
                <label for='cb-1' className='sort-option m-0'>Full Time</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='checkbox' value="PARTTIME" onClick={handlingCheckBox} id='cb-2'/>
                <label for='cb-2' className='sort-option m-0'>Part Time</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='checkbox' value="FREELANCE" onClick={handlingCheckBox} id='cb-3'/>
                <label for='cb-3' className='sort-option m-0'>Freelance</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center'>
                <input type='checkbox' value="INTERNSHIP" id='cb-4'
                    onClick={handlingCheckBox} />
                <label for='cb-4' className='sort-option m-0'>Internship</label>
            </div>

            <hr className='separtor' />
            {/* salary range */}
            <h1 className='sort-head'>Salary Range</h1>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='radio' name='salary'  value="1000000" onChange={handlingRadioBox} id='rb-1'/>
                <label for='rb-1' className='sort-option m-0'>10LPA and above</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='radio' name='salary'  value="2000000" onChange={handlingRadioBox} id='rb-2'/>
                <label for='rb-2' className='sort-option m-0'>20LPA and above</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='radio' name='salary'  value="3000000" onChange={handlingRadioBox} id='rb-3'/>
                <label for='rb-3' className='sort-option m-0'>30LPA and above</label>
            </div>
            <div className='d-flex gap-3 align-items-center align-items-center '>
                <input type='radio' name='salary'  value="4000000" onChange={handlingRadioBox} id='rb-4'/>
                <label for='rb-4' className='sort-option m-0'>40LPA and above</label>
            </div>
        </div>
        )
    }
    const profileAndSortings = ()=>{
        return(
            <div className='col-10 col-lg-3 p-0'>
                {
                    profile()
                }
                <hr className='separtor'/>
                {
                    sortings()
                }
            </div>
        )
    }
    const onJobClick = (id)=>{
        navigate(`/joby-app/jobs/${id}`)
    }
    const onSearchClick = ()=>{
        setSearchClickValue(searchVal)
    }
    const current_state = ()=>{
        switch(status){
            case status_names.failure:
                return failureComponent()
            default :
                return (
                    <div className='col-12 '>
                        <div className='row  justify-content-center   gap-4 mt-4'>
                        {
                            search()
                                
                        }
                        {
                            profileAndSortings()
                        }
                        <div className='col-10 col-lg-7 p-0'>
                            <div className='d-none d-lg-block col-lg-8 p-0'>
                                <input type='search' className='mt-2 mb-3 search-input' placeholder='Search'
                                    onChange={(e)=>(setSearchVal(e.target.value))}  value={searchVal}/>
                                <button className='search-icon-button' onClick={onSearchClick}>
                                    <IoIosSearch className='search-icon' style={{color : 'rgb(255,255,255)'}} />
                                </button>
                            </div>
                            {(status !== status_names.loading)?(
                                <div className='jobs'>
                                {
                                // jobs 
                                    (jobDetails!==null && jobDetails.length>0) ? jobDetails.map(item=>(
                                        <JobItem key={item.id} 
                                                JobDetails = {item}  
                                                OnJobClick = {onJobClick}
                                        />
                                    )) 
                                    : noJobsComponent()
                                }
                                </div>
                            ):
                                loading()
                            }
                        </div>
                        </div>
                    </div>
                )
        }
    }
    return(
        <div className='row d-flex flex-column align-items-center'>
            <Head />
            {
                current_state()
            }
        </div>
    )
}
export default Jobs