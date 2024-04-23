import React from 'react';

const ShowStatement = ({ cas }) => {
    return (
        <tr>
            <th className='w-72'>{cas?.date}</th>
            <td className='w-32 font-bold'>{cas?.amount} Taka</td>
            <td>{cas?.purpose}</td>
        </tr>
    );
};

export default ShowStatement;
