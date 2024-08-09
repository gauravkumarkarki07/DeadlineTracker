import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Tracker from '../deadlinetracker/views/Index';
import Calendar from '../calendar/views/Index';
import Tasks from '../tasks/views/Index';
import SignUp from '@/auth/views/signup';
import PrivateRoute from "@/auth/components/PrivateRoute";
import Login from '@/auth/views/login';

export const Router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<PrivateRoute/>,
                children:[
                    {
                        path: 'tracker',
                        element: <Tracker />,
                        children: [
                            {
                                path: 'calendar',
                                element: <Calendar />
                            },
                            {
                                path: 'tasks',
                                element: <Tasks />
                            }
                        ]
                    }
                ]
            },
            {
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'login',
                element:<Login/>
            }
        ]
    }
])