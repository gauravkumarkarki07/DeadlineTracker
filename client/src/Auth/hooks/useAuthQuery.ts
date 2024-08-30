import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AuthEndpoints } from "@/Common/ApiEndpoints/Endpoints";
import { toast, useToast } from "@/shadcn/components/ui/use-toast";

export interface CreateAccount {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Login {
  usernameOrEmail: string;
  password: string;
}

export const useCreateAccount = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: CreateAccount) => {
      const response = await ApiManager.post(
        AuthEndpoints.createAccount(),
        data
      );
      return response;
    },
    onSuccess: () => {
      toast({
        description: "SignUp Successfull",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Ops !!",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useLogin = () => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: async (data: Login) => {
      const response=await ApiManager.post(AuthEndpoints.login(), data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['Jwt']});
    },
    onError: (error) => {
      toast({
        title: "Ops !!",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useVerifyToken = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: ["Jwt"],
    queryFn: async () => {
      const response = await ApiManager.get(AuthEndpoints.verifyToken());
      sessionStorage.setItem('userDetails',JSON.stringify(response));
      toast({
        description: "Login Successfull",
        variant: "success",
      });

      return response;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await ApiManager.post(AuthEndpoints.logout(), {});
      sessionStorage.removeItem('userDetails');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['Jwt']});
      toast({
        description: "Logout Succesfull",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
