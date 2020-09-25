
import React , {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            error: null,
        }

        componentWillMount(){ //or use constructor / run when created / before child component

            //create properties to use in unmount
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}); //clear error
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => { //global interceptor
                this.setState({error: error}); // show error modal
            }) 
        }
        
        componentWillUnmount(){
            // console.log('will unmount', this.reqInterceptor, this.resInterceptor);

            //remove interceptors when unmountned // prevent memmory leaks
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
    
                    <WrappedComponent {...this.props} /> 
                </Aux>
            );
        }
    }
}

export default withErrorHandler; //wrapper / global error handling

// interceptors here will stop when burger builder is non linger needed / page change