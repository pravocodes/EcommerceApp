import React,{useState,useEffect} from 'react'
import Layout from '../components/Layouts/Layout'
import Footer from '../components/Layouts/Footer';
import Header from '../components/Layouts/Header';
import { Notyf } from 'notyf';
import {Checkbox, Radio} from 'antd'
import axios from 'axios';
import { Prices } from '../components/prices';
import { createSearchParams } from 'react-router-dom';

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "top",
  },
});

const HomePage = () => {
  const [products, setProducts]  = useState([]);
  const [categories, setCategories ]= useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-allcategory`
      );
      if (data?.success) {
        setCategories(data?.allcat);
      }
    } catch (error) {
      console.log(error);
      notyf.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  const getAllProducts = async () => {
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    }
    catch(error){
      console.log(error)
      notyf.error("somthing went wrong");
    }
  }
  useEffect(() => {
    if(!checked.length && !radio.length) getAllProducts();
  },[checked.length,radio.length]);

  useEffect(() => {
    filterProduct();
  },[checked,radio])

  const handleFilter = (value,id) => {
    let all = [...checked];
    if(value){
      all.push(id)
    }
    else{
      all = all.filter(c => c!==id)
    }
    setChecked(all);
  }

  const filterProduct = async () => {
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters/`,{checked,radio})
      setProducts(data?.products)
    }
    catch(error){
      console.log(error);
      notyf.error("Something went Wrong")
    }
  }
  
  return (
    <>
      <Layout />
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <div className='row mt-3'>
          <div className='col-md-2'>
            <h6 className='text-center' style={{fontSize:"3vh"}}>Filter by Category</h6>
            {categories?.map(c => (
              <div className='d-flex flex-coloumn ms-2'>
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
              </div>
            ))}
            <h6 className='text-center mt-4' style={{fontSize:"3vh"}}>Filter by Prices</h6>
              <div className='d-flex flex-coloumn ms-2'>
                <Radio.Group onChange={e => setRadio(e.target.value)}>
                  {Prices?.map(p => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
          </div>
          <div className='col-md-9'>
            {JSON.stringify(checked,null,4)}
            {JSON.stringify(radio,null,4)}
            <h1 className='text-center' style={{fontSize:'10vh'}}>All Product</h1>
            <div className='d-flex flex-wrap'>
            {products?.map((p) => (
                  <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0,30)}</p>
                      <p className="card-text">₹{p.price}</p>
                      <p className='card-text'>Shipping: {p.shipping?"Yes":"No"}</p>
                      <button className='btn btn-primary ms-1'>More Details</button>
                      <button className='btn btn-secondary  ms-1'>Add to Cart</button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  )
}

export default HomePage
