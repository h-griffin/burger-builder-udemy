
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure( {adapter: new Adapter()} );

// describe=suite   it=test
describe('<BurgerBuilder/>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>); //render just this, not whole app
    });

    it('should render <BuildControls/> when receiving ingredients', () => {
        wrapper.setProps({ings: {salad: 0}}); // props too late here, must give above ^^
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

