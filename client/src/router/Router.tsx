import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Index from '../deadlinetracker/views/Index';

export const Router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                index:true,
                element:<Index/>
            }
        ]
    }
])