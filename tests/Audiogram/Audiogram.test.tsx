import { shallow } from 'enzyme';
import React from 'react';

import { Audiogram } from '../../src/Audiogram';

test('Audiogram renders', () => {
    const audiogram: boolean = shallow(<Audiogram />).contains(<h1>Audiogram</h1>);

    expect(audiogram).toBeTruthy();
});
