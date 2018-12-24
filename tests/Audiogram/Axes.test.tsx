import { render } from 'enzyme';
import React from 'react';

import { scaleLinear, scaleLog } from '@vx/scale';

import { Axes } from '../../src/Audiogram/components/AudiometricGraph';

describe('Frequency and amplitude axis labels', () => {
    const frequencyScale = scaleLog({
        domain: [175, 10000],
        range: [0, 600],
    });

    const amplitudeScale = scaleLinear({
        domain: [-15, 125],
        range: [0, 600],
    });

    const axes = render(
        <svg>
            <Axes scales={{ amplitudeScale, frequencyScale }} width={600} yMax={600} xMax={600} />
        </svg>,
    );

    test('There are 4 axes as boundaries for the audiometric grid', () => {
        expect(axes.children().children().length).toEqual(4);
    });

    test('The top axis is labeled by audiometric frequencies', () => {
        // Octave labels - 250 - 8000 Hz plus the line
        expect(axes.find('.vx-axis-top').children().length).toEqual(7);
        expect(
            axes
                .find('tspan')
                .first()
                .text(),
        ).toEqual('250 Hz');
    });

    test('The left axis is labeled by amplitude in dB HL', () => {
        // -10 to 120 dB plus the line and the label
        expect(axes.find('.vx-axis-left').children().length).toEqual(16);
        expect(
            axes
                .find('.vx-axis-left')
                .children()
                .find('tspan')
                .first()
                .text(),
        ).toEqual('-10');
    });
});
