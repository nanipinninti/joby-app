import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Head from '../Head';
import { ThreeDots } from 'react-loader-spinner';
import './index.css'
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
const status_names = {
    loading : 'loading',
    active : 'active',
    failure : 'failure'
}
const JobItemDetails = (props)=>{
    const {JobDetails} = props
    const [jobInformation,setJobInformation] = useState(null)
    const [status,setStatus] = useState(status_names.loading)
    const [similaJobInformation,setSimilaJobInformation] = useState(null)
    const {id} = useParams() 
    useEffect(()=>{
        getJobDetails()
    },[id])
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
                <buttong className='failure-button' onClick = {getJobDetails}>
                    Retry
                </buttong>
            </div>
        )
    }
    const getJobDetails= async ()=>{
        const Api= `https://apis.ccbp.in/jobs/${id}`
        const original_jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
        const options = {
            method : "GET",
            headers : {
                Authorization: `Bearer ${original_jwt_token}`
            }
        }
        try{
            const reponse = await fetch(Api,options)
            if (reponse.ok){
                const data = await reponse.json()
                console.log(data)
                const tempSkills = data.job_details.skills.map(item=>(
                    {
                        imageUrl : item.image_url,
                        name : item.name
                    }
                ))
                const tempJobInformation = {
                    companyLogoUrl : data.job_details.company_logo_url,
                    companyWebsiteUrl : data.job_details.company_website_url,
                    employmentType : data.job_details.employment_type,
                    id : data.job_details.id,
                    jobDescription : data.job_details.job_description,
                    skills : tempSkills,
                    location : data.job_details.location,
                    title : data.job_details.title,
                    packagePerAnnum : data.job_details.package_per_annum,
                    lifeAtCompnay : {
                        description : data.job_details.life_at_company.description,
                        imageUrl : data.job_details.life_at_company.image_url
                    }
                }
                const tempSimilaJobInformation = data.similar_jobs.map(item=>({
                    companyLogoUrl : item.company_logo_url,
                    employmentType : item.employment_type,
                    jobDescription : item.job_description,
                    location : item.location,
                    rating : item.rating,
                    id : item.id,
                    title : item.title,
                }))
                setJobInformation(tempJobInformation)
                setSimilaJobInformation(tempSimilaJobInformation)
                setStatus(status_names.active)
            }
            else{
                setStatus(status_names.failure)
            }
        }
        catch(e){
            setStatus(status_names.failure)
            console.log(e)
        }
    } 
    const jobDetailsComponent = ()=>{
        const {companyLogoUrl,title,rating,packagePerAnnum,location,jobDescription ,employmentType,companyWebsiteUrl,skills,lifeAtCompnay} = jobInformation
        return (
            <div className='job-item-container-2 mt-4'>
            <div className='d-flex gap-2 gap-lg-3'>
                <img src={companyLogoUrl} alt='company-logo' className='company-logo'/>
                <div className='d-flex flex-column '>
                    <h1 className='title'>{title}</h1>
                    <div className='d-flex align-items-center gap-2'>
                            <FaStar style={{color : '#fbbf24'}}/>
                            <h1 className='title m-0'>{rating}</h1>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <div className='d-flex justify-content-between gap-2 align-items-center mt-2'>
                    <div className='d-flex align-items-center gap-1'>
                                <FaLocationDot/>
                                <h1 className='location m-0'>{location}</h1>
                            </div>
                            <div className='d-flex align-items-center gap-1'>
                                <MdWork/>
                                <h1 className='location m-0'>{employmentType}</h1>
                            </div>
                        </div>
                <h1 className='title m-0'>{packagePerAnnum}</h1>                           
            </div>
            <hr className='separator my-3' />
            <div className='d-flex justify-content-between align-items-center my-2'>
                <h1 className='description m-0'>Description</h1>
                
                <a href={companyWebsiteUrl} className='m-0 description d-flex align-items-center gap-2' style={{color : ' #6366f1','text-decoration' : 'none'}}
                            target='_blank'>
                            <h1 className='description m-0'>Visit</h1>
                            <FaExternalLinkAlt style={{color : ' #6366f1' ,width :'auto' , height : '13px'}}/>
                </a>
            </div>
            <p className='jobDescription m-0 mt-1'>{jobDescription}</p>
            
            {/* skills */}
            <h1 className='description mt-3  '>Skills</h1>
            <div className='skills flex-wrap d-flex gap-3 mt-3 gap-lg-5'>
                {
                    skills.map(element=>(
                        <div className='skill-item d-flex gap-2 align-items-center'>
                            <img src={element.imageUrl} alt='skill-img-url' className='skill-img-url' style={{width : 'auto', height : "30px"}} />
                            <h1 className='skill-name jobDescription m-0'>{element.name}</h1>
                        </div>
                    ))
                }
            </div>

            {/* Life at company */}
            <h1 className='description mt-4'>Life at company</h1>
            <div className='row life-at-company mt-3'>
                <p className='col-12 col-lg-8 jobDescription'>{lifeAtCompnay.description}</p>
                <div className='col-12 col-lg-4 justify-content-center d-flex'>
                    <img src={lifeAtCompnay.imageUrl} alt='life-at-company-img' className='life-at-company-img'/>
                </div>
            </div>
        </div>
        )
    };
    const onJobClick = (id)=>{
        window.scrollTo(0, 0)
        navigate(`/joby-app/jobs/${id}`)
    }
    const navigate = useNavigate()
    const similarJobsComponent = (props,id)=>{
        const {companyLogoUrl,employmentType,jobDescription,location,rating,title} = props
        return(
            <div className='job-item-container-2 col-11 col-lg-3' key={id} onClick={()=>(onJobClick(id))}>
            <div className='d-flex gap-2 gap-lg-3'>
                <img src={companyLogoUrl} alt='company-logo' className='company-logo'/>
                <div className='d-flex flex-column'>
                    <h1 className='title'>{title}</h1>
                    <div className='d-flex align-items-center gap-2'>
                            <FaStar style={{color : '#fbbf24'}}/>
                            <h1 className='title m-0'>{rating}</h1>
                    </div>
                </div>
            </div>
            <h1 className='description m-0 my-2 mt-3'>Description</h1>
            <p className='jobDescription m-0'>{jobDescription}</p>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <div className='d-flex justify-content-between gap-2 align-items-center mt-2'>
                    <div className='d-flex align-items-center gap-1'>
                                <FaLocationDot/>
                                <h1 className='location m-0'>{location}</h1>
                            </div>
                            <div className='d-flex align-items-center gap-1'>
                                <MdWork/>
                                <h1 className='location m-0'>{employmentType}</h1>
                            </div>
                        </div>                      
            </div>
        </div>
        )
    }
    const current_component = ()=>{
        switch(status){
            case status_names.failure : 
                return failureComponent()
            case status_names.active : 
                return(
                    <div className='col-11'>
                     {jobDetailsComponent()}
                     <h1 style={{color : 'white' , 'font-size' : '2em'}} className='my-lg-3'>Similar Jobs</h1>
                     <div className='col-12'>
                        <div className='row gap-lg-5 d-flex justify-content-center justify-content-lg-around'>
                        {
                            similaJobInformation.map(item=>(
                                similarJobsComponent(item ,item.id)
                            ))
                        }
                        </div>
                     </div>
                     </div>
                    )
            case status_names.loading : 
                return loading()
            default :
                return null
        }
    }
    return(
        <div className='row justify-content-center'>
            <Head/>
            {
                current_component()
            }
        </div>
    )
}
export default JobItemDetails