import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png'

const logo =(props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img alt='burger logo' src={burgerLogo} />
    </div>
);

export default logo;