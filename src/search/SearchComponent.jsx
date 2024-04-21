import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import Navbar from "../components/Shair/Navbar";

const SearchComponent = ({ searchedProducts }) => {
  const { _id, name, image, imagePaths, rating, price, discount, brand } =
    searchedProducts;

  const img = `https://isshabd-server.vercel.app/${imagePaths[0]}`;

  const oldPrice = discount;
  const off = oldPrice - price;
  const offers = (off / oldPrice) * 100;
  const offer = offers.toFixed(0);
  return (
    <div className="card card-compact w-72 bg-base-300 shadow-xl md:mb-0 mb-5">
      <div className="card-actions justify-end">
        <Link to={`/product/${_id}`}>
          <button>
            <figure>
              <img className="w-72 h-52 rounded-lg" src={img} />
            </figure>
            <p className="absolute top-0 rounded-full bg-yellow-300 font-bold">
              {offer ? offer : ""}%
            </p>
            <div className="card-body">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <h2 className="font-bold">Brand: {brand ? brand : "No Brand"}</h2>
              <div className="rating justify-center">
                <Rating
                  initialRating={rating}
                  emptySymbol={
                    <span className="text-yellow-600 text-2xl">☆</span>
                  }
                  fullSymbol={
                    <span className="text-yellow-600 text-2xl">★</span>
                  }
                  fractions={5}
                  readonly
                />
              </div>

              <div className="flex items-center text-left">
                <p className="font-bold">
                  Old Price :{" "}
                  <span className="text-red-500 text-1xl font-bold line-through">
                    {discount} TK{" "}
                  </span>{" "}
                </p>
                <p className="font-bold">Price: {price} TK</p>
              </div>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchComponent;
