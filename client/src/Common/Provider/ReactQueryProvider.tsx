import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient=new QueryClient();

export const ReactQueryProvider=({children}:{children:React.ReactNode})=>{
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    )
}