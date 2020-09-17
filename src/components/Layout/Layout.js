import React from 'react';

import classes from './Layout.css'
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = (props) => (
    <Aux>
        <div>toolbar, side drawer, backdrop</div>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;