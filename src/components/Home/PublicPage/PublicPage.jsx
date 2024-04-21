
import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2'
import Loding from './Loading';
import { AuthContext } from '../../../Provider/AuthProvider';


const PublicPage = () => {


    const [productData, setProductData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tabil, setTabil] = useState('');
    const [select, setSelect] = useState([]);
    const [orders, setOrders] = useState([])
    const [trackData, setTrackData] = useState([]);
    const [dates, setDates] = useState([]);


    useEffect(() => {
        const fetchData = () => {
            fetch('https://isshabd-server.vercel.app/products')
                .then(response => response.json())
                .then(data => {
                    setProductData(data);
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                });
        };

        fetchData();

        const interval = setInterval(fetchData, 5000);


        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/order')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);


    const currentDate = new Date();
    const currentDateTime = currentDate.toLocaleString();

    // const trackOrder = () => {
    //     const orderData = orders.filter((orde => orders.phoneNumber === ))
    // }


        // -------------------------------- user ----------------------

        const { user, loading } = useContext(AuthContext)
        console.log(user.displayName)
        // -------------------------------- user ----------------------


    const categorySearch = (category) => {
        if (!productData) return;
        const filteredDataForCategory = productData.filter(product => product.category === category);
        setFilteredData(filteredDataForCategory);

    }

    const handleSelect = (product) => {
        setSelect(prevSelect => [...prevSelect, product]);
    }

    const handleRemove = (index) => {
        const updatedSelect = [...select];
        updatedSelect.splice(index, 1);
        setSelect(updatedSelect);
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = {
            date: currentDateTime,
            selectedProducts: select,
            phoneNumber: phoneNumber,
            tabil :tabil,
            water : user.displayName,
            water_email : user.email

        };

        fetch('https://isshabd-server.vercel.app/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Data posted successfully');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload();
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    }

    const Reload = () => {
        window.location.reload();
    }

    // ------ manage Track -------------
    const [statuss, setStatuss] = useState('')
    const handleTrack = (e) => {
        e.preventDefault();



        const currentDates = new Date(currentDateTime).toLocaleDateString();

        const track = orders.filter(product => {
            const productDate = new Date(product.date).toLocaleDateString();
            return product.phoneNumber === trackData && productDate === currentDates;
        });




        const convert = track.map(tr => (tr.status))
        const date = track.map(da => da.date)
        const Products = track.map(da => da.selectedProducts);
        const proConvert = Products.map(con => con)


        console.log(proConvert);
        setDates(date[0])
        setStatuss(convert)

    };

    // ------ manage Track -------------



    return (
        <div>
            <div className='flex  bg-green-800 text-white mb-2'>
                <small className='flex gao-10'>

                    <button onClick={Reload}>
                        {/* <img className='w-10 mx-2' src={logo} /> */}
                    </button>


                    <div className='flex gap-2 mx-4'>
                        <button onClick={Reload} className='border my-2 px-1 rounded'>All Product</button>

                        <button onClick={() => categorySearch('Dessert')} className='border my-2 px-1 rounded'>Dessert</button>
                        <button onClick={() => categorySearch('Soups')} className='border my-2 px-1 rounded'>Soups</button>
                        <button onClick={() => categorySearch('Fast-food')} className='border my-2 px-1 rounded'>Fast-food</button>
                        <button onClick={() => categorySearch('Drinks')} className='border my-2 px-1 rounded'>Drinks</button>
                        <button onClick={() => categorySearch('Ice-Cream')} className='border my-2 px-1 rounded'>Ice Cream</button>
                    </div>
                </small>
            </div>
            <div className='flex justify-between'>
                <ul className='md:grid grid-cols-4 gap-2 gap-y-9 mx-1'>
                    {!productData ?
                        <Loding />
                        :
                        (filteredData || productData)?.map(product => (
                            <li key={product._id}>
                                <button onClick={() => handleSelect(product)} disabled={!product.showDisplay === true}>
                                    <div className="card card-compact w-40 mt-2 bg-base-100 shadow-xl">
                                        <figure>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ filter: product.showDisplay ? 'true' : 'grayscale(100%)' }}
                                            />
                                        </figure>
                                        <div className="">
                                            <p className="card-title text-sm">{product.name}</p>
                                            <p className="card-title text-sm">Price : {product.price}</p>
                                            <small>{product.description}</small>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))
                    }

                </ul>


                <div className="sticky top-0 bg-green-700 h-full rounded-lg mx-1 ">
                    <div className="sticky top-0 w-52 ">

                        <p className='text-center text-white'>Order Summary</p>
                        <hr />


                        <form onSubmit={handleSubmit}>


                            {select?.map((selectedProduct, index) => (
                                <div className='flex justify-between px-2' key={index}>
                                    <small className='text-white'>{selectedProduct.name}-<span className='text-yellow-500'>{selectedProduct.price}</span></small>
                                    <button className='text-white bg-red-700 rounded-full mt-1 px-1' onClick={() => handleRemove(index)}>X</button>
                                </div>
                            ))}
                            <hr />
                            {
                                select.length > 0 ?
                                    <p className='text-white'>Total: {select.reduce((total, selectedProduct) => total + Number(selectedProduct.price), 0)}</p> : <p className='text-white'>No food selected</p>

                            }
                            <hr />

                            {
                                select.length > 0 ?
                                    <div>
                                        <div className=''>
                                            <input
                                                className='w-36 border shadow rounded-md rounded-l-none mt-1 mb-1'

                                                type="number"
                                                placeholder='Phone Number'
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required
                                            />

                                           <div className='flex'>
                                           <input
                                                className='w-20 border shadow rounded-md rounded-l-none mt-1 mb-1'

                                                type="number"
                                                placeholder='Tabil no'
                                                value={tabil}
                                                onChange={(e) => setTabil(e.target.value)}
                                                required
                                            />
                                            <button className='text-green-700 bg-white p-1 m-1 rounded-md hover:bg-green-300 hover:text-white' type="submit">ORDER</button>

                                           </div>


                                        </div>
                                    </div> :
                                    <div>

                                        <div className='text-center relative'>
                                            <p className='text-white'>Order Track</p>
                                            <div className='relative'>
                                                <input
                                                    className='rounded border px-3 py-1 w-36'
                                                    type="number"
                                                    required
                                                    placeholder='Enter your number...'
                                                    onChange={(e) => setTrackData(e.target.value)}
                                                    value={trackData}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleTrack}
                                                    className='absolute left-36 top-1/2 transform -translate-y-1/2'
                                                >
                                                    <FaSearch className='text-yellow-700' />
                                                </button>
                                            </div>
                                        </div>

                                        {/* ------------- Status ------------------ */}
                                        <div>


                                            <p className='text-white mt-2'>{statuss ? "Status" : ''} {statuss}</p>

                                            {
                                                statuss ? <small className='text-white'>Date: {dates}</small> : ''
                                            }

                                        </div>

                                        {/* --------------------- Status ---------------------------------------- */}
                                    </div>


                            }



                        </form>

                        {/* ---------------- */}
                        {/* ---------------- */}

                    </div>


                </div>
            </div>
        </div>
    );
};

export default PublicPage;
