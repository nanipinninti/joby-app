import './index.css'
import { FaStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
const JobItem = (props)=>{
    const {JobDetails , OnJobClick} = props
    const {companyLogoUrl,title,rating,packagePerAnnum,location,jobDescription ,employmentType,id} = JobDetails
    const onJobClick = ()=>{
        OnJobClick(id)
    }
    return(
        <div className='job-item-container' onClick={onJobClick}>
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
            <div className='d-flex justify-content-between align-items-center'>
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
                <h1 className='title'>{packagePerAnnum}</h1>                           
            </div>
            <hr className='separator my-2' />
            <h1 className='description m-0'>Description</h1>
            <p className='jobDescription m-0 mt-1'>{jobDescription}</p>
        </div>
        
    )
}
export default JobItem