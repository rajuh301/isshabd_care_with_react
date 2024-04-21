
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../../Shair/Navbar';
import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
} from 'react-icons/ai';


const ManageProducts = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/products');
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProduct();
    }, []);

    const toggleDisplay = async (id) => {
        setLoading(true);

        const productToUpdate = product.find((pro) => pro._id === id);
        const updatedProduct = {
            ...productToUpdate,
            showDisplay: !productToUpdate.showDisplay,
        };

        const updatedProducts = [...product.filter((pro) => pro._id !== id), updatedProduct];

        setProduct(updatedProducts);

        try {
            await fetch(`https://isshabd-server.vercel.app/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ showDisplay: updatedProduct.showDisplay }),
            });

            setLoading(false);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            setLoading(false);
            console.error('Error updating product:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to update product",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col md:flex-row">


                <div  >
                    <nav className="bg-gray-800 text-white w-full md:w-64  md:h-[700px] py-4 px-6 md:py-10 md:px-4">
                        <div className="text-2xl font-semibold mb-4">Admin Panel <span className="loading loading-ring loading-lg"></span>
                        </div>
                        <ul>
                            <li>
                                <NavLink
                                    exact
                                    to="/dashboard"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >
                                    Dashboard
                                </NavLink>
                                <hr />
                            </li>
                            <li className='mt-16'>
                                <NavLink
                                    to="/addProduct"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >
                                    <div className='flex items-center gap-2'>
                                        <AiOutlineDeliveredProcedure></AiOutlineDeliveredProcedure> Add Product
                                    </div>
                                </NavLink>
                            </li>
                            <li className='mt-5'>
                                <NavLink
                                    to="/addCategory"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >
                                    <div className='flex items-center gap-2'>
                                        <AiFillCalculator></AiFillCalculator> Add Category
                                    </div>
                                </NavLink>
                            </li>
                            <li className='mt-5'>
                                <NavLink
                                    to="/manageproduct"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >
                                    <div className='flex items-center gap-2'>
                                        <AiOutlineShopping></AiOutlineShopping> Manage Product
                                    </div>
                                </NavLink>
                            </li>
                            <li className='mt-5'>
                                <NavLink
                                    to="/showorderproduct"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >
                                    <div className='flex items-center gap-2'>
                                        <AiOutlineUser></AiOutlineUser> Order Products
                                    </div>
                                </NavLink>
                            </li>
                            <li className='mt-5'>
                                <NavLink
                                    to="/account"
                                    className="hover:text-blue-500 cursor-pointer"
                                    activeClassName="text-blue-500"
                                >

                                    <div className='flex items-center gap-2'>
                                        <AiFillAccountBook></AiFillAccountBook> Account
                                    </div>


                                </NavLink>
                            </li>

                            {/* Add more sidebar menu items */}
                        </ul>
                    </nav>
                </div>

                <div className=''>
                    <div className='flex text-center'>
                        {loading && <p>Loading .......</p>}
                    </div>

                    <div className='grid grid-cols-3'>
                        {product?.map((pro) => (
                            <div key={pro._id} className='gap-10 p-5'>
                                <div className="card w-72 bg-neutral text-neutral-content">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{pro.name}</h2>
                                        <p>Price : {pro.price}</p>

                                        <img
                                            src={pro.image}
                                            alt={pro.name}
                                            style={{ filter: pro.showDisplay === true ? 'none' : 'grayscale(100%)' }}
                                            className="w-full h-auto mb-4"
                                        />
                                        <div className="card-actions justify-end">
                                            <button
                                                className={`btn ${pro.showDisplay === false ? 'btn-secondary bg-slate-500' : 'btn-primary'}`}
                                                onClick={() => toggleDisplay(pro._id)}
                                                disabled={loading}
                                            >
                                                {pro.showDisplay ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
