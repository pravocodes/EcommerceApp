import React from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuth } from '../../context/Auth'
import Header from '../../components/Layouts/Header'
import Footer from '../../components/Layouts/Footer'


const Dashboard = () => {
  
  const {auth} =useAuth();

  return (
    <>
    <Layout title = "EzCart - Dashboard"/>
    <Header />
      <div className="container-fluid m-3 p-3" style={{minHeight:'100vh'}}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 pt-5" style={{ fontSize: "25px" }}>
            <div className="card w-75 p-3">
              <h1>{auth?.user?.name}</h1>
              <h1>{auth?.user?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Dashboard
