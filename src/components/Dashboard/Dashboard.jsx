import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../Shair/Navbar';
import { AiOutlineUser, AiOutlineShopping, AiFillCalculator, AiOutlineDeliveredProcedure, AiFillAccountBook } from 'react-icons/ai';
import Cart from './UserDashboard/Cart';



const Dashboard = () => {
    const [isAdmin] = useAdmin(null);


    // --------------------- Cart----------------


    const localStorageData = JSON.parse(localStorage.getItem('cartItems'))

    // --------------------- Cart----------------






    return (
        <div className=''>

            <Navbar></Navbar>





            {
                isAdmin ?
                    // ---------------------- Left nav-----------------------

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
                                            <AiOutlineShopping></AiOutlineShopping> Manage Products
                                        </div>

                                    </NavLink>
                                </li>


                                <li className='mt-5'>
                                    <NavLink
                                        to="/showOrderProduct"
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
                        <div className="flex-1 p-4 md:p-8">
                            {/* Main content of the admin home page */}
                            <h1 className="text-3xl font-semibold">Welcome to the Admin Panel</h1>
                            <p className="mt-2 text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                            {/* Add more content here */}
                        </div>
                    </div>
                    // ---------------------- Left nav-----------------------




                    // -------------------------------------------- Users--------------------------------

                    : <div>


                        <div className="flex flex-col md:flex-row">
                            <nav className="bg-gray-800 text-white w-full md:w-64  md:h-[700px] py-4 px-6 md:py-10 md:px-4">
                                <div className="text-2xl font-semibold mb-4">User Panel <span className="loading loading-ring loading-lg"></span>
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
                                            to="/dashboard"
                                            className="hover:text-blue-500 cursor-pointer"
                                            activeClassName="text-blue-500"
                                        >
                                            <div className='flex items-center gap-2'>
                                                <AiOutlineDeliveredProcedure></AiOutlineDeliveredProcedure> Track Order
                                            </div>
                                        </NavLink>
                                    </li>







                                    <li className='mt-5'>
                                        <NavLink
                                            to="/dashboard"
                                            className="hover:text-blue-500 cursor-pointer"
                                            activeClassName="text-blue-500"
                                        >
                                            <div className='flex items-center gap-2'>
                                                <AiFillCalculator></AiFillCalculator> Payment Histery
                                            </div>
                                        </NavLink>
                                    </li>



                                    {/* Add more sidebar menu items */}
                                </ul>
                            </nav>
                            <div className="flex-1 p-4 md:p-8">
                                {/* Main content of the admin home page */}
                                <h1 className="text-3xl font-semibold">Welcome to the User</h1>

                                {/* Add more content here */}


                                {/* ---------------------------------------------Cart--------------- */}

                                {
                                    localStorageData?.map(storeData => <Cart
                                        key={storeData._id}
                                        storeData={storeData}
                                    ></Cart>)
                                }


                                {/* -------------------------------------------Cart--------------- */}




                            </div>
                        </div>

                    </div>

            }






        </div>
    );
};

export default Dashboard;