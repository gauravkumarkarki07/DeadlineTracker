import App from "@/App";
import Index from "@/Auth/views/Index";
import SignUp from "@/Auth/components/SignUp";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/Auth/components/Login";
import DeadlineTracker from "@/DeadlineTracker/views/Index";
import Dashboard from "@/DeadlineTracker/views/Dashboard";
import Projects from "@/DeadlineTracker/views/Projects";
import Calendar from "@/DeadlineTracker/views/Calendar";
import ProtectedRoute from "@/DeadlineTracker/components/ProtectedRoute";
import NotFound from "@/DeadlineTracker/views/NotFound";
import ProjectEditPage from "@/DeadlineTracker/components/ProjectEditPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: 'auth',
                element: <Index />,
                children: [
                    {
                        path: 'signup',
                        element: <SignUp />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    }
                ]
            },
            {
                path: 'deadline-tracker',
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '',
                        element: <DeadlineTracker />,
                        children: [
                            {
                                path: '',
                                element: <Navigate to={'dashboard'} replace={true} />
                            },
                            {
                                path: 'dashboard',
                                index: true,
                                element: <Dashboard />
                            },
                            {
                                path: 'projects',
                                element: <Projects />,
                            },
                            {
                                path: 'projects/:projectId',
                                element: <ProjectEditPage/>,
                            },
                            {
                                path: 'calendar',
                                index: true,
                                element: <Calendar />
                            },
                        ]
                    }
                ]
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ],
    }
])

export default router;