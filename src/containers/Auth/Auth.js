import React , {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject } from '../../store/utility';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Emial Address',
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType:'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    }

    checkValidity(value, rules){ //bool
        let isValid = true;
        if (!rules) {
            return true;
        }

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

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls, //all
            [controlName]:{   //one
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value ,this.state.controls[controlName].validation),
                touched: true,
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{ isSignup: !prevState}
        })
    }

    render(){
        const formElementsArray = [];
        for ( let key in this.state.controls){ // key name-street-email
            formElementsArray.push({
                id: key,
                config: this.state.controls[key] // key obj
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input 
                key = {formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}  
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation} 
                touched={formElement.config.touched}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return(
            <div className= {classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);