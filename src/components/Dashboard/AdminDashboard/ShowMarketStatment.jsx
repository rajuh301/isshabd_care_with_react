import React from 'react';

const ShowMarketStatment = ({markets}) => {
    console.log(markets.amount)
    return (
        <div>
           <tr>
            <th className='w-72'>{markets?.date}</th>
            <td className='w-32 font-bold'>{markets?.amount} Taka</td>
            <td className='w-96'>{markets?.description}</td>
        </tr>
        </div>
    );
};

export default ShowMarketStatment;