import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import Footer from "../components/Layouts/Footer";
import Header from "../components/Layouts/Header";
import { Notyf } from "notyf";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../components/prices";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "./Homepage.css";

const notyf = new Notyf({
  duration: 2000,
  position: {
    x: "center",
    y: "top",
  },
});

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-allcategory"
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
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notyf.error("somthing went wrong");
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    filterProduct();
  }, [checked, radio]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(...products, ...data?.products);
    } catch (error) {
      console.log(error);
      notyf.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/product-filters/`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      notyf.error("Something went Wrong");
    }
  };

  return (
    <>
      <Layout />
      <Header />
      <div style={{ minHeight: "100vh" }}>
        <div className="row mt-3">
          <div >

          <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"> FILTERS </button>

          <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <h6 className="text-center" style={{ fontSize: "3vh" }}>
                <b><u>Filter by Category</u></b>
                </h6>
            {categories?.map((c) => (
              <div className="d-flex flex-coloumn ms-2" key={c._id}>
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
            <h6 className="text-center mt-4" style={{ fontSize: "3vh" }}>
            <b><u>Filter by Prices</u></b>
            </h6>
            <div className="d-flex flex-coloumn ms-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            {checked.length || radio.length ? (
              <div className="d-flex flex-coloumn ms-2">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTER
                </button>
              </div>
            ) : (
              ""
            )}
  </div>
</div>


            
          </div>
          <div className="col-md-12">
          <hr class="custom-hr mb-0"/> 
          <div id="carouselExampleAutoplaying" class="carousel slide mb-5" data-bs-ride="carousel">
  <div class="carousel-inner ">
    <div class="carousel-item active">
      <img src="https://i.postimg.cc/ryhm3P0f/Untitled-1.png" class="d-block img-fluid mx-auto" alt="Carousel-1" />
    </div>
    <div class="carousel-item">
      <img src="https://i.postimg.cc/mrNBpt6b/carousel-1.jpg" class="d-block  mx-auto" alt="Carousel-2" />
    </div>
    <div class="carousel-item">
      <img src="https://i.postimg.cc/HWrFVr4V/carousel-3.webp" class="d-block  mx-auto" alt="Carousel-3"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "17rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title" >{p.name}</h5>
                    <p className="card-text">
                      {/* {p.description.substring(0, 30)} */}
                    </p>
                    <p className="card-text" style={{fontWeight:"600"}}>${p.price}</p>
                    <p className="card-text">
                      Shipping: {p.shipping ? "Yes" : "No"}
                    </p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary  ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        notyf.success("product added successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
