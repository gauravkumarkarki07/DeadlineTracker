import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Index from '../deadlinetracker/views/Index';
import Calendar from '../calendar/views/Index';
import Tasks from '../tasks/views/Index';

export const Router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Index/>,
                children:[
                    {
                        path:'calendar',
                        element:<Calendar/>
                    },
                    {
                        path:'tasks',
                        element:<Tasks/>
                    },
                ]
            }
        ]
    }
])