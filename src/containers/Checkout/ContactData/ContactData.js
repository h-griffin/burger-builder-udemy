import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'; //instance
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
        orderForm:{
            name: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: ''
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            },
            zipCode: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code',
                },
                value: ''
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType:'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: ''
            },
            delveryMethod: {
                elementType:'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'slowest', displayValue: 'Slowest'},
                    ]
                },
                value: ''
            },
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

    inputChangedHandler = (event, inputIdentifier) =>{
        console.log(event.target.value);
        const updatedOrderForm ={
            ...this.state.orderForm // does not copy deep, just pointers to nested
        }
        
        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier] //obj/key // orderform/email
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render(){
        const formElementsArray = [];
        for ( let key in this.state.orderForm){ // key name-street-email
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key] // key obj
            })
        }

        let form = (
            <form>
                {/* <Input elementType='...' elementConfig='...' value='...' /> */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}  
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        
                        />
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form = < Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;