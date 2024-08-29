import './index.css'
const NotFound = ()=>{
    return (
        <div className='col-12 not-found-container' style={{width:'100%',height : "100vh"}}>
            <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
                alt='not-found-path' className='not-found-img' />
            <h1 className='not-found-head'>Page Not Found</h1>
            <p className='not-found-p'>We are sorry,the page you requested could not be found</p>
        </div>
    )
}
export default NotFound