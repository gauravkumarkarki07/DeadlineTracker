import { Outlet, Navigate } from "react-router-dom";
import { toast } from "@/shadcn/components/ui/use-toast";
import { useContext } from "react";
import { AuthContext } from "@/Common/Provider/AuthContext";

function ProtectedRoute() {
  const userDetails=useContext(AuthContext);

  if (!userDetails) {
    toast({
      description:'Please Login',
      variant:'destructive'
    })
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
