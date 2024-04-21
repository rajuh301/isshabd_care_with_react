import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cart = ({ storeData }) => {


    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('cartItems'));
        if (localStorageData) {
            setCartItems(localStorageData);
        }
    }, [cartItems]);

    const handleDelete = (data) => {
        const localDataToDeleteId = data._id;

        setCartItems((prevItems) =>
            prevItems.filter((item) => item.data._id !== localDataToDeleteId)
        );

        const localStorageData = JSON.parse(localStorage.getItem('cartItems'));
        if (localStorageData) {
            const updatedData = localStorageData.filter(
                (item) => item.data._id !== localDataToDeleteId
            );
            localStorage.setItem('cartItems', JSON.stringify(updatedData));
        }

        Swal.fire({
            icon: 'success',
            title: 'Item Deleted',
            text: 'The item has been successfully deleted from your cart.',

        });
    };


    return (


        <div className='bg-gray-800 text-white rounded my-5'>

            <div className="overflow-x-auto">
                <table className="table text-2xl">
                    {/* head */}
                    <thead>


                    </thead>


                    <tbody>
                        {/* row 1 */}
                        <tr>

                            <td>
                                <div className="flex items-center space-x-3 ">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-20">
                                            <img src={storeData.data.image} alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{storeData.data.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                ${storeData.data.price}

                            </td>
                            <td>
                                <button onClick={() => handleDelete(storeData.data)} className="btn btn-ghost hover:bg-red-600 text-2xl">Delete</button>
                            </td>
                            <th>
                               

                                <Link to={`/buyProduct/${storeData.data._id}`}>
                                    <button className="btn btn-primary">Buy Now</button>
                                </Link>




                            </th>
                        </tr>





                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Cart;