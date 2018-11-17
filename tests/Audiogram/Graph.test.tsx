import { shallow } from 'enzyme';
import * as React from 'react';

import { Graph } from '../../src/Audiogram';

describe('Graph', () => {
    const props = { x: 1, y: 1, xMax: 1, yMax: 1 };
    const graph = shallow(<Graph size={props} />);

    test('A Graph renders multiple sub-components', () => {
        expect(graph.children().length).toEqual(3);
    });

    test('A graph has axes with labels', () => {
        expect(graph.find('Axes').length).toEqual(1);
    });

    test('A graph has grid lines for frequency and amplitude', () => {
        expect(graph.find('Grid').length).toEqual(1);
    });

    test('A graph has a background gradient for screen display', () => {
        expect(graph.find('Background').length).toEqual(1);
    });
});
