import { Outlet, Navigate } from "react-router-dom";
import {useVerifyToken} from '@/Auth/hooks/useAuthQuery';

function ProtectedRoute() {
  const{data:verifiedUser,isLoading}=useVerifyToken();

  if(isLoading){
    return <section>Loading please wait ...</section>
  }

  return verifiedUser ? <Outlet /> : <Navigate to={'/auth/login'} replace />
}

export default ProtectedRoute;
