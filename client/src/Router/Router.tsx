import App from "@/App";
import Index from "@/Auth/views/Index";
import SignUp from "@/Auth/components/SignUp";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/Auth/components/Login";
import DeadlineTracker from "@/DeadlineTracker/views/Index";
import Dashboard from "@/DeadlineTracker/views/Dashboard";
import Projects from "@/DeadlineTracker/views/Projects";
import Calendar from "@/DeadlineTracker/views/Calendar";

const router=createBrowserRouter([
    {
        path:'',
        element:<App/>,
        children:[
            {
                path:'auth',
                element:<Index/>,
                children:[
                    {
                        path:'signup',
                        element:<SignUp/>
                    },
                    {
                        path:'login',
                        element:<Login/>
                    }
                ]
            },
            {
                path:'deadline-tracker',
                element:<DeadlineTracker/>,
                children:[
                    {
                        path:'',
                        element:<Navigate to={'dashboard'} replace={true}/>
                    },
                    {
                        path:'dashboard',
                        index:true,
                        element:<Dashboard/>
                    },
                    {
                        path:'projects',
                        element:<Projects/>
                    },
                    {
                        path:'calendar',
                        index:true,
                        element:<Calendar/>
                    },
                ]
            }

        ]
    }
])

export default router;