import { Outlet, Navigate } from "react-router-dom";
import { useVerifyToken } from "@/Auth/hooks/useAuthQuery";
import { toast } from "@/shadcn/components/ui/use-toast";

function ProtectedRoute() {
  const {isError, error } = useVerifyToken();

  if (isError) {
    toast({
      description:error.message,
      variant:'destructive'
    })
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
