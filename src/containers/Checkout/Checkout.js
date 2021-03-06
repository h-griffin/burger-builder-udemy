// import { checkPropTypes } from 'prop-types';
import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component{

    checkoutCancelledHandler=()=>{
        // go to previous page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () =>{
        // replace current page
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to='/'/> // no ingredients 
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to ='/' /> : null;

            // ingredients are now available not null
            summary = 
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    />
            </div>

        }
        return(
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients
        ,purchased: state.order.purchased
    };
};

//dont need dispatch here, just need to gather state

export default connect( mapStateToProps )( Checkout );