import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ReactQueryProvider } from '@/Common/Provider/ReactQueryProvider';
import router from './Router/Router'
import { Toaster } from './shadcn/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
        <RouterProvider router={router} />
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>,
)
