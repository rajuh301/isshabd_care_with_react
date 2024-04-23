import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
    AiFillTrademarkCircle,
} from 'react-icons/ai';
import Navbar from '../../Shair/Navbar';
import Swal from 'sweetalert2';

const AddMarket = () => {

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://isshabd-server.vercel.app/addmarket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    date: new Date().toLocaleString(),
                }),
            });

            const data = await response.json();
            console.log('Response Data:', data);

            if (data.acknowledged) {
                Swal.fire({
                    title: 'Success',
                    text: 'Transaction saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                setFormData({
                    amount: '',
                    description: '',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.message || 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };



    return (
        <div>
            <div>
                <Navbar />
                <div className="flex">
                    <div >
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
                    </div>

                    {/* ------------------- Add Market------------------- */}
                    <div className="container mx-auto p-4">
                        <h1 className="text-2xl mb-4">Add Transaction</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-2 w-full border rounded-md"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* ------------------- Add Market------------------- */}




                </div>
            </div>
        </div>
    );
};

export default AddMarket;