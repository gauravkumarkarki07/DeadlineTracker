import { ApiManager } from "@/Common/ApiEndpoints/ApiManager"
import { useMutation } from "@tanstack/react-query"
import {AuthEndpoints} from '@/Common/ApiEndpoints/Endpoints'
import { useToast } from "@/shadcn/components/ui/use-toast"

export interface CreateAccount{
    username:string,
    email:string,
    password:string,
    firstName?:string,
    lastName?:string,
}

export interface Login{
    usernameOrEmail:string,
    password:string
}


export const useCreateAccount=()=>{
    const {toast}=useToast();
    return useMutation({
        mutationFn:async(data:CreateAccount)=>{
            const response=await ApiManager.post(AuthEndpoints.createAccount(),data);
            return response;
        },
        onSuccess:()=>{
            toast({
                description:"SignUp Successfull",
                variant:'success'
            });
        },
        onError:(error)=>{
            toast({
                title:"Ops !!",
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

export const useLogin=()=>{
    return useMutation({
        mutationFn:async(data:Login)=>{
            const response =await ApiManager.post(AuthEndpoints.login(),data);
            return response;
        },
        onSuccess:(token)=>{
            console.log(token);
        },
        onError:(error)=>{
            alert(error.message);
        }
    })
}