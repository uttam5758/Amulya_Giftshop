import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import logoo1 from "../../Assets/shilajit1.png";
import logoo from "../../Assets/homepage.png";
import bg from "../../Assets/keyring.png";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Products/ProductCard";
import Header from "./Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <loading />
      ) : (
        <>
          <MetaData title="Amulya" />
          <Header />

          {/* Banner */}
          <div className="banner">
            <Carousel className="new" indicators={false} animation="slide" duration={700}>
              <div className="bannerSlide">
                <img src={logoo1} className="bgImg" alt="banner" />
              </div>
              <div className="bannerSlide">
                <img src={logoo} className="bgImg" alt="banner" />
              </div>
              <div className="bannerSlide">
                <img src={bg} className="bgImg" alt="banner" />
              </div>
            </Carousel>

            {/* Overlay content */}
            <div className="home__content">
              <div className="brandRow">
                <div className="brandDot"></div>
                <h2 className="brandTitle">Amulya</h2>
              </div>

              <h2 className="heroLineOne">Creating Moments</h2>
              <h2 className="heroLineTwo">Crafting Happiness</h2>

              <p className="heroSub">
                Best and Authentic Gift Shop At Kathmandu (Amulya) Creating Moments, Crafting Happiness...
              </p>

              <div className="heroActions">
                <a href="#container" className="ctaLink">
                  <button type="submit" className="ctaBtn">
                    Shop Now
                  </button>
                </a>

                <div className="trustRow">
                  <span className="trustPill">Secure Checkout</span>
                  <span className="trustPill">Fast Delivery</span>
                  <span className="trustPill">Premium Leather</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured */}
          <div className="sectionTop">
            <h2 className="homeHeading">Featured Products</h2>
            <p className="sectionSub">
              Best selling pieces curated for gifting, anniversaries, and everyday love.
            </p>
          </div>

          <div className="container" id="container">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Home;
