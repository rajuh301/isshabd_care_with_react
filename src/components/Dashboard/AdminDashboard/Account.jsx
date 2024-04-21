
import { useEffect, useState } from "react";
import Navbar from "../../Shair/Navbar";
import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
} from 'react-icons/ai';

const Account = () => {

    const [orderss, setOrderss] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/order');
                const data = await res.json();
                setOrderss(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);





    const today = new Date().toLocaleDateString(); // Get today's date in MM/DD/YYYY format
    const accepted = orderss?.filter(ord => ord.status === 'done' && ord.date.split(',')[0] === today);
    const acceptedAll = orderss?.filter(ord => ord.status === 'done');


    // ------------- Date Functtion ----------
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedDate)

    const dateAmount = orderss?.filter(ord => ord.status === 'done' && ord.date.split(',')[0] === selectedDate);
    // ------------- Date Functtion ----------
    return (


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



                            {/* Add more sidebar menu items */}
                        </ul>
                    </nav>
                </div>


                <div className=" rounded shadow-lg mx-auto px-10 py-10">
                    {/* <p>{today}</p> */}

                    <div className="flex gap-4 ">

                        <div className="border p-2 flex">
                            <p className="font-bold">Todays Amount: {
                                accepted?.reduce((acc, order) => {
                                    return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                                }, 0)
                            }</p>
                        </div>

                        <div className="border p-2 flex">
                            <p className="font-bold">Total Amount: {
                                acceptedAll?.reduce((acc, order) => {
                                    return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                                }, 0)
                            }</p>
                        </div>

                        {/* -------------- date ------------ */}
                        <div className="border ">
                            Select Date <br />
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            />
                            {/* -------------------- */}
                            <div className="border p-2 flex">
                                <p className="font-bold">Total Amount: {
                                    dateAmount?.reduce((acc, order) => {
                                        return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                                    }, 0)
                                }</p>
                            </div>
                            {/* -------------------- */}
                        </div>
                        {/* -------------- date ------------ */}


                        {/* ---------------- Cash out Section --------------- */}
                        <div className="border p-2">
                            <p className="font-bold">Cashout Amount</p>

                            <div>
                                <input placeholder="Input Amount" type="number" required className="bg-slate-400 rounded p-2 text-white " />
                            </div>

                        </div>
                        {/* ---------------- Cash out Section --------------- */}

                    </div>

                </div>

            </div>
        </div>

    );
};

export default Account;