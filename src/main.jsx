

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
// import router from './components/Routes/Router';
// import AuthProvider from './provicers/AuthProvider.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';
// import AuthProvider from './Provider/AuthProvider.jsx';
import { router } from './components/Routes/Router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-gray-100'>

    <div className='max-w-screen-xl mx-auto'>
      <React.StrictMode>




        <AuthProvider>


          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </HelmetProvider>


        </AuthProvider>



      </React.StrictMode>,
    </div>

  </div>



)
