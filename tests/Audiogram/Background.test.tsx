import { render } from 'enzyme';
import React from 'react';

import { Background } from '../../src/Audiogram/components/AudiometricGraph';

describe('Background gradient', () => {
    const background = render(
        <svg>
            <Background width={1} height={1} />
        </svg>,
    );

    test('The background renders a gradient', () => {
        expect(background.children().children().length).toEqual(2);
        expect(background.find('defs').length).toEqual(1);
        expect(background.find('rect').length).toEqual(1);
    });
});
