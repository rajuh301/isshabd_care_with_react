import React, { useState } from 'react';
import Dashboard from '../Dashboard';
import Navbar from '../../Shair/Navbar';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShopping, AiFillCalculator, AiOutlineDeliveredProcedure, AiFillAccountBook, AiFillTrademarkCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const AddCategory = () => {



    const [categoryName, setCategoryName] = useState([]);
    const [categoryImage, setCategoryImage] = useState([]);
    const [categoryDescription, setCategoryDescription] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
        // Prepare the data to be sent in the request body
        const categoryData = {
            name: categoryName,
            image: categoryImage,
            description: categoryDescription,
        };

        fetch('https://isshabd-server.vercel.app/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })
            .then((response) => {
                if (response.ok) {
                    // Show success SweetAlert notification
                    Swal.fire({
                        icon: 'success',
                        title: 'Category Added Successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Clear the form fields after successful submission
                    setCategoryName('');
                    setCategoryImage('');
                    setCategoryDescription('');
                } else {
                    // Show error SweetAlert notification
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to add category. Please try again later.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Show error SweetAlert notification for network errors
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please try again later.',
                });
            });
    };

    // ... (rest of the component)











    return (
        <div>
            <Navbar></Navbar>

            <div className="flex flex-col md:flex-row">
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
                                    <AiFillCalculator></AiFillCalculator> Add Catagory
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

                            <li className='mt-5'>
                                    <NavLink
                                        to="/addmarket"
                                        className="hover:text-blue-500 cursor-pointer"
                                        activeClassName="text-blue-500"
                                    >

                                        <div className='flex items-center gap-2'>
                                            <AiFillTrademarkCircle></AiFillTrademarkCircle> Add market
                                        </div>


                                    </NavLink>
                                </li>


                        {/* Add more sidebar menu items */}
                    </ul>
                </nav>





                <div className="flex-1 p-4 md:p-8">
                <h2 className='text-3xl font-bold text-center'>Add Category</h2>

                    {/* ------------------------ Content----------------- */}

                    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto md:mt-20 mt-5">


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>



                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryImage">
                                Category Image
                            </label>
                            <input
                                type="text"
                                id="categoryImage"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter category Image Link"
                                value={categoryImage}
                                onChange={(e) => setCategoryImage(e.target.value)}
                                required
                            />
                        </div>




                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryDescription">
                                Category Description
                            </label>
                            <textarea
                                id="categoryDescription"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                                placeholder="Enter category description"
                                value={categoryDescription}
                                onChange={(e) => setCategoryDescription(e.target.value)}
                                required
                            />
                        </div>



                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Category
                            </button>
                        </div>



                    </form>
                    {/* ------------------------ End Content----------------- */}


                </div>
            </div>
        </div>
    );
};

export default AddCategory;