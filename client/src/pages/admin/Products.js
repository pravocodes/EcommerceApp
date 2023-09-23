import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { Notyf } from "notyf";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "top",
  },
});

const Products = (props) => {
  const [products, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      notyf.error("Somthing went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      
      <Layout title="EzCart - Products" />
      <motion.div
        style={{ minHeight: "100vh" }}
        intial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.4 } }}
      >
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center" style={{ fontSize: "10vh" }}>
              All Products List
            </h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">${p.price}</p>
                      <p className="card-text">
                        Shipping: {p.shipping ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Products;
