import { render } from 'enzyme';
import React from 'react';

import { scaleLinear, scaleLog } from '@vx/scale';

import { Grid } from '../../src/Audiogram/components/AudiometricGraph';

describe('Audiometric gridlines', () => {
    const frequencyScale = scaleLog({
        domain: [175, 10000],
        range: [0, 600],
    });

    const amplitudeScale = scaleLinear({
        domain: [-15, 125],
        range: [0, 600],
    });

    const grid = render(
        <svg>
            <Grid scales={{ amplitudeScale, frequencyScale }} width={600} xMax={600} yMax={600} />
        </svg>,
    );

    test('The grid contains vertical lines to mark frequencies', () => {
        expect(grid.find('.vx-columns').children().length).toBe(10);
    });

    test('The grid constains horizontal lines to mark amplitude', () => {
        expect(grid.find('.vx-rows').children().length).toBe(14);
    });
});
