import React, { useEffect, useState } from 'react';
import Products from './Products';


const Category = () => {





    const [datas, setDatas] = useState([])
    const [userdata, setUserData] = useState([])
    const [categorys, setCategorys] = useState([])


    // ------------ get Data from product -------
    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/product')
            .then(res => res.json())
            .then(data => setDatas(data))
    }, [])

    // ------------ get Data from product -------


    // ------------ get Data from product -------
    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/category')
            .then(res => res.json())
            .then(data => setCategorys(data))
    }, [setCategorys._id])


    // ------------ get Data from product -------




    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/product')
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [datas._id])


    if (!userdata) {
        return <p className='text-center mt-40'><span className="loading loading-spinner loading-lg"></span></p>
    }

    // ---------------------------------------------------


    // ------------------------
    const handleCategory = (name) => {
        console.log(name)
        const results = userdata.filter(product => product.category === name)

        setDatas(results)


    }
    // ------------------------


    // -----------------------Pagenation-----------------------
    const itemsPerPage = 8; // Number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to get the products for the current page
    const displayedData = datas.slice(startIndex, endIndex);

    const totalPages = Math.ceil(datas.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    // -----------------------Pagenation-----------------------




    return (
        <div className='bg-slate-100'>

            <p className='text-3xl font-bold text-center py-5'>Category</p>


            {/* ------------------------------------------------------------- */}

            <div className='overflow-x-auto'>

                <div className='flex gap-5'>
                    {
                        categorys.map(data => <div

                            key={data._id}
                            className=" ">
                            <button

                                onClick={() => handleCategory(data.name)} // Replace 
                            >
                                <figure><img className='rounded-full w-32 flex mx-auto' src={data.image ? data.image : ''} alt="Category" /></figure>
                                <h2 className="text-2xl text-center w-40 mb-1">{data.name}</h2>

                            </button>



                        </div>)
                    }
                </div>

            </div>
            {/* ----------------------------------------------------------------------- */}
            <p className='text-3xl font-bold text-center py-5'>Products</p>


            {/* ------------------------------------ Pagenation-------------- */}
            <div>


                <div className='md:grid grid-cols-4 mx-12 md:mx-20 my-10 md:gap-20 gap-y-5'>
                    {displayedData.map((data) => (
                        <Products key={data._id} data={data} />
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-200 text-blue-800 hover:bg-blue-400'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            {/* ------------------------------------ Pagenation-------------- */}


        </div>


    );
};

export default Category;