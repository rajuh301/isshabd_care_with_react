import React, { useEffect, useState } from 'react';
import ShowDCategory from './ShowDCategory';

const DaynamicCategory = () => {


    const [productCategory, setProductCategory] = useState([])


    useEffect(() => {
        fetch('https://isshabd-server.vercel.app/category')
            .then(res => res.json())
            .then(data => setProductCategory(data))
    }, [])



    return (

        <div>
            {
                productCategory.map(cDatta => <ShowDCategory
                    key={cDatta._id}
                    cDatta={cDatta}
                ></ShowDCategory>)
            }
        </div>
    );
};

export default DaynamicCategory;