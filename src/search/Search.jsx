import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import Navbar from "../components/Shair/Navbar";
import Footer from "../components/Shair/Footer";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm");
  console.log("Search Term:", searchTerm);

  const [data, setData] = useState([]);
  console.log("book data ", data);
  useEffect(() => {
    fetch(`https://isshabd-server.vercel.app/search/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [searchTerm]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="px-8 my-8">
        <div className=" py-6 px-8">
          <div className="md:grid grid-cols-4 gap-8 ">
            {data.map((searchedProducts) => (
              <SearchComponent
                key={searchedProducts._id}
                searchedProducts={searchedProducts}
              ></SearchComponent>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Search;
