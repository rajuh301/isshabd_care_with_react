import React, { useEffect, useState } from 'react';
import Navbar from '../../Shair/Navbar';
import { NavLink } from 'react-router-dom';
import {
    AiOutlineUser,
    AiOutlineShopping,
    AiFillCalculator,
    AiOutlineDeliveredProcedure,
    AiFillAccountBook,
    AiFillTrademarkCircle,
} from 'react-icons/ai';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const uploadImage = async (event) => {
        const formData = new FormData();
        if (!event.target.files[0]) return;

        formData.append("image", event.target.files[0]);

        Swal.fire({
            title: 'Image uploading...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=6f87abdac0fb402333249a265cb47024`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();
            Swal.close();
            Swal.fire('Success', 'Image uploaded successfully!', 'success');
            setProductImage(data.data.url);
        } catch (error) {
            Swal.close();
            Swal.fire('Error', 'Image not uploaded!', 'error');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage,
            category: category,
            showDisplay: true,
            rating: 1
        };

        Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch('https://isshabd-server.vercel.app/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.close();
                Swal.fire('Success', 'Product added successfully', 'success');

                setProductName('');
                setProductPrice('');
                setProductDescription('');
                setProductImage(null);
                setCategory('');
                setError('');
            } else {
                Swal.close();
                Swal.fire('Error', data.message || 'Error adding product', 'error');
            }
        } catch (err) {
            Swal.close();
            Swal.fire('Error', 'Error adding product: ' + err.message, 'error');
        }
    };


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
                <div className=' flex mx-auto'>
                    <div className="container mx-auto mt-2 border shadow-2xl px-5 py-1 rounded-xl">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Product Price</label>
                                <input
                                    type="number"
                                    id="productPrice"
                                    name="productPrice"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                />
                            </div>


                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Soups">Soups</option>
                                    <option value="Fast-food">Fast-food</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Ice-Cream">Ice Cream</option>
                                    <option value="All Product">All Product</option>
                                </select>
                            </div>



                            <div>
                                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description</label>
                                <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className="mt-1 p-2 w-full h-32 border rounded-md"
                                    required
                                ></textarea>
                            </div>


                            <div>
                                <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Upload Product Image</label>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    onChange={uploadImage}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
