import { checkPropTypes } from 'prop-types';
import React, {Component} from 'react';
import { Route } from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
        // ingredients:{
        //     salad: 1,
        //     meat: 1,
        //     bacon:1,
        //     cheese:1,
        // }
        ingredients: null,  //ingredients come in url ^^
        price: 0,
    }

    // componentDidMount(){    // cant display while state is null
    componentWillMount (){
        // get ingredients passed from url
        const query = new URLSearchParams(this.props.location.search); // ingredients passed in url
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()){
            if (param[0] === 'price'){ // dont add to ingredients
                price = param[1];
            } else {
                // ['salad], '1']           num
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price}); // set new state with url params
    }

    checkoutCancelledHandler=()=>{
        // go to previous page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () =>{
        // replace current page
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // component={ContactData}
                    render={(props) => (<ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        {...props} //history 
                        />)}
                    />
            </div>
        )
    }
}

export default Checkout;