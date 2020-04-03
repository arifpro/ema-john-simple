import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = data => { 
        // TODO: User move this after payment
        console.log(auth.user.email);
        const savedCArt = getDatabaseCart()
        const orderDetails = {email: auth.user.email, cart: savedCArt}
        fetch('http://localhost:4200/placeOrder',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Order Placed');
            alert("Successfully placed your order with order id: " + data._id)
            processOrder()
        })
    }
    const auth = useAuth()

    return (
        < form className="ship-form" onSubmit={ handleSubmit(onSubmit) } >
            < input name="name" 
                    defaultValue={auth.user.name} 
                    ref={register({ required: true })} 
                    placeholder="Your Name" 
            />
            { 
                errors.name && <span className="error">Name is required</span> 
            }

            < input type="email" 
                    name="email" 
                    defaultValue={auth.user.email} 
                    ref={register({ required: true })} 
                    placeholder="Your Email" 
            />
            {
                errors.email && <span className="error">Email is required</span>
            }

            < input name="addressLine1" 
                    defaultValue="" 
                    ref={register({ required: true })} 
                    placeholder="Address Line 1" 
            />
            {
                errors.addressLine1 && <span className="error">Address Line 1 is required</span>
            }

            < input name="addressLine2" 
                    defaultValue="" 
                    ref={register} 
                    placeholder="Address Line 2" 
            />

            < input name="city" 
                    defaultValue="" 
                    ref={register({ required: true })} 
                    placeholder="City" 
            />
            {
                errors.city && <span className="error">City is required</span>
            }

            < input name="country" 
                    defaultValue="" 
                    ref={register({ required: true })} 
                    placeholder="Country" 
            />
            {
                errors.country && <span className="error">Country is required</span>
            }

            < input name="zipCode" 
                    defaultValue="" 
                    ref={register({ required: true })} 
                    placeholder="Zip Code" 
            />
            {
                errors.zipCode && <span className="error">Zip Code is required</span>
            }

            <input type="submit" />
        </form >
  )
};

export default Shipment;