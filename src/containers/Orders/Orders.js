import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state={
        orders: [],
        loading: true,
    }

    componentDidMount(){  // only gather when loaded
        axios.get('/orders.json') //DB firebase.json
            .then(res => {
                // console.log(res.data);
                const fetchedOrders =[];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],   // data/ingredients
                        id: key,            // firebase key/id
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({ loading: false});
            })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} //num
                        />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);