
import { useEffect, useState } from "react";
import Navbar from "../../Shair/Navbar";
import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
    AiFillTrademarkCircle,
} from 'react-icons/ai';
import Swal from "sweetalert2";
import ShowStatement from "./ShowStatement";
import ShowMarketStatment from "./ShowMarketStatment";

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
        const intervalId = setInterval(fetchOrders, 5000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);





    const today = new Date().toLocaleDateString(); // Get today's date in MM/DD/YYYY format
    const accepted = orderss?.filter(ord => ord.status === 'done' && ord.date.split(',')[0] === today);


    // ------------- Date Functtion ----------
    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate);

    const dateAmount = orderss?.filter(ord => {
        const formattedDatabaseDate = `${ord.date.split(',')[0].split('/')[2]}-${ord.date.split(',')[0].split('/')[0].padStart(2, '0')}-${ord.date.split(',')[0].split('/')[1].padStart(2, '0')}`;
        const formattedSelectedDate = selectedDate?.toISOString().split('T')[0];

        return ord.status === 'done' && formattedDatabaseDate === formattedSelectedDate;
    });
    // ------------- Date Functtion ----------


    // ----------------- Cashout ---------------
    const handleCashoutSubmit = async (e) => {
        e.preventDefault();

        const cashoutAmount = e.target.cashoutAmount.value;
        const purpose = e.target.purpose.value;  // New input field
        const currentDate = new Date();
        const cashoutDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}, ${currentDate.toLocaleTimeString()}`; // Current date in "4/20/2024, 7:44:28 PM" format

        // Show confirmation alert
        const confirm = await Swal.fire({
            icon: 'warning',
            title: 'Confirm Cashout',
            text: `Are you sure you want to cashout $${cashoutAmount} for ${purpose}?`,
            showCancelButton: true,
            confirmButtonText: 'Cashout',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (confirm.isConfirmed) {
            try {
                const response = await fetch('https://isshabd-server.vercel.app/cashout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: cashoutAmount, purpose: purpose, date: cashoutDate }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Cashout successful:', data);

                // Handle success, e.g., show a success message to the user
                Swal.fire({
                    icon: 'success',
                    title: 'Cashout Successful!',
                    text: `Amount: ${data.amount}\nPurpose: ${data.purpose}\nDate: ${data.date}`,
                }).then(() => {
                    // Reload the page
                    window.location.reload();
                });
            } catch (error) {
                console.error('There was a problem with the cashout:', error.message);

                // Handle error, e.g., show an error message to the user
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Error: ${error.message}`,
                });
            }
        }
    };



    // -------------------- Get cashout amount ---------
    const [cashout, setCashout] = useState([0]);
    useEffect(() => {
        const fetchCashout = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/getcashout');
                const data = await res.json();
                setCashout(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchCashout();
        const intervalId = setInterval(fetchCashout, 5000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);


    // -------------------- Get cashout amount ---------
    const lastbalance = cashout ? cashout.reduce((acc, item) => acc + Number(item.amount), 0) : 0;



    const acceptedAll = orderss?.filter(ord => ord.status === 'done');



    const totalAccepted = acceptedAll?.reduce((acc, order) => {
        return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
    }, 0) - lastbalance;


    // ----------------- Cashout ---------------


    // -------------------- Get Market  ---------
    const [market, setMarket] = useState([0]);
    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await fetch('https://isshabd-server.vercel.app/market');
                const data = await res.json();
                setMarket(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchMarket();
        const intervalId = setInterval(fetchMarket, 5000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);


    // -------------------- Get Market  ---------
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
                            <p className="font-bold">Total Amount: {totalAccepted >= 0 ? totalAccepted.toFixed(2) : '0'}</p>

                        </div>

                        {/* -------------- date ------------ */}
                        <div className="border px-5 ">
                            <p>Select Date </p>


                            <input
                                type="date"
                                value={selectedDate?.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            />

                            {/* -------------------- */}
                            <div className="p-2 flex">
                                <p className="font-bold">Amount: {
                                    dateAmount?.reduce((acc, order) => {
                                        return acc + order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0);
                                    }, 0) || 0
                                }</p>
                            </div>
                            {/* -------------------- */}
                        </div>
                        {/* -------------- date ------------ */}


                        {/* ---------------- Cash out Section --------------- */}
                        <div className="border p-4">
                            <p className="font-bold mb-2">Cashout Amount</p>

                            <form onSubmit={handleCashoutSubmit} className="flex items-center">
                                <div className="flex-grow mr-4">
                                    <input
                                        id="cashoutAmount"
                                        name="cashoutAmount"
                                        type="number"
                                        placeholder="Input Amount"
                                        required
                                        className="bg-slate-600 rounded py-2 text-white w-full font-bold"
                                    />
                                </div>

                                <div className="flex-grow mr-4">
                                    <input
                                        id="purpose"
                                        name="purpose"
                                        type="text"
                                        placeholder="Purpose of Cashout"
                                        required
                                        className="bg-slate-600 rounded py-2 text-white w-full font-bold"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-2"
                                >
                                    Cashout
                                </button>
                            </form>

                        </div>
                        {/* ---------------- Cash out Section --------------- */}

                    </div >
                    <hr className="border-b-2 border-black text-2xl mt-5" />

                    {/* ------------------- Statement------------------ */}
                    <div className="flex mx-auto gap-10">

                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-secondary mt-10">Cashout Statement</button>
                        <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-success mt-10">Market Statement</button>
                    </div>


                    {/* ---------------------- Modal ----------------- */}
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_3" className="modal">

                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Histery</h3>


                            {/* -------------- Content -------------- */}
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>

                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Purpose</th> {/* Corrected the typo "Perpose" to "Purpose" */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cashout ? cashout.slice(0).reverse().map(cas => <ShowStatement key={cas._id} cas={cas} />) : ''}
                                    </tbody>
                                </table>
                            </div>

                            {/* -------------- Content -------------- */}





                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/* ---------------------- Modal ----------------- */}
                    {/* ---------------------- Modal2 ----------------- */}
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id="my_modal_4" className="modal">

                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Histery</h3>


                            {/* -------------- Content -------------- */}
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="flex">

                                            <th>Date</th>

                                            <th className="mx-60">Amount</th>
                                            <th>Markating</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {market ? market.slice(0).reverse().map(markets => <ShowMarketStatment key={markets._id} markets={markets} />) : ''}
                                    </tbody>
                                </table>
                            </div>

                            {/* -------------- Content -------------- */}





                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    {/* ---------------------- Modal2 ----------------- */}
                    {/* ------------------- Statement------------------ */}
                </div>




            </div>
        </div>

    );
};

export default Account;