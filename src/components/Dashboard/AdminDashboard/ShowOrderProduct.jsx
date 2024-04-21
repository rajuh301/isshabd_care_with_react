import React, { useEffect, useState } from 'react';
import Navbar from '../../Shair/Navbar';

import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
} from 'react-icons/ai';
import Swal from 'sweetalert2';

const ShowOrderProduct = () => {

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

        const intervalId = setInterval(fetchOrders, 2000);

        return () => clearInterval(intervalId);
    }, []);




    const orders = orderss?.filter(ord => ord.status !== 'accept' && ord.status !== 'reject' && ord.status !== 'done')

    const today = new Date().toLocaleDateString(); // Get today's date in MM/DD/YYYY format
    const accepted = orderss?.filter(ord => ord.status === 'accept' && ord.date.split(',')[0] === today);

    // ---------------------- View Function ----------------
    const [foods, setFoods] = useState([])
    const handeView = (_id) => {

        let data = orders.find(pro => pro._id === _id)
        setFoods(data)
        document.getElementById('my_modal_3').showModal();


    }


    // ---------------------- View Function ----------------


    // ----------------- accept reject and done Function -----------

    const handleAccept = async (_id) => {
        try {
            const response = await fetch(`https://isshabd-server.vercel.app/ordersaccept/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'accept' }),
            });

            if (response.ok) {
                console.log('Order accepted successfully');
                // Update the orders state to remove the accepted order
                setOrderss(prevOrders => prevOrders.filter(order => order._id !== _id));
                Swal.fire(
                    'Accepted!',
                    'The order has been accepted.',
                    'success'
                );

                window.location.reload();
            } else {
                console.error('Error accepting order:', response.statusText);
                Swal.fire(
                    'Error!',
                    `Failed to accept the order: ${response.statusText}`,
                    'error'
                );
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            Swal.fire(
                'Error!',
                'Failed to accept the order. Please try again later.',
                'error'
            );
        }
    };




    const handleReject = async (_id) => {
        console.log(_id);

        // Show confirmation dialog using SweetAlert
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!'
        });

        if (!isConfirmed.isConfirmed) {
            return; // Cancel the action if not confirmed
        }

        try {
            const response = await fetch(`https://isshabd-server.vercel.app/ordersdone/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'done' }),
            });

            if (response.ok) {
                console.log('Order rejected successfully');
                // Update the orders state to remove the rejected order
                setOrderss(prevOrders => prevOrders.filter(order => order._id !== _id));
                Swal.fire(
                    'Done!',
                    'The order has been Done.',
                    'success'
                );
            } else {
                console.error('Error rejecting order:', response.statusText);
                Swal.fire(
                    'Error!',
                    `Failed to reject the order: ${response.statusText}`,
                    'error'
                );
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
            Swal.fire(
                'Error!',
                'Failed to reject the order. Please try again later.',
                'error'
            );
        }
    };

    const handleDone = async (_id, order) => {
        console.log(_id);

        // Show confirmation dialog using SweetAlert
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won to delevery this order!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delevery it!'
        });

        if (!isConfirmed.isConfirmed) {
            return; // Cancel the action if not confirmed
        }

        try {
            const response = await fetch(`https://isshabd-server.vercel.app/ordersdone/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'done' }),
            });

            if (response.ok) {
                console.log('Order done successfully');
                // Update the orders state to remove the rejected order
                setOrderss(prevOrders => prevOrders.filter(order => order._id !== _id));
                Swal.fire(
                    'Done!',
                    'The order has been done.',
                    'success'
                );

            } else {
                console.error('Error done order:', response.statusText);
                Swal.fire(
                    'Error!',
                    `Failed to done the order: ${response.statusText}`,
                    'error'
                );
            }
        } catch (error) {
            console.error('Error done order:', error);
            Swal.fire(
                'Error!',
                'Failed to done the order. Please try again later.',
                'error'
            );
        }
    };



    // ----------------- Print Function ------------------
    const handlePrint = (order) => {
        const currentDate = new Date().toLocaleDateString(); // Get current date
        const currentTime = new Date().toLocaleTimeString(); // Get current time

        const printContent = `
            <style>
                @media print {
                    .print-container {
                        @apply p-4 border-2 border-gray-300 m-4;
                    }
                    .print-header {
                        @apply font-bold text-center border-b-2 border-gray-300 pb-2 mb-2;
                    }
                    .product-item {
                        @apply flex justify-between mb-2;
                    }
                    .total-price {
                        @apply font-bold mt-4 text-right;
                    }
                    .logo {
                        @apply mb-4;
                    }
                }
            </style>
            <div class="print-container">
                <div class="flex items-center gap-2 logo">
                  
                    <p className="font-bold">ISSHA BD CAFE</p>
                </div>
                <div class="print-header" className="font-bold">Order Details</div>
                Date: ${currentDate}<br>
                Time: ${currentTime}<br>
                <div>
                    Order ID: ${order._id}<br>
                    Table: ${order.tabil}<br>
                </div>
                <div class="print-header" className="underline mt-5 font-bold">Selected Products:</div>
                <div>
                    ${order.selectedProducts?.map(pro => `
                        <div class="product-item">
                            <span>${pro.name}</span>
                            <span>Price: ${pro.price}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="print-header"></div>
                <hr/>
                <div class="">
                   Total Price : ${order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro.price) || 0), 0)}
                </div>

                <div>
                <p className="underline font-semibold">Contuct info: 
                </p>

                <p>Phone: </p>
                <p>Email: </p>
                <p>Visite again</p>

                </div>
            </div>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };


    // ----------------- Print Function ------------------
    // ----------------- accept and reject Function -----------


    return (
        <div>

            <Navbar />

            <div className="flex flex-col md:flex-row">
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

                <div className='container mx-12 flex justify-between'>
                    <div className=''>
                        <ul className=''>

                            {orders?.map(order => (

                                <li key={order._id}>


                                    {/* ------------------------ Table --------------------- */}
                                    <div className="overflow-x-auto ">
                                        <table className="table bg-slate-200 my-2">
                                            {/* head */}

                                            <tbody className=''>
                                                {/* row 1 */}
                                                <tr >

                                                    <td>{order?.date}</td>
                                                    <td>Phone: {order?.phoneNumber}</td>
                                                    <td>Table: {order.tabil}</td>
                                                    <td>Water: {order.water}</td>
                                                 

                                                    <div className='flex items-center gap-10'>


                                                        <button onClick={() => handeView(order._id)} className='btn btn-primary'>View</button>



                                                    </div>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    {/* ------------------------ Table --------------------- */}

                                    {/* ----------------------- Modal----------------- */}
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}


                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">

                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                            </form>
                                            <h3 className="font-bold text-lg">Order Details</h3>

                                            {/* ----------------- content ------------- */}
                                            <div>
                                                {
                                                    foods.selectedProducts?.map(pro =>
                                                        <div className='flex justify-between border shadow-md py-2 px-1 gap-5' key={pro._id}>
                                                            <p>{pro?.name}</p>
                                                            <p>Price: {pro?.price}</p>
                                                        </div>
                                                    )
                                                }
                                                <hr />
                                                <div className='flex justify-between'>
                                                    <div className='mt-5 text-2xl font-bold text-green-700'>
                                                        Total : {
                                                            foods.selectedProducts?.reduce((acc, pro) => acc + (Number(pro?.price) || 0), 0)
                                                        }
                                                    </div>
                                                    <div className='flex gap-5 mt-2'>
                                                        <button onClick={() => handleAccept(foods._id)} className='btn btn-primary'>
                                                            Accept
                                                        </button>
                                                        <button onClick={() => handleReject(foods._id)} className='btn btn-warning'>
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ----------------- content ------------- */}

                                        </div>
                                    </dialog>
                                    {/* ----------------------- Modal----------------- */}



                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* ---------- Right Section ----------- */}
                    <div className='w-52  bg-slate-600 text-white rounded'>
                        <p className='text-center'>Accepted Order <span className='text-secondary'>{accepted?.length}</span> </p>

                        {/* --------------------------------------- */}
                        {
                            accepted?.map(order => (
                                <div className="border p-2" key={order._id}>
                                    {order.selectedProducts?.map(pro => (
                                        <div key={pro._id}>
                                            <p>
                                                {pro.name}
                                                <span>Price: {pro.price}</span>
                                            </p>
                                        </div>
                                    ))}
                                    {/* <p>Table : {pro?.tabil}</p> */}
                                    <hr />
                                    <p>
                                        Total: {
                                            order.selectedProducts?.reduce((acc, pro) => acc + (Number(pro.price) || 0), 0)
                                        }
                                    </p>


                                    <div className='flex'>
                                        <button onClick={() => handleDone(order._id)} className='btn btn-secondary'>Delivery</button>


                                        <button onClick={() => handlePrint(order)} className='btn btn-success'>Print</button>
                                    </div>


                                </div>
                            ))
                        }

                        {/* --------------------------------------- */}

                    </div>
                    {/* ---------- Right Section ----------- */}

                </div>
            </div>
        </div>
    );
};

export default ShowOrderProduct;