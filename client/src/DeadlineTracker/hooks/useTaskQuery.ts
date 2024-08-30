import { useQuery } from "@tanstack/react-query";

export interface TaskDetails{
    id:number;
    title:string;
    description?:string;
    dueDate:Date;
}

export const useGetAllTaskDetails=()=>{
    return useQuery({
        queryKey:['tasks'],
        queryFn:async()=>{
            
        }
    })
}