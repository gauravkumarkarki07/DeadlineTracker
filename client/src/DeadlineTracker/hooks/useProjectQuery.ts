import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {ProjectEndpoints} from '@/Common/ApiEndpoints/Endpoints';
import { useToast } from "@/shadcn/components/ui/use-toast";

export interface ProjectDetailsForm{
    id:number;
    name:string,
    description?:string;
    createdAt:string;
    deadlinesCount:number;
}

export const useGetProjectDetails=(accountId:number)=>{
    return useQuery({
        queryKey:['projectDetails',accountId],
        queryFn:async()=>{
                const response = await ApiManager.get(ProjectEndpoints.getAllProject(accountId));
                return response;
        },
        retry:2
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
    const queryClient=useQueryClient();
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
            queryClient.invalidateQueries({queryKey:['projectDetails']})
            queryClient.invalidateQueries({queryKey:['upcommingDeadlines']})

        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

export const useUpdateProject=()=>{
    const { toast } = useToast();
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({accountId,projectId,updatedData}:{accountId:number,projectId:number,updatedData:ProjectDetailsForm})=>{
            const response=await ApiManager.put(ProjectEndpoints.updateProject(accountId,projectId),updatedData);
            return response;
        },
        onSuccess:()=>{
            toast({
                description:'Project Updated Successfully',
                variant:'success'
            })
            queryClient.invalidateQueries({queryKey:['projectDetails']})
            queryClient.invalidateQueries({queryKey:['upcommingDeadlines']})

        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

export const useDeleteProject=()=>{
    const { toast } = useToast();
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({accountId,projectId}:{accountId:number,projectId:number})=>{
            const response=await ApiManager.delete(ProjectEndpoints.deleteProject(accountId,projectId));
            return response;
        },
        onSuccess:()=>{
            toast({
                description:'Project Deleted Successfully',
                variant:'success'
            })
            queryClient.invalidateQueries({queryKey:['projectDetails']})
            queryClient.invalidateQueries({queryKey:['upcommingDeadlines']})
        },
        onError:(error)=>{
            toast({
                description:error.message,
                variant:'destructive'
            })
        }
    })
}

