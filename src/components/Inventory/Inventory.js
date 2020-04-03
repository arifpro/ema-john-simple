import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddInventory = () => {
        // const product = fakeData[0]
        // console.log("before post",product)
        // fetch('http://localhost:4200/addProducts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': "application/json"
        //     },
        //     body: JSON.stringify(fakeData)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log('post successful', data);
        // })
    }
    return (
        <div>
            <h1>Add Inventory to sell more...</h1>
            <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;