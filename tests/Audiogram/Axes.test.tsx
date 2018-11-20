import { render } from 'enzyme';
import React from 'react';

import { Axes } from '../../src/Audiogram/components/AudiometricGraph';

describe('Frequency and amplitude axis labels', () => {
    const axes = render(<Axes />);

    test('There are 4 axes as boundaries for the audiometric grid', () => {
        expect(axes.children().length).toEqual(4);
    });

    test('The top axis is labeled by audiometric frequencies', () => {});

    test('The left axis is labeled by amplitude in dB HL', () => {});

    test('The right axis is unlabeled', () => {});

    test('The bottom axis may have labels for intraoctave frequencies', () => {});
});
