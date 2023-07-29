import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/Auth.js'
import Footer from '../components/Layouts/Footer';
import Header from '../components/Layouts/Header';

const HomePage = () => {
  const {auth,setAuth} = useAuth();
  return (
    
      <>
      <Layout />
      <Header />
      <div style={{minHeight: '100vh'}}>
        <h1>Homepage</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
        </div>
      <Footer />
      </>
    
     )
}

export default HomePage
