import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import {ProjectEndpoints} from '@/Common/ApiEndpoints/Endpoints';

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

export const useCreateProject=(accountId:number,data:ProjectDetailsForm)=>{
    return useMutation({
        mutationFn:async()=>{
            const response=await ApiManager.post(ProjectEndpoints.createProject(accountId),data);
            return response;
        }
    })
}

export const useUpdateProject=(accountId:number,projectId:number,updatedData:ProjectDetailsForm)=>{
    return useMutation({
        mutationFn:async()=>{
            const response=await ApiManager.put(ProjectEndpoints.updateProject(accountId,projectId),updatedData);
            return response;
        }
    })
}

export const useDeleteProject=(accountId:number,projectId:number)=>{
    return useMutation({
        mutationFn:async()=>{
            const response=await ApiManager.delete(ProjectEndpoints.deleteProject(accountId,projectId));
            return response;
        }
    })
}

