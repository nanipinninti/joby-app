import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import { Component } from 'react'
import Login from '../Login';
import NotFound from '../NotFound';
import Home from '../Home';
import Jobs from '../Jobs';
import JobItemDetails from '../JobItemDetails';
import ProtectedRoute from '../ProtectedRoute';
class JobyApp extends Component{
    render(){
        return(
            <div className='body'>
                <BrowserRouter className="container">
                    <Routes>
                        <Route path='/joby-app/' element={<ProtectedRoute element={<Home />}/>}/>
                        <Route path='/joby-app/login' element = {<Login />}/>
                        <Route path='/joby-app/jobs' element={<ProtectedRoute element={<Jobs />}/>}/>
                        <Route  path='/joby-app/jobs/:id' element={<ProtectedRoute element={<JobItemDetails />}/>}/>
                        <Route path='/joby-app/not-found' element={<NotFound/>}/>
                        <Route path='*' element={<Navigate to={'/joby-app/not-found'}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
export default JobyApp