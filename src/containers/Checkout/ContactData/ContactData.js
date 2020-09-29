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
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType:'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'slowest', displayValue: 'Slowest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) =>{
        event.preventDefault(); // sends new req and reloads page
        // console.log(this.props.ingredients);


        // send order
        this.setState({loading: true});

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){//emial country
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        } 

        const order ={
            ingredients: this.props.ingredients,
            // price: this.state.totalPrice, // this bad for real app, price can be changed by user
            price: this.props.price,
            orderData: formData,

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

    checkValidity(value, rules){ //bool
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) =>{
        console.log(event.target.value);
        const updatedOrderForm ={
            ...this.state.orderForm // does not copy deep, just pointers to nested
        }
        
        const updatedFormElement ={ //deep 
            ...updatedOrderForm[inputIdentifier] //obj/key // orderform/email
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        // console.log(formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

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
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType='...' elementConfig='...' value='...' /> */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}  
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation} 
                        touched={formElement.config.touched}
                        />
                ))}
                {/* <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button> */}
                <Button btnType='Success' disabled={this.state.formIsValid}>ORDER</Button>
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