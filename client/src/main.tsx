import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ReactQueryProvider } from '@/Common/Provider/ReactQueryProvider';
import router from './Router/Router'
import { Toaster } from './shadcn/components/ui/toaster';
import { AuthProvider } from './Common/Provider/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>,
)
