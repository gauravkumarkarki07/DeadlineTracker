import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import {ProjectEndpoints} from '@/Common/ApiEndpoints/Endpoints';
import { useToast } from "@/shadcn/components/ui/use-toast";

export interface ProjectDetailsForm{
    name:string,
    description?:string;
}

export const useGetProjectDetails=(accountId:number)=>{
    return useQuery({
        queryKey:['projectDetails',accountId],
        queryFn:async()=>{
                const response = await ApiManager.get(ProjectEndpoints.getAllProject(accountId));
                return response;
        }
    })
}

export const useGetProjectDetailById=(accountId:number,projectId:number)=>{
    return useQuery({
        queryKey:['projectDetailsById',accountId,projectId],
        queryFn:async()=>{
            const response=await ApiManager.get(ProjectEndpoints.getProjectById(accountId,projectId));
            return response;
        }
    })
}

export const useCreateProject=()=>{
    const { toast } = useToast();
    return useMutation({
        mutationFn:async({accountId,data}:{accountId:number,data:ProjectDetailsForm})=>{
            const response=await ApiManager.post(ProjectEndpoints.createProject(accountId),data);
            return response;
        },
        onSuccess:()=>{
            toast({
                description:'Project Created Successfully',
                variant:'success'
            })
        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

export const useUpdateProject=(accountId:number,projectId:number,updatedData:ProjectDetailsForm)=>{
    const { toast } = useToast();
    return useMutation({
        mutationFn:async()=>{
            const response=await ApiManager.put(ProjectEndpoints.updateProject(accountId,projectId),updatedData);
            return response;
        },
        onSuccess:()=>{
            toast({
                description:'Project Updated Successfully',
                variant:'success'
            })
        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

export const useDeleteProject=(accountId:number,projectId:number)=>{
    const { toast } = useToast();
    return useMutation({
        mutationFn:async()=>{
            const response=await ApiManager.delete(ProjectEndpoints.deleteProject(accountId,projectId));
            return response;
        },
        onSuccess:()=>{
            toast({
                description:'Project Deleted Successfully',
                variant:'success'
            })
        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

