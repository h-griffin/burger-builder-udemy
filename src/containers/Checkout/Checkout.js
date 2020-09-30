// import { checkPropTypes } from 'prop-types';
import React, {Component} from 'react';
import { Route } from 'react-router-dom';


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
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    // render={(props) => (<ContactData 
                    //     ingredients={this.props.ings} 
                    //     price={this.state.totalPrice}
                    //     {...props} //history 
                    //     />)}
                    />
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return{
        ...state,
        ings: state.ingredients,
    }
}

//dont need dispatch here, just need to gether state

export default connect(mapStatetoProps)(Checkout);