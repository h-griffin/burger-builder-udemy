import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'; //instance
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {updateObject, checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state={
        //local ui state
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
                    type: 'email',
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
            ingredients: this.props.ings
            ,price: this.props.price
            ,orderData: formData
            ,userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token); //send dispatch
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], { 
            value: event.target.value
            ,valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
            ,touched: true
         });

         const updatedOrderForm = updateObject(this.state.orderForm, { 
            [inputIdentifier]: updatedFormElement
          })

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render(){
        const formElementsArray = [];
        for ( let key in this.state.orderForm){ // key name-street-email
            formElementsArray.push({
                id: key
                ,config: this.state.orderForm[key] // key obj
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients
        ,price: state.burgerBuilder.totalPrice
        ,loading: state.order.loading
        ,token : state.auth.token
        ,userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

//not dispatching anything, just gathering state

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));
