import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
const ProtectedRoute = ({element})=>{
    const jwt_token = Cookies.get('login_token')
    if (jwt_token === undefined) return <Navigate to={'/login'} />
    return (element)
}
export default ProtectedRoute