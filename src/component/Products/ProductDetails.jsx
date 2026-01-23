import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./Productdetails.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import ReviewCard from "./ReviewCard.jsx";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import Footer from "../../more/Footer";
import SimpleCustomization from "./SimpleCustomization";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    {
      isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Review done successfully reload for watch it");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Increase quantity
  const [quantity, setQuantity] = useState(1);

  // Customization state (passed to cart as-is; UI updates only)
  const [customization, setCustomization] = useState({
    // new customization fields
    color: "",
    customerName: "",
    location: "",
    customMessage: "",
    charms: [],
    customerImage: null,
    imagePreview: null,

    // backward compatible fields
    name: "",
    shortMessage: "",
  });

  const increaseQuantity = () => {
    if (product.stock <= quantity) return toast.error("Product stock limited");
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleCustomizationChange = (updatedCustomization) => {
    setCustomization(updatedCustomization);
  };

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity, customization));
      toast.success("Product Added to cart with customization!");
    } else {
      toast.error("Product stock limited");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Product Added to Favourites");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="product-page-grid">
              {/* LEFT: keep product content exactly as-is */}
              <div className="product-left">
                {/* Product Image at the top */}
                <div className="product-image-container">
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                </div>

                <div className="product-content-wrapper">
                  <div className="varse__2">
                    <div className="detailsBlock-1">
                      <h2>{product.name}</h2>
                    </div>
                    <div className="detailsBlock-2">
                      <Rating {...options} />
                      <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock">
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <h1>{`NRS ${product.price}`}</h1>
                        <h1 className="discountPrice">
                          {product.offerPrice > 0 ? `NRS ${product.offerPrice}` : ""}
                        </h1>
                      </div>
                      <div className="detailsBlock-3-1">
                        <span className="quantity">Quantity</span>
                        <div className="detailsBlock-3-1-1">
                          <button onClick={decreaseQuantity}>-</button>
                          <input type="number" readOnly value={quantity} />
                          <button onClick={increaseQuantity}>+</button>
                        </div>{" "}
                      </div>
                      <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                          {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                      </p>
                    </div>
                  </div>

                  <div
                    className="Description"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>Description:</span>
                    <p>{product.description}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="wishlist"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "12px 20px",
                        backgroundColor: "#fff",
                        border: "2px solid #3BB77E",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                        marginRight: "10px"
                      }}
                      onClick={addToFavouriteHandler}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#3BB77E";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 183, 126, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#3BB77E"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                        style={{ transition: "fill 0.3s ease" }}
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                      <span
                        className="cartBtn"
                        style={{ 
                          color: "#3BB77E",
                          fontWeight: "600",
                          padding: "0px 8px",
                          fontSize: "0.9vmax",
                          fontFamily: "Poppins, sans-serif",
                          transition: "color 0.3s ease"
                        }}
                      >
                        Add to wishlist
                      </span>
                    </div>

                    <div
                      className="pointer flex"
                      style={{
                        padding: "12px 20px",
                        alignItems: "center",
                        background: "linear-gradient(135deg, #3BB77E 0%, #2d8f5f 100%)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(59, 183, 126, 0.3)"
                      }}
                      onClick={addToCartHandler}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 183, 126, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(59, 183, 126, 0.3)";
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        className="bi bi-bag"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                      <button
                        className="cartBtn"
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          padding: "0px 8px",
                          border: "none",
                          cursor: "pointer",
                          background: "none",
                          fontSize: "0.9vmax",
                          fontFamily: "Poppins, sans-serif"
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: customization panel */}
              <div className="product-right">
                <SimpleCustomization
                  product={product}
                  customization={customization}
                  onCustomizationChange={handleCustomizationChange}
                />
              </div>
            </div>
          </div>
          {/* Reviews */}
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            {/* Reviews */}
            <div
              style={{
                padding: "1vmax",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  No Reviews Yet *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
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

export default ProductDetails;
