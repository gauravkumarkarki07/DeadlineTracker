import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { TaskEndpoints } from "@/Common/ApiEndpoints/Endpoints";
import { useToast } from "@/shadcn/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface TaskDetails{
    id:number;
    title:string;
    description?:string;
    dueDate:Date;
    status:string;
}

export const useGetAllTaskDetails=(projectId:number)=>{
    return useQuery({
        queryKey:['tasks',projectId],
        queryFn:async()=>{
            const response=await ApiManager.get(TaskEndpoints.getAllTasks(projectId));
            return response;
        },
        retry:2
    })
}

export const useGetTaskDetailsById=(deadlineId:number,projectId:number)=>{
    return useQuery({
        queryKey:['taskById',deadlineId,projectId],
        queryFn:async()=>{
            const response=await ApiManager.get(TaskEndpoints.getTaskById(deadlineId,projectId));
            return response;
        },
        retry:2
    })
}

export const useCreateTask=()=>{
    const{toast}=useToast();
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({projectId,data}:{projectId:number,data:TaskDetails})=>{
            const response=await ApiManager.post(TaskEndpoints.createTask(projectId),data);
            return response;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['taskById']})
            toast({
                description:'Task Created Successfully',
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

export const useUpdateTask=()=>{
    const{toast}=useToast();
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({deadlineId,projectId,data}:{deadlineId:number,projectId:number,data:TaskDetails})=>{
            const response=await ApiManager.put(TaskEndpoints.updateTask(deadlineId,projectId),data);
            return response;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['taskById']})
            toast({
                description:'Task Updated Successfully',
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

export const useDeleteTask=()=>{
    const{toast}=useToast();
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({deadlineId,projectId}:{deadlineId:number,projectId:number})=>{
            const response=await ApiManager.delete(TaskEndpoints.deleteTask(deadlineId,projectId));
            return response;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            queryClient.invalidateQueries({queryKey:['taskById']})
            toast({
                description:'Task Deleted Successfully',
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