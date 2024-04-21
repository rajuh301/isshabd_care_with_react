import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import the useParams hook
import Navbar from "../Shair/Navbar";
import MoreProducts from "./MoreProducts";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>;

const Details = () => {
  const [data, setData] = useState(null);
  const { _id } = useParams(); // Get the value of _id from the URL parameter

  useEffect(() => {
    fetch(`https://isshabd-server.vercel.app/product/${_id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [_id]);

  // --------------------- more product same catagory--------
  const moreProduct = data?.category;
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    fetch("https://isshabd-server.vercel.app/product")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const showProduct = userdata?.filter(
    (product) => product.category === moreProduct
  );
  // --------------------- more product same catagory--------

  // -------------- Add to cart---------------

  const handleAddtoCart = (data) => {
    const cartItem = {
      data,
    };

    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const isProductExists = existingCartItems.some(
      (item) => item.data._id === cartItem.data._id
    );

    if (isProductExists) {
      Swal.fire({
        title: "Error",
        text: "This product already exists in your cart.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } else {
      existingCartItems.push(cartItem);
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

      Swal.fire({
        title: "Added to Cart!",
        text: "This product has been added to your cart.",
        icon: "success",
        confirmButtonText: "Close",
      });
    }
  };

  // -------------- Add to cart---------------

  // ---------------------- Buy Section------------

  // const handleBuy = (_id) => {
  //   console.log(_id)
  // }

  // ---------------------- Buy Section------------

  // ------------------------------- Rating--------------

  // ------------------------------- All User------------------
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    fetch(`https://isshabd-server.vercel.app/users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [setAllUsers]);

  // ------------------------------- All User------------------

  // console.log(allUsers)

  const [rating, setRating] = useState(0);
  const handleRatingChange = async (newRating) => {
    setRating(newRating);

    const submitedRating = allUsers.length / newRating;
    // console.log(submitedRating);

    fetch(`https://isshabd-server.vercel.app/product/rating/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ rating: submitedRating }), // Sending the new rating in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          // refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // ------------------------------- Rating--------------

  // ---------------------------------- Comment---------------

  // ----------------------------- User--------------------

  const { user } = useContext(AuthContext);
  const userName = user?.displayName;
  // ----------------------------- User--------------------

  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async () => {
    try {
      await fetch(
        `https://isshabd-server.vercel.app/product/comment/${_id}`, // Use the correct URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: userName + " : " + commentText }),
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1500,
      });

      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };
  // ---------------------------------- Comment---------------

  // -------------------------- Show Comment-----------------------

  let userComment = userdata?.filter((comm) => comm.text);

  const updateData = userComment?.map((dat) => dat.text);

  // -------------------------- Show Comment-----------------------

  // ----------------------- Image

  const img2 = `https://isshabd-server.vercel.app/${data?.imagePaths[1]}`;
  const img3 = `https://isshabd-server.vercel.app/${data?.imagePaths[2]}`;
  const img4 = `https://isshabd-server.vercel.app/${data?.imagePaths[3]}`;
  const img5 = `https://isshabd-server.vercel.app/${data?.imagePaths[4]}`;
  const img = `https://isshabd-server.vercel.app/${data?.imagePaths[0]}`;

  let [images, setImages] = useState([]);

  if (images.length === 0) {
    images = img;
  }

  if (!data || !data?.imagePaths || data?.imagePaths.length === 0) {
    return (
      <div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleImage = (imgs) => {
    setImages(imgs);
  };

  // ----------------------- Image

  return (
    <div>
      {data ? (
        <div>
          <Navbar></Navbar>

          <div className="flex lg:card-side bg-base-600 shadow-xl border p-5 ">
            <figure>
              <img
                className="md:w-[300px] w-72 h-52 md:h-[300px] mx-10 rounded"
                src={images}
                alt="Album"
              />
            </figure>
            <img className="md:hidden w-96 h-52" src={images} alt="Album" />

            <div className="md:absolute top-[500px] px-16">
              <button onClick={() => handleImage(img2)}>
                <img
                  className="w-28 h-28 rounded hover:rounded-2xl duration-150 p-2"
                  src={img2}
                  alt=""
                />
              </button>

              <button onClick={() => handleImage(img3)}>
                <img
                  className="w-28 h-28 rounded hover:rounded-2xl duration-150 p-2"
                  src={img3}
                  alt=""
                />
              </button>

              <button onClick={() => handleImage(img4)}>
                <img
                  className="w-28 h-28 rounded hover:rounded-2xl duration-150 p-2"
                  src={img4}
                  alt=""
                />
              </button>

              <button onClick={() => handleImage(img5)}>
                <img
                  className="w-28 h-28 rounded hover:rounded-2xl duration-150 p-2"
                  src={img5}
                  alt=""
                />
              </button>

              <button onClick={() => handleImage(img)}>
                <img
                  className="w-28 h-28 rounded hover:rounded-2xl duration-150 p-2"
                  src={img}
                  alt=""
                />
              </button>
            </div>

            <div className="card-body">
              <h2 className="card-title text-3xl font-bold">{data.name}</h2>
              <p className="font-bold">
                Old Price :{" "}
                <span className="text-red-500 text-1xl font-bold line-through">
                  {data.discount} TK{" "}
                </span>{" "}
              </p>
              <p className="font-bold">Price: {data.price} Tk</p>

              <div className="flex">
                <p className="w-72 h-48 overflow-y-auto">
                  Description : {data.description}
                </p>
              </div>

              {/* Open the modal using ID.showModal() method */}
              <button
                className="btn"
                onClick={() => window.my_modal_1.showModal()}
              >
                {/* ------------------------------- */}
                <div>
                  <div className="text-3xl">
                    {/* Display the rating */}
                    {Array.from({ length: 3 + 2 }, (_, index) => (
                      <span
                        key={index}
                        style={{
                          color: "gold",
                        }}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>

                {/* ------------------------------- */}
              </button>
              <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                  <h3 className="font-bold text-lg">Rating</h3>

                  {/* ------------------------------------------------------------------ */}
                  <div>
                    <div>
                      <div className="text-3xl">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            onClick={() => handleRatingChange(index + 1)}
                            style={{
                              cursor: "pointer",
                              color: index < rating ? "gold" : "gray",
                            }}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                      <p>You have rated this Book: {rating} star(s)</p>
                    </div>

                    <hr />
                    {/* -------------------- Comment Section---------------------- */}

                    <p>একটি মন্তব্য লিখুন</p>

                    <div>
                      <textarea
                        className="textarea textarea-ghost w-full shadow border-red-400"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="লিখুন...."
                      />
                      <button
                        className="btn mt-4 btn-outline "
                        onClick={handleCommentSubmit}
                      >
                        যোগ করুন
                      </button>
                    </div>

                    {/* ------------------ Comment Section---------------------- */}
                  </div>
                  {/* ------------------------------------------------------------------ */}

                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </div>
                </form>
              </dialog>

              {/* ----------------------------------------- Show Comment--------------------- */}

              <div className="w-full mt-5 h-40 border">
                <div className="w-full h-full border-none overflow-y-auto resize-none focus:outline-none">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <tbody>
                        <td>
                          {updateData?.map((data, index) => (
                            <span
                              className="font-bold hover:text-gray-500"
                              key={index}
                            >
                              {data}

                              <div className="">
                                {index !== updateData?.length - 1 && <br />}
                              </div>
                            </span>
                          ))}
                        </td>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* --------------------------------- */}

              <div className="card-actions justify-end">
                <button
                  onClick={() => handleAddtoCart(data)}
                  className="btn btn-primary"
                >
                  Add to cart
                </button>

                <Link to={`/buyProduct/${data._id}`}>
                  <button className="btn btn-primary">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-40">
          <span className="loading loading-spinner loading-lg"></span>
        </p>
      )}

      {/* -----------------------More----------------------- */}
      <h1 className="text-4xl font-bold text-center mt-10">
        More Products in same category
      </h1>
      <div className="md:grid grid-cols-4 gap-5 md:mt-10">
        {showProduct?.map((pro) => (
          <MoreProducts key={pro._id} pro={pro}></MoreProducts>
        ))}
      </div>
      {/* -----------------------More----------------------- */}
    </div>
  );
};

export default Details;
