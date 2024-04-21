import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../Shair/Navbar';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';


const BuyPage = () => {

    const { _id } = useParams(); // Get the value of _id from the URL parameter

    const [product, setProduct] = useState([])
    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/product')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])

    const result = product.find((products) => products._id === _id);

    // console.log(result)
    // -------------------------
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [pin, setPin] = useState('');

    // -------------------------
    const { user } = useContext(AuthContext)

    const userEmail = user?.email
    // ------------------ Quentity * price-------------------

    const productImage = result?.image;
    const totalPrice = result?.price * quantity;
    const convertPrice = totalPrice.toFixed(2)
    // ------------------ Quentity * price-------------------
    const location = useLocation();



    // ---------------- Handle But--------------

    const handleBuy = () => {
        const currentDate = new Date(); // Get the current date and time
        const productBuy = {
            customerName: name,
            productName: result.name,
            productImage: productImage,
            price: convertPrice,
            quantity: quantity,
            pin: pin,
            address: address,
            email: userEmail,
            phoneNumber: phoneNumber,
            paymentMethod :'Cash On Delevery',
            date: currentDate.toLocaleDateString(), // Add the date in a human-readable format
            time: currentDate.toLocaleTimeString(), // Add the time in a human-readable format

        };


        fetch('https://isshabd-server.vercel.app/buyProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productBuy),
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500

        })

    


    }
    // ---------------- Handle But--------------

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto py-4 w-[800px]">
                <div className="bg-white p-6 rounded-lg shadow-md text-black">
                    <div className='flex justify-between'>
                        <h2 className="text-2xl font-semibold mb-4">Product Order Form</h2>
                        <p className='text-2xl text-center border bg-white rounded-lg p-1 text-black'>Price: {convertPrice}</p>
                    </div>
                    <form>
                        <div className="mb-4 required">
                            <label htmlFor="name" className="block font-medium mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4 required">
                            <label htmlFor="phoneNumber" className="block font-medium mb-1">Phone Number</label>
                            <input
                                type="number"
                                id="phoneNumber"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>


                        <div className="mb-4 required">
                            <label htmlFor="pin" className="block font-medium mb-1">PIN Number</label>
                            <input
                                type="text"
                                id="pin"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                required
                            />
                        </div>


                        <div className="mb-4 required">
                            <label htmlFor="address" className="block font-medium mb-1">Address</label>
                            <textarea
                                id="address"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                rows="3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            ></textarea>
                        </div>


                        <div className="mb-4 required">
                            <label htmlFor="quantity" className="block font-medium mb-1">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>


                        <button onClick={handleBuy}
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>





        </div>
    );
};

export default BuyPage;