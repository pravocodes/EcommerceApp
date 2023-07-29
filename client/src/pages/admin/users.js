import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu';
import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';

const users = () => {
  return (
    <>
    <Layout title = "EzCart - Users"/>
    <Header />
      <div className="container-fluid m-3 p-3" style={{minHeight: '100vh'}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9 pt-5" style={{ fontSize: "25px" }}>
           
              <h1>Users</h1>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default users
