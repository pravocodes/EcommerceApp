import React,{useState ,useEffect}from 'react';

import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu'
import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Link } from 'react-router-dom';
const UserProfile = () => {

  const {auth ,setAuth} =useAuth()


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top",
    },
  });

useEffect(()=>{
  const{email,name,phone,address,password} = auth?.user
  setName(name);
  setPhone(phone);
  setEmail(email);
  setAddress(address);
},[auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `/api/v1/auth/profile`,
        { name, email, password, phone, address, }
        // answer was removed in thee video
      );
     
      if (data?.error ){
        notyf.error(data?.error)
      }
      else{
        setAuth({...auth, user: data?.updatedUser});
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls));
        notyf.success("Profile Updated Successfully");
      }
      // if (res && res.data && res.data.success) {
      //   notyf.success(res.data && res.data.message);
      //   navigate("/login");
      // } else {
      //   notyf.error(res.data.message);
      // }
    } catch (error) {
      console.log(error);
      notyf.error("Something went Wrong");
    }
  };
  return (
    <>
    <Header/>
    <Layout title = "Your Profile"/>
    <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default UserProfile
 