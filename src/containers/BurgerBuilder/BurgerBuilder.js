import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends Component{
    state = {
        // ingredients ={
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0,
        // }
        ingredients: null, // fetch from DB
        totalPrice: 4,
        purchasable: false,
        purchasing:false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('https://burger-builder-react-88892.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients) //array of sting keys /bacon
            .map(igKey => {
                return ingredients[igKey]   //value of key  /1
            })
            .reduce((sum, el) => {  //sum most current
                return sum + el;
            }, 0);                  // start at 0
        this.setState({purchasable: sum > 0}) //bool
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;

        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ 
            totalPrice : newPrice, 
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount-1;

        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ 
            totalPrice : newPrice, 
            ingredients : updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }
    
    purchaseContinueHandler = () => {

        const queryParams =[]
        for ( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            //                  property name = property value
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });        

        // this.setState({loading: true});

        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice, // this bad for real app, price can be changed by user
        //     customer: {
        //         name: 'h griffin',
        //         address: {
        //             street: 'test street',
        //             zipCode: '12345',
        //             country: 'United States',
        //         },
        //     email: 'test@test.com'
        //     },
        //     delveryMethod: 'fastest'

        // }
        // axios.post('/orders.json', order) //!! .json for firebase !! 
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false}); //purchasing to close modal
        //     })
        //     .catch(error => {
        //         this.setState({loading: false}); // infinite loop if loading while error
        //     });
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 //bool
            // { salad: false, meat: true, ...}
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients cant load</p> : <Spinner />

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
    
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        />

                        
                </Aux>
    
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios); //hoc

