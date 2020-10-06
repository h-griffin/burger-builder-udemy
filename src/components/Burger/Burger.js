import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //tranform state object into array
    let transformedIngredients = Object.keys(props.ingredients)//keys returns array / .map the array
        .map(igKey => {                                          //igkey=bacon
            //transform string key value into array with 2 elements
            return[...Array(props.ingredients[igKey])]          // length of igkey = 2=[,]  /Array.(length)
            .map((_, i) => {                                    //_empty argument, just want index of element
                return <BurgerIngredient key={igKey + i} type={igKey} /> //key=bacon i=1 type='bacon'
            })
        })
        .reduce( (arr, el) => {
            return arr.concat(el) //ad new el to old arr
        }, []); 
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type ='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type ='bread-bottom'/>
        </div>
    );
}

export default withRouter(burger);

