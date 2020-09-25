import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
    // TESTING / remove withErrorHandler interceptors when burger builder is not needed

    // state ={
    //     show: true,
    // }

    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({show: false});
    //     })
    // }

  render() {
    return (
        <div>
            <Layout>
                {/* {this.state.show? <BurgerBuilder /> : null } */}
                <BurgerBuilder />
            </Layout>
        </div>
    );
  }
}

export default App;
