import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'; //instance
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:'',
        },
        loading: false,
    }

    orderHandler = (event) =>{
        event.preventDefault(); // sends new req and reloads page
        console.log(this.props.ingredients);


        // send order
        this.setState({loading: true});

        const order ={
            ingredients: this.props.ingredients,
            // price: this.state.totalPrice, // this bad for real app, price can be changed by user
            price: this.props.price,
            customer: {
                name: 'h griffin',
                address: {
                    street: 'test street',
                    zipCode: '12345',
                    country: 'United States',
                },
            email: 'test@test.com'
            },
            delveryMethod: 'fastest'

        }
        axios.post('/orders.json', order) //!! .json for firebase !! 
            .then(response => {
                // this.setState({loading: false, purchasing: false}); //purchasing to close modal
                this.setState({loading: false});
                this.props.history.push('/'); //back to home after order
            })
            .catch(error => {
                this.setState({loading: false}); // infinite loop if loading true while error
            });
    }

    render(){
        let form = (
            <form>
                    <input className={classes.Input} type='text' name='name' placeholder='your name' />
                    <input className={classes.Input} type='email' name='eail' placeholder='your email' />
                    <input className={classes.Input} type='text' name='street' placeholder='your street' />
                    <input className={classes.Input} type='text' name='postal' placeholder='your postal code' />
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if (this.state.loading){
            form = < Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;