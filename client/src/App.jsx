import React, { Suspense, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import api from './configs/api';
import { login, setLoading } from './app/features/authSlice.feature';
import {Toaster} from 'react-hot-toast';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Layout = React.lazy(() => import('./pages/Layout'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const Preview = React.lazy(() => import('./pages/Preview'));
const Login = React.lazy(() => import('./pages/Login'));

const App = () => {

  const dispatch = useDispatch();

  const getUserData = useCallback(async () =>{
    const token = localStorage.getItem("token");

    try {
      if(token){
        const {data} = await api.get("/api/user/data",
        {  headers: {
            Authorization: `Bearer ${token}`
          }}
        );
        if(data.user){
          dispatch(login({token,user:data.user}))
        }
      }
    } catch (error) {
      // Log full error to help debug network / CORS / auth issues
      console.error("Error fetching user data:", error);
      if (error?.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(()  => {
    getUserData();
  }, [getUserData]);

  return (
    <Suspense fallback={" "}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />

      </Routes>
    </Suspense>
  );
};

export default App;
